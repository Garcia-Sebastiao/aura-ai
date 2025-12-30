import { useAuthStore } from "@/store/auth.store";
import ChatInput from "./chat-input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscribeToMessages } from "@/lib/firestore";
import type { MessageProps } from "@/types/chat.types";
import { ChatMessages } from "./chat-messages";
import { cn } from "@/lib/utils";

export function ChatBody() {
  const { user } = useAuthStore();
  const { id: chatId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(false);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeToMessages(chatId, (data) => {
      setMessages(data);
    });

    return () => {
      unsubscribe();
      setMessages([]);
    };
  }, [chatId]);

  return (
    <div
      className={cn(
        "w-full flex flex-col flex-1 h-full overflow-hidden",
        messages?.length == 0 && "justify-center"
      )}
    >
      <div
        className={cn(
          "overflow-y-auto duration-700 transition-all lg:px-4 custom-scrollbar",
          messages?.length === 0
            ? "items-center flex flex-col flex-1 lg:flex-none"
            : "flex-1"
        )}
      >
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 && !chatId ? (
            <div className="h-full flex flex-col items-center">
              <h1 className="text-2xl pt-40 lg:pt-0 lg:text-5xl text-center pb-6 text-gray-400 max-w-3xl leading-normal lg:leading-tight">
                Olá{" "}
                <span className="text-primary font-medium">
                  {user?.name?.split(" ")[0]}
                </span>
                , como posso ajudar você hoje?
              </h1>
            </div>
          ) : (
            <ChatMessages isTyping={isTyping} messages={messages} />
          )}
        </div>
      </div>

      <div className="lg:p-6 dark:from-transparent dark:via-transparent bg-linear-to-t from-white via-white to-transparent">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput
            setIsTyping={setIsTyping}
            history={messages}
            chatId={chatId as string}
          />
          <p className="text-sm text-center text-gray-400 mt-4">
            A Aura pode cometer erros. Considere verificar informações
            importantes. <br />
            <span className="self-center">
              Desenvolvido por{" "}
              <a
                target="_blank"
                className="underline text-primary"
                href="https://www.linkedin.com/in/garcia-sebastiao"
              >
                Garcia Sebastião
              </a>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
