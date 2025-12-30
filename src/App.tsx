import { Route, Routes } from "react-router";
import { Home } from "./pages/home/home";
import "./index.css";
import { SignIn } from "./pages/auth/sign-in";
import { useAuthStore } from "./store/auth.store";
import { useEffect } from "react";
import { ProtectedRoute } from "./routes/protected-routes";
import { ThemeWatcher } from "./components/layout/theme-watcher";

export function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
    return () => initialize();
  }, [initialize]);

  return (
    <>
      <ThemeWatcher />
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route
          path="/chat/:id?"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
