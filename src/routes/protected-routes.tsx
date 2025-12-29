import { Loading } from "@/pages/loading";
import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthStore();

  if (loading) return <Loading />;
  if (!user) return <Navigate to="/" />;

  return <>{children}</>;
}
