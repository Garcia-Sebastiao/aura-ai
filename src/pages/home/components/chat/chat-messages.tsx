import { useEffect, useRef } from "react";
import type { MessageProps } from "@/types/chat.types";
import { Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown"; // Importar a lib
import remarkGfm from "remark-gfm"; // Para tabelas e links

interface ChatMessagesProps {
  messages: MessageProps[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

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
              className={`flex gap-x-4 max-w-[85%] ${
                isUser ? "flex-row-reverse" : "flex-row"
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                  isUser ? "bg-gray-200 text-gray-600" : "bg-primary text-white"
                }`}
              >
                {isUser ? (
                  <span className="text-xs font-bold uppercase">
                    {msg.sender[0]}
                  </span>
                ) : (
                  <Sparkles className="w-4 h-4" />
                )}
              </div>

              {/* Bolha de Resposta */}
              <div
                className={`px-5 py-3 rounded-2xl text-[15px] leading-relaxed shadow-sm ${
                  isUser
                    ? "bg-gray-100 text-gray-800 rounded-tr-none"
                    : "bg-white border border-gray-100 text-gray-700 rounded-tl-none prose prose-slate max-w-none"
                }`}
              >
                {isUser ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  // A MÁGICA ACONTECE AQUI
                  <div className="markdown-content prose prose-slate max-w-none">
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
      <div ref={scrollRef} />
    </div>
  );
}
