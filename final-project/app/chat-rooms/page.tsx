import Link from "next/link";
import { getChatRooms } from "./actions";

export default async function ChatRooms() {
  const chatRooms = await getChatRooms();
  return (
    <div>
      <h1>Messages</h1>
      {chatRooms.length === 0 ? (
        <>
          <p>No messages. </p>
          <Link href="/users">FindUsertoChat</Link>
        </>
      ) : (
        <ul>
          {chatRooms.map((chatRoom) => (
            <li key={chatRoom.id}>{chatRoom.id}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
