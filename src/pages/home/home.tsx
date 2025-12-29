import { Button } from "@/components/ui/button";
import { Sidebar } from "./components/sidebar/sidebar";
import { ShareIcon, SparklesIcon } from "lucide-react";
import { ChatBody } from "./components/chat/chat";

export function Home() {
  return (
    <div className="w-full relative min-h-screen flex">
      <Sidebar />

      <div className="flex flex-col relative h-screen flex-1 py-6 gap-y-6 px-8">
        <header className="w-full sticky flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <h4 className="font-semibold text-xl text-gray-400">AuraChat</h4>
            <span className="py-1 px-3 text-sm border border-border rounded-md">
              Plus
            </span>
          </div>

          <div className="flex items-center gap-x-4">
            <Button className="py-1! h-9 px-4! [&>svg]:size-4! font-semibold border-none rounded-lg">
              Novo chat
              <SparklesIcon />
            </Button>

            <Button
              variant="ghost"
              className="py-3! px-4! h-9 [&>svg]:size-4!  border border-border font-medium rounded-lg"
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
