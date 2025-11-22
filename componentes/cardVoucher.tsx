import { CorClara, CorEscura } from "@/assets/cores";
import { useRouter } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function CardVoucher() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const route = useRouter();

  return (
    <>
      <Pressable
        style={{
          width: "auto",
          height: 75,
          marginHorizontal: 20,
          backgroundColor: Cor.base2,
          borderRadius: 22,
          marginBottom: 10,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
        onPress={() => { route.push({
          pathname: "/voucherdetalhes/[idVoucher]",
          params: {
            idVoucher: 1,
          },
        })}}
      >
        <View
          style={{
            width: "7%",
            height: 75,
            overflow: "hidden",
            backgroundColor: Cor.fixo,
            borderTopLeftRadius: 22,
            borderBottomLeftRadius: 22,
          }}
        />
        <View
          style={{
            width: "50%",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Tipo:{" "}
            <Text
              allowFontScaling={false}
              style={{ color: Cor.fixo, fontWeight: "700" }}
            >
              Fixo
            </Text>
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.fixo, fontWeight: "bold", fontSize: 14 }}
          >
            Unidade da Empresa
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Passageiros:{" "}
            <Text style={{ fontWeight: "bold", color: Cor.fixo }}>2</Text>
          </Text>
        </View>
        <View
          style={{ width: 1, height: 55, backgroundColor: Cor.texto2 }}
        ></View>
        <View
          style={{
            width: "18%",
            flexDirection: "column",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 10 }}
          >
            Horário
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.fixo, fontSize: 14, fontWeight: "bold" }}
          >
            23:50
          </Text>
        </View>
        <View
          style={{
            width: "16%",
            aspectRatio: 1,
            backgroundColor: Cor.fixo + "20",
            borderRadius: 15,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Cor.fixo,
              fontFamily: "IconeFill",
              fontSize: 24,
            }}
          >
            login
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.fixo, fontSize: 10, fontWeight: "bold" }}
          >
            Entrada
          </Text>
        </View>
      </Pressable>
    </>
  );
}
