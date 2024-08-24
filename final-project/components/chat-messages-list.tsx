"use client";

import saveMessageReadBy, {
  InitialChatMessages,
  revalidateTagOnServer,
  saveMessage,
} from "@/app/chat-rooms/actions";
import { formatToTimeAgo } from "@/lib/utils";
import { createClient, RealtimeChannel } from "@supabase/supabase-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Avatar from "./avatar";
import { FaCircleArrowUp } from "react-icons/fa6";
import { HiArrowUturnLeft } from "react-icons/hi2";
import { Input } from "./ui/input";
import { IoMdArrowRoundBack } from "react-icons/io";

const SUPABASE_PUBLIC_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;

interface ChatMessageListProps {
  chatRoomId: string;
  initialMessages: InitialChatMessages;
  userId: number;
  username: string;
  photo: string;
}
export default function ChatMessagesList({
  chatRoomId,
  initialMessages,
  userId,
  username,
  photo,
}: ChatMessageListProps) {
  const [messages, setMessages] = useState(initialMessages);
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);
  const [message, setMessage] = useState("");
  const channel = useRef<RealtimeChannel>();
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;
    setMessage(value);
  };
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const messageId = await saveMessage(message, chatRoomId);

    setMessages((prevMsgs) => [
      ...prevMsgs,
      {
        id: messageId,
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username: "string",
          photo: "xxx",
        },
        read: false, // TODO: should it be false?
      },
    ]);

    channel.current?.send({
      type: "broadcast",
      event: "message",
      payload: {
        id: Date.now(),
        messageId,
        payload: message,
        created_at: new Date(),
        userId,
        user: {
          username,
          photo,
        },
      },
    });
    setMessage("");
  };
  useEffect(() => {
    const client = createClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY);
    channel.current = client.channel(`room-${chatRoomId}`);
    channel.current
      .on("broadcast", { event: "message" }, async (payload) => {
        setMessages((prevMsgs) => [
          ...prevMsgs,
          { ...payload.payload, read: true },
        ]);

        const messageReadBy = {
          userId,
          messageId: payload.payload.messageId,
        };

        await saveMessageReadBy(messageReadBy);

        channel.current?.send({
          type: "broadcast",
          event: "ack",
          payload: messageReadBy,
        });
      })
      .subscribe();

    channel.current.on("broadcast", { event: "ack" }, (payload) => {
      const { userId, messageId } = payload.payload;
      setMessages((prevMsgs) =>
        prevMsgs.map((msg) => {
          if (msg.id === messageId) {
            return {
              ...msg,
              read: true,
            };
          }
          return msg;
        })
      );
    });

    revalidateTagOnServer("chat-rooms");

    return () => {
      channel.current?.unsubscribe();
    };
  }, [chatRoomId, userId]);
  const router = useRouter();

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="">
      <div className="p-4 pb-36 flex flex-col gap-5 min-h-screen justify-end bg-secondary mx-2 rounded-2xl">
        <IoMdArrowRoundBack
          size={28}
          className="fixed top-5 size-10 cursor-pointer z-50"
          onClick={() => {
            router.back();
          }}
        />
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 items-start ${
              message.userId === userId ? "justify-end" : ""
            }`}
          >
            {message.userId === userId ? null : (
              <Avatar
                src={message.user.photo ?? ""}
                username={message.user.username}
              />
            )}
            <div
              className={`flex flex-col gap-1 ${
                message.userId === userId ? "items-end" : ""
              }`}
            >
              <section className="flex gap-2 items-center">
                {!message.read && message.userId === userId && (
                  <p className="text-xs font-bold text-yellow-300">1</p>
                )}
                <span
                  className={`${
                    message.userId === userId ? "bg-third" : "bg-primary"
                  } p-2.5 rounded-md`}
                >
                  {message.payload}
                </span>
                {!message.read &&
                  message.userId !== userId && ( // TODO: can be merged with the my-message case?
                    <p className="text-xs font-bold text-yellow-300">1</p>
                  )}
              </section>
              <span className="text-xs">
                {formatToTimeAgo(message.created_at.toString())}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        className="flex fixed bottom-24 w-full max-w-xl px-4 items-center"
        onSubmit={onSubmit}
      >
        <Input
          required
          onChange={onChange}
          value={message}
          className="rounded-full h-12 px-5 transition"
          type="text"
          name="message"
          placeholder="Write a message..."
        />
        <button className="absolute right-5">
          <FaCircleArrowUp className="size-10 transition-colors hover:text-primary" />
        </button>
      </form>
    </div>
  );
}
