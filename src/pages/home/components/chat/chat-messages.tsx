import { useEffect, useRef } from "react";
import type { MessageProps } from "@/types/chat.types";
import { Sparkles } from "lucide-react";

interface ChatMessagesProps {
  messages: MessageProps[];
}

export function ChatMessages({ messages }: ChatMessagesProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll automático para a última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col gap-y-6 pb-10">
      {messages.map((msg, index) => {
        const isUser = msg.sender === "user";

        return (
          <div
            key={msg.id || index}
            className={`flex w-full ${isUser ? "justify-end" : "justify-start animate-in fade-in slide-in-from-bottom-2"}`}
          >
            <div className={`flex gap-x-3 max-w-[80%] ${isUser ? "flex-row-reverse" : "flex-row"}`}>
              
              {/* Avatar ou Ícone */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                isUser ? "bg-gray-200 text-gray-600" : "bg-primary text-white"
              }`}>
                {isUser ? <span className="text-xs font-bold">U</span> : <Sparkles className="w-4 h-4" />}
              </div>

              {/* Bolha de texto */}
              <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                isUser 
                  ? "bg-gray-100 text-gray-800 rounded-tr-none" 
                  : "bg-white border border-gray-100 shadow-sm text-gray-700 rounded-tl-none"
              }`}>
                {msg.text}
              </div>
            </div>
          </div>
        );
      })}
      
      <div ref={scrollRef} />
    </div>
  );
}