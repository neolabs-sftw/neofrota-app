import { useAuth } from "@/hooks/useAuth"; // ajuste o caminho
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./splashscreen";

export default function Index() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [splashShown, setSplashShown] = useState(false);

  useEffect(() => {
    const showSplashAndRedirect = async () => {
      // Mostra splash por 3 segundos
      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSplashShown(true);

      // Só redireciona depois do splash
      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    };

    showSplashAndRedirect();
  }, [token, router]);

  // Enquanto: carregando token OU splash não terminou
  if (isLoading || !splashShown) {
    return <SplashScreen />;
  }

  // Nunca chega aqui (router.replace já redirecionou)
  return null;
}