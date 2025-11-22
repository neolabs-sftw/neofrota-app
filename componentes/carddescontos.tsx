import { CorClara, CorEscura } from "@/assets/cores";
import { Text, useColorScheme, View } from "react-native";

export default function CardDescontos() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  return (
    <>
      <View
        style={{
          width: "auto",
          height: 50,
          marginHorizontal: 20,
          backgroundColor: Cor.base2,
          borderRadius: 22,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: Cor.atencao + 20,
            borderTopStartRadius: 22,
            borderBottomStartRadius: 22,
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 10,
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: Cor.atencao,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "IconeFill",
                color: "#F4F4F4",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              money_off
            </Text>
          </View>
        </View>
        <Text allowFontScaling={false} style={{ color: Cor.texto1 }}>
          Descontos
        </Text>
        <Text allowFontScaling={false} style={{ color: Cor.texto2 }}>
          R$ <Text style={{ fontWeight: "bold", fontSize: 16, color: Cor.atencao }}>150,00</Text>
        </Text>
      </View>
    </>
  );
}
