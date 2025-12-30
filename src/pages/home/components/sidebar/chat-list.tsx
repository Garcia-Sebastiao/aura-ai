import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import { subscribeToUserChats } from "@/lib/firestore";
import { MessageSquare, Clock } from "lucide-react";
import type { ChatProps } from "@/types/chat.types";
import { Link } from "react-router-dom";

export function ChatList() {
  const { user } = useAuthStore();
  const [chats, setChats] = useState<ChatProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.id) return;

    const unsubscribe = subscribeToUserChats(user.id, (data) => {
      setChats(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user?.id]);

  if (loading) {
    return (
      <div className="flex flex-col gap-y-4">
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-8 w-full bg-gray-100 animate-pulse rounded-xl"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-y-2">
      {chats?.map((chat) => (
        <Link
          to={`/chat/${chat?.id}`}
          key={chat?.id}
          className="w-full flex items-center gap-x-3 p-3 rounded-xl hover:bg-primary/5 transition-all cursor-pointer group text-left border border-transparent hover:border-primary/10"
        >
          <div className="bg-primary/10 p-2.5 rounded-lg group-hover:bg-primary/20 transition-colors">
            <MessageSquare className="w-4 h-4 text-primary" />
          </div>

          <div className="flex-1 overflow-hidden">
            <p className="text-sm font-medium text-gray-700 truncate group-hover:text-primary transition-colors">
              {chat.title || "Conversa sem título"}
            </p>

            <div className="flex items-center gap-x-1 text-[10px] text-gray-400 mt-1">
              <Clock className="w-3 h-3" />
              <span>
                {chat.updatedAt?.seconds
                  ? new Date(chat.updatedAt.seconds * 1000).toLocaleDateString(
                      "pt-AO"
                    )
                  : "Agora mesmo"}
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
