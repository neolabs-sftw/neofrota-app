import { CorClara, CorEscura } from "@/assets/cores";
import { useRouter } from "expo-router";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function CardVoucher({ Voucher }: any) {
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
        onPress={() => {
          route.push({
            pathname: "/voucherdetalhes/[idVoucher]",
            params: {
              idVoucher: Voucher.id,
            },
          });
        }}
      >
        <View
          style={{
            width: "7%",
            height: 75,
            overflow: "hidden",
            backgroundColor:
              Voucher.natureza === "Fixo"
                ? Cor.fixo
                : Voucher.natureza === "Turno"
                ? Cor.turno
                : Cor.extra,
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
              style={{
                color:
                  Voucher.natureza === "Fixo"
                    ? Cor.textoFixo
                    : Voucher.natureza === "Turno"
                    ? Cor.textoTurno
                    : Cor.textoExtra,
                fontWeight: "700",
              }}
            >
              {Voucher.natureza}
            </Text>
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color:
                Voucher.natureza === "Fixo"
                  ? Cor.textoFixo
                  : Voucher.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              fontWeight: "bold",
              fontSize: 14,
            }}
          >
            {Voucher.origem} x {Voucher.destino}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Passageiros:{" "}
            <Text
              style={{
                fontWeight: "bold",
                color:
                  Voucher.natureza === "Fixo"
                    ? Cor.textoFixo
                    : Voucher.natureza === "Turno"
                    ? Cor.textoTurno
                    : Cor.textoExtra,
              }}
            >
              {Voucher.passageiros?.length}
            </Text>
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
            style={{
              color:
                Voucher.natureza === "Fixo"
                  ? Cor.textoFixo
                  : Voucher.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            {new Date(Voucher.dataHoraProgramado).toLocaleTimeString("pt-BR", {
              timeZone: "UTC",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
        <View
          style={{
            width: "16%",
            aspectRatio: 1,
            backgroundColor:
              Voucher.natureza === "Fixo"
                ? Cor.fixo + "20"
                : Voucher.natureza === "Turno"
                ? Cor.turno + "30"
                : Cor.extra + "20",
            borderRadius: 15,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color:
                Voucher.natureza === "Fixo"
                  ? Cor.textoFixo
                  : Voucher.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              fontFamily: "IconeFill",
              fontSize: 24,
            }}
          >
            {Voucher.tipoCorrida === "Entrada" ? "login" : "logout"}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color:
                Voucher.natureza === "Fixo"
                  ? Cor.textoFixo
                  : Voucher.natureza === "Turno"
                  ? Cor.textoTurno
                  : Cor.textoExtra,
              fontSize: 10,
              fontWeight: "bold",
            }}
          >
            {Voucher.tipoCorrida === "Entrada" ? "Entrada" : "Saída"}
          </Text>
        </View>
      </Pressable>
    </>
  );
}
