import { CorClara, CorEscura } from "@/assets/cores";
// import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { useColorScheme, View } from "react-native";

export default function SplashScreen() {
  useEffect(() => {
    const timeout = setTimeout(() => {}, 5000); // tempo da animação

    return () => clearTimeout(timeout);
  }, []);

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Cor.base,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <LottieView
        source={require("../assets/animation/LogoNeoFrotaLottie.json")}
        autoPlay
        loop={false}
        style={{ width: 150, height: 150 }}
      /> */}
    </View>
  );
}
