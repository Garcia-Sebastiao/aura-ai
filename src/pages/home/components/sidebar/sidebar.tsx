import { useEffect, useRef } from "react";
import { Avatar } from "@/components/shared/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth.store";
import {
  LogOutIcon,
  MoonIcon,
  PenBoxIcon,
  SearchIcon,
  SparklesIcon,
  SunIcon,
} from "lucide-react";
import { ChatList } from "./chat-list";
import { useNavigate } from "react-router-dom";
import { useThemeStore } from "@/store/theme.store";
import { cn } from "@/lib/utils";

export function Sidebar({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { user } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const navigate = useNavigate();

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "w-full fixed shadow-xl transition-all lg:shadow-none flex max-w-84 h-screen dark:bg-background bg-white lg:bg-transparent z-100 lg:z-auto lg:sticky top-0",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      )}
    >
      <div className="flex-1 max-w-20 flex justify-between flex-col dark:bg-secondary-background bg-gray-100 items-center px-2 py-4">
        <img src="/logo.png" className="w-12 flex-none h-12" alt="Aura logo" />

        <div className="flex flex-col gap-y-4 items-center w-full">
          <Button
            variant="ghost"
            onClick={toggleTheme}
            className="w-12 h-12 border dark:border-0 dark:bg-white/5 bg-background border-border rounded-full flex items-center justify-center hover:bg-accent transition-all"
          >
            {theme === "dark" ? (
              <SunIcon className="w-6 h-6 text-yellow-400" />
            ) : (
              <MoonIcon className="w-6 h-6 text-slate-700" />
            )}
          </Button>

          <Button
            variant="ghost"
            onClick={() => {
              navigate("/");
              localStorage.removeItem("@app:user");
            }}
            className="w-12 h-12 border dark:border-0 dark:bg-white/5 bg-background border-border rounded-full flex items-center justify-center hover:bg-accent transition-all"
          >
            <LogOutIcon className="w-6 h-6" />
          </Button>

          <Avatar src={user?.avatar} name={user?.name as string} />
        </div>
      </div>

      <div className="flex-1 lg:border-r flex flex-col gap-y-6 justify-between border-border py-4 px-3">
        <div className="w-full flex border-b border-border pb-6 flex-col gap-y-6">
          <div className="flex items-center mt-2 w-full justify-between">
            <h4 className="font-medium">Chat</h4>
            <SearchIcon className="h-5 text-black/60 w-5" />
          </div>

          <Button
            onClick={() => {
              onClose();
              navigate("/chat");
            }}
            className="w-full p-3! [&>svg]:size-4! font-medium rounded-lg"
          >
            <PenBoxIcon className="w-4 h-4" />
            Novo chat
            <SparklesIcon className="w-4 h-4" />
          </Button>
        </div>

        <div className="flex-1 flex flex-col gap-y-4 w-full">
          <h4 className="dark:text-white text-black font-medium">Conversas</h4>
          <ChatList onClose={onClose} />
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
