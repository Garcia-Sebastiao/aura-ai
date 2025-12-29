import { useAuthStore } from "@/store/auth.store";
import ChatInput from "./chat-input";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { subscribeToMessages } from "@/lib/firestore";
import type { MessageProps } from "@/types/chat.types";
import { ChatMessages } from "./chat-messages"; 

export function ChatBody() {
  const { user } = useAuthStore();
  const { id: chatId } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<MessageProps[]>([]);

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
    <div className="w-full flex flex-col flex-1 h-full overflow-hidden">
      {/* Área de conteúdo dinâmico */}
      <div className="flex-1 overflow-y-auto px-4 py-8 custom-scrollbar">
        <div className="max-w-4xl mx-auto w-full">
          {messages.length === 0 ? (
            // TELA INICIAL (Boas-vindas)
            <div className="h-full flex flex-col justify-center">
              <h1 className="text-5xl pb-6 text-gray-300 max-w-3xl leading-tight">
                Olá{" "}
                <span className="text-primary font-medium">
                  {user?.name?.split(" ")[0]}
                </span>
                ,
                <br />
                como posso ajudar você hoje?
              </h1>
            </div>
          ) : (
            // LISTA DE MENSAGENS
            <ChatMessages messages={messages} />
          )}
        </div>
      </div>

      {/* FOOTER COM INPUT */}
      <div className="p-6 bg-linear-to-t from-white via-white to-transparent">
        <div className="max-w-4xl mx-auto w-full">
          <ChatInput history={messages} chatId={chatId as string} />
          <p className="text-[10px] text-center text-gray-400 mt-4">
            A Aura pode cometer erros. Considere verificar informações
            importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
