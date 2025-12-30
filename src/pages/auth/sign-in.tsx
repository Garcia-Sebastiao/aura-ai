import { GoogleIcon } from "@/assets/icons/google-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSignIn } from "./hooks/use-sign-in";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export function SignIn() {
  const { handleGoogleSignIn } = useSignIn();
  const savedUser = localStorage.getItem("@app:user");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/chat");
    }
  }, [user, navigate]);

  return (
    <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div className="col-span-1 px-6 flex-col flex justify-center items-center h-full">
        <div className="w-full max-w-lg flex flex-col gap-y-6 items-start">
          <h4 className="text-3xl font-semibold ">Iniciar Sessão</h4>

          <form action="" className="w-full flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-2">
              <label className="font-medium">
                Email <span className="text-red-500 font-semibold">*</span>
              </label>

              <Input
                disabled
                readOnly
                className="h-13 text-base! rounded-lg placeholder:text-base shadow-none"
                placeholder="Digite o seu email"
              />
            </div>

            <Button
              disabled
              className="w-full h-13 hover:brightness-90 cursor-pointer text-base font-medium rounded-lg"
            >
              Continuar
            </Button>
          </form>

          <div className="flex items-center gap-x-6 w-full">
            <div className="flex-1 h-px bg-border" />
            <span className="dark:text-white/60 text-black/50">Ou</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          <Button
            onClick={handleGoogleSignIn}
            variant={"ghost"}
            className="w-full dark:text-white/60! h-13 gap-x-4 hover:brightness-90 cursor-pointer text-base border-2 border-[#222] dark:border-border font-medium rounded-lg"
          >
            <div className="flex-none scale-125">
              <GoogleIcon />
            </div>
            Continuar com o google
          </Button>

          <span className="self-center text-base">
            Desenvolvido por{" "}
            <a
              target="_blank"
              className="underline text-primary"
              href="https://github.com/Garcia-Sebastiao"
            >
              Garcia Sebastião
            </a>
          </span>
        </div>
      </div>

      <div className="hidden col-span-1 lg:flex items-center justify-center overflow-hidden relative h-full bg-gray-50  dark:bg-secondary-background dark:border-l-0 border-l-gray-100 border-l-3">
        <div className="w-96 h-96 -top-56 absolute -left-20 rounded-full border-3 dark:border-gray-50/10 border-gray-200" />
        <div className="w-96 h-96 -top-64 absolute left-0 rounded-full border-3 border-primary" />
        <div className="w-80 h-80 -top-56 absolute left-16 rounded-full border-3 border-primary" />

        <div className="w-96 h-96 -bottom-56 absolute -right-20 rounded-full border-3 dark:border-gray-50/10 border-gray-200" />
        <div className="w-96 h-96 -bottom-64 absolute right-0 rounded-full border-3 border-primary" />
        <div className="w-80 h-80 -bottom-56 absolute right-16 rounded-full border-3 border-primary" />

        <div className="flex flex-col gap-y-6">
          <h4 className="text-5xl leading-tight max-w-3xl dark:text-white text-gray-400">
            Ajudamos a cuidar da sua saúde mental com a
            <span className="text-primary font-medium"> Aura.</span>
          </h4>

          <p className="text-xl dark:text-white/60 text-black/60 max-w-2xl">
            Obtenha apoio e diagnóstico antecipado com IA 24h por dia, e obtenha
            todos os recursos para cuidar de si.
          </p>
        </div>
      </div>
    </div>
  );
}
