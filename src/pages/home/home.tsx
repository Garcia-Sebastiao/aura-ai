import { Button } from "@/components/ui/button";
import { Sidebar } from "./components/sidebar/sidebar";
import { MenuIcon, ShareIcon, SparklesIcon } from "lucide-react";
import { ChatBody } from "./components/chat/chat";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function Home() {
  const { id: chatId } = useParams<{ id: string }>();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-full relative overflow-hidden h-dvh flex">
      <Sidebar onClose={() => setIsOpen(false)} isOpen={isOpen} />

      <div className="flex flex-col relative h-dvh flex-1 pb-6 gap-y-6">
       <header className={cn("w-full py-6 sticky flex items-center px-4 lg:px-8 justify-between", chatId && "lg:hidden")}>
            <div className="flex items-center gap-x-2">
              <button
                className="lg:hidden"
                onClick={() => setIsOpen((value) => !value)}
              >
                <MenuIcon className="w-6 h-6" />
              </button>
              <h4 className="font-semibold text-xl dark:text-white text-gray-400">
                AuraChat
              </h4>
              <span className="py-1 px-3 text-sm border border-border rounded-md">
                Plus
              </span>
            </div>

            <div className="flex items-center gap-x-4">
              <Button
                onClick={() => navigate("/chat")}
                className="py-1! h-9 px-4! [&>svg]:size-4! font-semibold border-none rounded-lg"
              >
                Novo chat
                <SparklesIcon />
              </Button>

              <Button
                variant="ghost"
                className="py-3! hidden lg:flex px-4! h-9 [&>svg]:size-4!  border border-border font-medium rounded-lg"
              >
                <ShareIcon className="w-4 h-4" />
                Partilhar
              </Button>
            </div>
          </header>

        <ChatBody />
      </div>
    </div>
  );
}
