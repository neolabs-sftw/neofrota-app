import { CorClara, CorEscura } from "@/assets/cores";
import { useRouter } from "expo-router";
// import LottieView from "lottie-react-native";
import { useEffect } from "react";
import { useColorScheme, View } from "react-native";

export default function Confirmado() {

    const rota = useRouter();

    useEffect(() => {
        setTimeout(() => {
          rota.replace("/home");
        }, 3000);
    })
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Cor.primaria,
      }}
    >
      {/* <LottieView
        source={require("../assets/animation/confirmado.json")}
        autoPlay
        loop={false}
        style={{ width: 150, height: 150 }}
      /> */}
    </View>
  );
}
