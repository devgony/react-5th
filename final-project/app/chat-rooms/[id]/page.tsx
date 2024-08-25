import ChatMessagesList from "@/components/chat-messages-list";
import { getChatRoom } from "./actions";
import { getMessages } from "../actions";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import { getUser } from "@/app/profile/actions";

interface Props {
  params: {
    id: string;
  };
}
export default async function ChatRoom({ params: { id } }: Props) {
  // console.log(id);
  // const chatRoom = await getChatRoom(id);
  // console.log("here", chatRoom);
  const initialMessages = await getMessages(id);
  const session = await getSession();
  if (!session.id) {
    notFound();
  }
  const user = await getUser();
  return (
    <ChatMessagesList
      chatRoomId={id}
      userId={session.id}
      username={user.username}
      photo={user.photo ?? ""}
      initialMessages={initialMessages}
    />
  );
}
