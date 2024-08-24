import db from "@/lib/db";

export const getChatRoom = async (id: string) => {
  return db.chatRoom.findUnique({
    include: {
      messages: {
        include: {
          user: true,
        },
      },
    },
    where: {
      id,
    },
  });
};
