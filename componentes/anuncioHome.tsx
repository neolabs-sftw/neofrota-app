import { CorClara, CorEscura } from "@/assets/cores";
import { BlurView } from "expo-blur";
import { View, Text, useColorScheme } from "react-native";

export function AnuncioHome() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <BlurView
      intensity={5}
      experimentalBlurMethod="dimezisBlurView"
      style={{
        position: "absolute",
        zIndex: 1000,
        width: "100%",
        height: "100%",
        backgroundColor: Cor.base + 50,
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      <View
        style={{
          width: "80%",
          height: "70%",
          backgroundColor: Cor.base,
          justifyContent: "center",
          alignContent: "center",
          borderStyle: "solid",
          borderColor: "white",
          borderWidth: 3,
          borderRadius: 22,
          shadowColor: "black",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}
      >
        <Text>Anúncio</Text>
      </View>
    </BlurView>
  );
}
