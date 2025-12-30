import { useEffect, useRef } from "react";
import type { MessageProps } from "@/types/chat.types";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Avatar } from "@/components/shared/avatar";
import { useAuthStore } from "@/store/auth.store";
import { TypingIndicator } from "@/components/shared/type-indicator";

interface ChatMessagesProps {
  messages: MessageProps[];
  isTyping?: boolean;
}

export function ChatMessages({ messages, isTyping }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { user } = useAuthStore();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex flex-col gap-y-8 pb-10">
      {messages.map((msg, index) => {
        const isUser = msg.sender === "user";

        return (
          <div
            key={msg.id || index}
            className={`flex w-full ${
              isUser
                ? "justify-end"
                : "justify-start animate-in fade-in slide-in-from-bottom-4 duration-500"
            }`}
          >
            <div
              className={`flex gap-x-4 max-w-[95%] ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {isUser ? (
                <Avatar
                  name={user?.name as string}
                  src={user?.avatar}
                  className="w-8 h-8"
                />
              ) : (
                <img src="/logo.png" className="w-8 h-8" alt="Aura Ai" />
              )}

              <div
                className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed ${
                  isUser
                    ? "dark:bg-white/10 bg-gray-100 text-gray-800 rounded-tr-none"
                    : "dark:bg-transparent dark:p-0! bg-primary/5 text-gray-700 rounded-tl-none prose prose-slate max-w-none"
                }`}
              >
                {isUser ? (
                  <p className="dark:text-white whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="markdown-content dark:text-white prose prose-slate max-w-none">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      {isTyping && <TypingIndicator />}
      <div ref={scrollRef} />
    </div>
  );
}
