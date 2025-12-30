import { auth, googleProvider } from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { syncUser } from "@/lib/firestore";

export function useSignIn() {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userData = {
        id: user.uid,
        name: user.displayName || "Usuário",
        email: user.email || "",
        avatar: user.photoURL || "",
      };

      await syncUser(userData);
      localStorage.setItem("@app:user", JSON.stringify(userData));

      navigate("/chat");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  return { handleGoogleSignIn };
}
