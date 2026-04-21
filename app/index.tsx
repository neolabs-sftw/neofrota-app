import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import SplashScreen from "./splashscreen";

export default function Index() {
  const { token, isLoading } = useAuth();
  const router = useRouter();
  const [splashShown, setSplashShown] = useState(false);

  useEffect(() => {
    const showSplashAndRedirect = async () => {

      await new Promise((resolve) => setTimeout(resolve, 3000));
      setSplashShown(true);

      if (token) {
        router.replace("/home");
      } else {
        router.replace("/login");
      }
    };

    showSplashAndRedirect();
  }, [token, router]);

  if (isLoading || !splashShown) {
    return <SplashScreen />;
  }

  return null;
}