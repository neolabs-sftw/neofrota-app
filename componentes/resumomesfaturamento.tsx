import { Pressable, Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "../assets/cores";

export default function ResumoMesFaturamento() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  return (
    <>
      <Pressable>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: Cor.base2,
            height: 50,
            borderRadius: 22,
            padding: 10,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ fontWeight: "bold", fontSize: 16, color: Cor.texto1 }}
          >
            Dezembro
          </Text>
          <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
            <Text
              allowFontScaling={false}
              style={{ color: Cor.texto2, fontSize: 14 }}
            >
              R${" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 18,
                  color: Cor.primaria,
                }}
              >
                37.500,00
              </Text>
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.primaria,
                fontSize: 18,
                fontFamily: "IconeFill",
              }}
            >
              chevron_right
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
