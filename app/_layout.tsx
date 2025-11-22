import client from "@/services/apolloClient";
import { ApolloProvider } from "@apollo/client/react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import SplashScreen from "./splashscreen";

export default function RootLayout() {
  const [loaded] = useFonts({
    Icone: require("@/assets/fonts/MaterialSymbolsRounded-Light.ttf"),
    IconeFill: require("@/assets/fonts/MaterialSymbolsRounded-Fill.ttf"),
  });

  if (!loaded) {
    return <SplashScreen />;
  }

  return (
    <ApolloProvider client={client}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen
          name="home"
        />
      </Stack>
    </ApolloProvider>
  );
}
