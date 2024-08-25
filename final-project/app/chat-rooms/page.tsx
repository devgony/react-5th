import Link from "next/link";
import { deleteChatRoom, getChatRooms } from "./actions";
import { TbMessageCircleFilled } from "react-icons/tb";
import Avatar from "@/components/avatar";
import { formatDate } from "@/lib/utils";
import LastMessage from "@/components/last-message";
import UnreadCount from "@/components/unread-count";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import FormButtom from "@/components/form-button";
import { Button } from "@/components/ui/button";

export default async function ChatRooms() {
  const chatRooms = await getChatRooms();
  const session = await getSession();
  if (session.id === undefined) {
    notFound();
  }
  return (
    <main className="p-4 flex flex-col gap-4 ">
      <div className="flex items-center gap-2">
        <TbMessageCircleFilled className="h-7 w-7" />
        <h1 className="text-2xl font-bold">Messages</h1>
      </div>
      {chatRooms.length > 0 ? (
        chatRooms.map((chatRoom) => (
          <Link key={chatRoom.id} href={`/chat-rooms/${chatRoom.id}`}>
            <form
              key={chatRoom.id}
              className="flex items-center bg-white p-4 rounded-lg dark:bg-gray-800 justify-between"
              action={async () => {
                "use server";
                return await deleteChatRoom(chatRoom.id);
              }}
            >
              <section className="flex gap-2 items-center">
                <Avatar src={chatRoom.photo} username={chatRoom.username} />
                <span>
                  <div className="flex gap-4">
                    <h2 className="text-lg font-semibold dark:text-white">
                      {chatRoom.username}
                    </h2>
                    <p className="text-neutral-400">
                      {chatRoom.updated_at && // TODO: why undefined?
                        formatDate(chatRoom.updated_at.toString())}
                    </p>
                  </div>
                  {/* <p className="dark:text-gray-300">{chatRoom.payload}</p> */}
                  <LastMessage
                    initialPayload={chatRoom.payload}
                    chatRoomId={chatRoom.id}
                  />
                </span>
              </section>
              <span className="flex gap-4 items-center">
                <UnreadCount
                  initialCount={chatRoom.unreadMessagesCount}
                  chatRoomId={chatRoom.id}
                  userId={session.id!} // TODO: why undefined?
                />
                <span className="w-24">
                  <FormButtom payload="Delete" />
                </span>
              </span>
            </form>
          </Link>
        ))
      ) : (
        <>
          <p>No chat rooms..</p>
          <Link href="/users">
            <Button>Find users to chat with</Button>
          </Link>
        </>
      )}
    </main>
  );
}
