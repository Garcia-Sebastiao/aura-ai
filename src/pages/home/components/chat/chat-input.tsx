import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar para navegação
import {
  Sparkles,
  Paperclip,
  ArrowUp,
  ChevronDown,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { handleSendMessage } from "@/services/chat.service";
import { startNewChat } from "@/lib/firestore";
import { useAuthStore } from "@/store/auth.store";
import type { MessageProps } from "@/types/chat.types";

interface ChatInputProps {
  chatId?: string;
  history: MessageProps[];
  setIsTyping: (value: boolean) => void;
}

const ChatInput = ({ chatId, history, setIsTyping }: ChatInputProps) => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const onSend = async () => {
    if (!message.trim() || isLoading || !user?.id) return;

    try {
      setIsLoading(true);
      setIsTyping(true);
      const currentMessage = message;
      setMessage("");
      if (textareaRef.current) textareaRef.current.style.height = "auto";

      let activeId = chatId;

      if (!activeId) {
        activeId = await startNewChat(user.id, currentMessage);
        navigate(`/chat/${activeId}`);

        await handleSendMessage(activeId, currentMessage, [], true);
      } else {
        await handleSendMessage(activeId, currentMessage, history);
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao iniciar conversa.");
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleInput = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    const newHeight = Math.min(textarea.scrollHeight, 300);
    textarea.style.height = `${newHeight}px`;
  };

  return (
    <div className="w-full">
      <div className="relative flex flex-col w-full dark:bg-white/10 bg-white dark:border-border border border-gray-200 rounded-[40px] shadow-sm p-4">
        <div className="flex items-start gap-2 px-2 pt-2">
          <Sparkles
            className={`w-5 h-5 mt-1 ${
              isLoading ? "text-primary animate-pulse" : "text-gray-400 dark:text-white/60"
            }`}
          />

          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onInput={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                onSend();
              }
            }}
            placeholder="Como posso te ajudar hoje?"
            className="w-full bg-transparent border-none focus:ring-0 dark:text-white text-gray-600 placeholder-gray-400 dark:placeholder-white/60 resize-none py-1 overflow-hidden"
            rows={1}
            disabled={isLoading}
          />
        </div>

        <div className="mt-4 flex items-center justify-between">
          <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium dark:text-white text-gray-700 dark:bg-white/10 bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors opacity-50 cursor-not-allowed">
            Select Source <ChevronDown className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              disabled
              className="hidden md:flex items-center gap-2 px-4 py-2 text-gray-700 border dark:border-border border-gray-200 rounded-full"
            >
              <Paperclip className="w-4 h-4 rotate-45" /> Attach
            </Button>

            <Button
              onClick={onSend}
              disabled={isLoading || !message.trim()}
              className="flex items-center justify-center w-10 h-10 bg-primary text-white rounded-full hover:brightness-90 transition-colors ml-1 dark:disabled:bg-white/10 disabled:bg-gray-200"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <ArrowUp className="w-5 h-5" />
              )}
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
