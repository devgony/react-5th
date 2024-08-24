"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { revalidateTag } from "next/cache";
import { notFound, redirect } from "next/navigation";

export const getChatRooms = async () => {
  const session = await getSession();
  return db.chatRoom.findMany({
    where: {
      users: {
        some: {
          id: {
            equals: session.id,
          },
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

  if (upserted.count > 0) {
    // revalidateTag(`chat-room-${chatRoomId}-messeges`);
    // console.log("revalidatePath", `/chats/${chatRoomId}`);
    // revalidatePath(`/chats/${chatRoomId}`);
  }

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

  console.log(">>", res.length);

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
