import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import { PenBoxIcon, SearchIcon, SparklesIcon, SunIcon } from "lucide-react";
import { ChatList } from "./chat-list";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  return (
    <div className="w-full max-w-80 h-screen sticky top-0 flex">
      <div className="flex-1 max-w-20 flex justify-between flex-col bg-gray-100 items-center px-2 py-4">
        <img src="/logo.png" className="w-12 flex-none h-12" alt="Aura logo" />

        <div className="flex flex-col gap-y-4 items-center w-full">
          <Button
            variant="ghost"
            className="w-12 h-12 border bg-white border-border rounded-full flex items"
          >
            <SunIcon className="w-8 h-8 text-primary" />
          </Button>
          <Avatar src={user?.avatar} name={user?.name as string} />
        </div>
      </div>

      <div className="flex-1 border-r flex flex-col gap-y-6 justify-between border-border py-4 px-3">
        <div className="w-full flex border-b border-border pb-6 flex-col gap-y-6">
          <div className="flex items-center mt-2 w-full justify-between">
            <h4 className="font-medium">Chat</h4>
            <SearchIcon className="h-5 text-black/60 w-5" />
          </div>

          <Button
            onClick={() => navigate("/chat")}
            className="w-full p-3! [&>svg]:size-4! font-medium rounded-lg"
          >
            <PenBoxIcon className="w-4 h-4" />
            Novo chat
            <SparklesIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col gap-y-4 w-full">
          <h4 className="text-black font-medium">Conversas</h4>
          <ChatList />
        </div>

        <Button
          variant="ghost"
          className="w-full mb-2 p-3! [&>svg]:size-4!  border border-border font-medium rounded-xl"
        >
          Atualizar para Pro.
        </Button>
      </div>
    </div>
  );
}
