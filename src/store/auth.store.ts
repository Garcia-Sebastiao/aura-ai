import { create } from "zustand";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import type { UserProps } from "@/types/user.types";

interface AuthState {
  user: UserProps | null;
  loading: boolean;
  setUser: (user: UserProps | null) => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user, loading: false }),

  initialize: () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      set({
        user: {
          id: user?.uid as string,
          name: user?.displayName || "Usuário",
          email: user?.email || "",
          avatar: user?.photoURL || "",
        },
        loading: false,
      });
    });
    return unsubscribe;
  },
}));
