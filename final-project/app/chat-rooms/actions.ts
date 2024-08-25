"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const getChatRooms = async () => {
  const session = await getSession();
  /* 
  SELECT message.payload, message.createdAt
  FROM chatRoom, message
  WHERE chatRoom.id = message.chatRoomId
  AND message.id = (
    SELECT MAX(id)
    FROM message
    WHERE chatRoomId = chatRoom.id
  ) 
  */

  const chatRooms = await db.chatRoom.findMany({
    select: {
      id: true,
      _count: {
        select: {
          messages: {
            where: {
              user: {
                NOT: {
                  id: session.id,
                },
              },
              message_read_by: {
                none: {
                  userId: session.id,
                },
              },
            },
          },
        },
      },
      users: {
        select: {
          username: true,
          photo: true,
        },
        where: {
          NOT: {
            id: session.id,
          },
        },
        take: 1,
      },
      messages: {
        select: {
          payload: true,
          updated_at: true,
        },
        orderBy: {
          id: "desc",
        },
        take: 1,
      },
    },
    where: {
      users: {
        some: {
          id: session.id,
        },
      },
    },
  });

  const flattenedChatRooms = chatRooms
    .map((chatRoom) => {
      const { updated_at, payload } = chatRoom.messages[0] ?? {};
      const { photo, username } = chatRoom.users[0] ?? {};

      return {
        id: chatRoom.id,
        photo,
        username,
        updated_at,
        payload,
        unreadMessagesCount: chatRoom._count.messages,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime() // TODO: sort on DB
    );

  return flattenedChatRooms;
};

export const getUnreadMessagesCount = async (
  chatRoomId: string,
  userId: number
) => {
  return await db.message.count({
    where: {
      chatRoomId,
      user: {
        NOT: {
          id: userId,
        },
      },
      message_read_by: {
        none: {
          userId,
        },
      },
    },
  });
};

export const createOrEnterChatRoom = async (targetUserId: number) => {
  const session = await getSession();
  if (!session.id) {
    notFound();
  }

  const prevChatRoom = await db.chatRoom.findFirst({
    where: {
      users: {
        every: {
          id: {
            in: [session.id, targetUserId],
          },
        },
      },
    },
  });

  const chatRoomId = prevChatRoom
    ? prevChatRoom.id
    : (
        await db.chatRoom.create({
          data: {
            users: {
              connect: [
                {
                  id: targetUserId,
                },
                {
                  id: session.id,
                },
              ],
            },
          },
          select: {
            id: true,
          },
        })
      ).id;

  revalidateTag("chat-rooms");
  redirect(`/chat-rooms/${chatRoomId}`);
};

export async function getMessages(chatRoomId: string) {
  const session = await getSession();
  const messageIds = await db.message.findMany({
    where: {
      chatRoomId,
      AND: [
        {
          NOT: {
            message_read_by: {
              some: {
                userId: session.id,
              },
            },
          },
        },
        {
          NOT: {
            userId: session.id,
          },
        },
      ],
    },
    select: {
      id: true,
    },
  });

  const upserted = await db.messageReadBy.createMany({
    data: messageIds.map(({ id }) => ({
      userId: session.id!,
      messageId: id,
      readAt: new Date(),
    })),
  });

  const messages = await db.message.findMany({
    where: {
      chatRoomId,
    },
    select: {
      id: true,
      payload: true,
      created_at: true,
      userId: true,
      user: {
        select: {
          photo: true,
          username: true,
        },
      },
      message_read_by: {
        select: {
          userId: true,
        },
      },
    },
  });

  const res = messages.map(({ message_read_by, ...others }) => {
    return {
      ...others,
      read: message_read_by.length > 0, // TODO: handle with SQL
    };
  });

  return res;
}
export type InitialChatMessages = Prisma.PromiseReturnType<typeof getMessages>;

export async function saveMessage(
  payload: string,
  chatRoomId: string
): Promise<number> {
  const session = await getSession();
  const created = await db.message.create({
    data: {
      payload,
      chatRoomId,
      userId: session.id!,
    },
    select: { id: true },
  });

  return created.id;
}

export default async function saveMessageReadBy({
  userId,
  messageId,
}: {
  userId: number;
  messageId: number;
}) {
  await db.messageReadBy.create({
    data: {
      userId,
      messageId,
    },
  });
}

export async function revalidateTagOnServer(tag: string) {
  revalidateTag(tag);
}

export const deleteChatRoom = async (id: string) => {
  const session = await getSession();

  const chatRoom = await db.chatRoom.findFirst({
    where: {
      id,
      users: {
        some: {
          id: session.id,
        },
      },
    },
  });

  if (!chatRoom) {
    throw new Error("Chat room not found");
  }

  await db.messageReadBy.deleteMany({
    where: {
      message: {
        chatRoomId: id,
      },
    },
  });

  await db.message.deleteMany({
    where: {
      chatRoomId: id,
    },
  });

  await db.chatRoom.delete({
    where: {
      id,
    },
  });

  revalidateTag("chat-rooms");
  return chatRoom;
};
