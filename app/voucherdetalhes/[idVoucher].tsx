import { CorClara, CorEscura } from "@/assets/cores";
import CardPassageiro from "@/componentes/cardpassageiro";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useVoucherId } from "@/hooks/useVouchers";
import { useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const logo =
  "data:image/png;base64,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";

export default function VoucherDetalhes() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const route = useRoute();
  const router = useRouter();
  const { idVoucher } = route.params as {
    idVoucher: string;
  };

  const { voucher } = useVoucherId(idVoucher || "0");

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <View
        style={{
          backgroundColor: Cor.primaria,
          width: "100%",
          height: "35%",
          position: "absolute",
          top: 0,
        }}
      ></View>
      <TopoInfos segredo={false} fotoPerfil={true} />
      <View style={{ flex: 1, alignItems: "center", flexDirection: "column" }}>
        <Text
          allowFontScaling={false}
          style={{
            color: Cor.texto1,
            fontSize: 15,
            marginTop: 10,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Cor.texto1,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {voucher?.origem || "..."}
          </Text>
          {" "}X{" "}<Text
            allowFontScaling={false}
            style={{
              color: Cor.texto1,
              fontSize: 24,
              fontWeight: "bold",
            }}
          >
            {voucher?.destino || "..."}
          </Text>
        </Text>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            margin: 20,
            borderRadius: 24,
            padding: 10,
            alignItems: "center",
            justifyContent: "space-between",
            flexDirection: "column",
            shadowColor: "black",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.05,
            shadowRadius: 2,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={
                voucher?.empresaCliente?.fotoLogoCliente
                  ? { uri: voucher.empresaCliente.fotoLogoCliente }
                  : {
                      uri: "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/foto_logo_cliente/icon.png",
                    }
              }
              style={{
                width: 80,
                height: 80,
                backgroundColor: Cor.texto1,
                borderRadius: 16,
              }}
              resizeMode="contain"
            />
            <View style={{ flex: 1, flexDirection: "column", paddingLeft: 10 }}>
              <Text
                allowFontScaling={false}
                style={{ fontWeight: "bold", fontSize: 20, color: "#2F2F2F" }}
              >
                {voucher?.empresaCliente.nome}
              </Text>
              <Text
                allowFontScaling={false}
                style={{ fontWeight: "500", fontSize: 14, color: "##9E9E9E" }}
              >
                {voucher?.unidadeCliente?.nome}
              </Text>
            </View>
          </View>
          <View style={{ width: "100%", padding: 5 }}>
            <Text
              numberOfLines={2}
              ellipsizeMode="tail"
              allowFontScaling={false}
              style={{
                fontWeight: "500",
                fontSize: 11,
                color: "#9E9E9E",
                textAlign: "center",
              }}
            >
              {voucher?.unidadeCliente?.endRua},{" "}
              {voucher?.unidadeCliente?.endNumero} -{" "}
              {voucher?.unidadeCliente?.endBairro} {`\n`}
              {voucher?.unidadeCliente?.endCidade} -{" "}
              {voucher?.unidadeCliente?.endUf}
              {voucher?.unidadeCliente?.endComplemento}
            </Text>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "column", width: "45%" }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: "#9E9E9E",
                }}
              >
                Voucher:{" "}
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color:
                      voucher?.natureza === "Fixo"
                        ? Cor.fixo
                        : voucher?.natureza === "Turno"
                        ? Cor.turno
                        : Cor.extra,
                  }}
                >
                  {voucher?.id}
                </Text>
              </Text>

              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: "#9E9E9E",
                }}
              >
                Passageiros:{" "}
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    color:
                      voucher?.natureza === "Fixo"
                        ? Cor.fixo
                        : voucher?.natureza === "Turno"
                        ? Cor.turno
                        : Cor.extra,
                  }}
                >
                  {voucher?.passageiros.length}
                </Text>
              </Text>
            </View>
            <View style={styles.dividerH} />
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "45%",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  fontSize: 14,
                  color: "#9E9E9E",
                }}
              >
                Data e Horário:
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color:
                    voucher?.natureza === "Fixo"
                      ? Cor.fixo
                      : voucher?.natureza === "Turno"
                      ? Cor.turno
                      : Cor.extra,
                }}
              >
                {voucher?.dataHoraProgramado
                  ? new Date(voucher.dataHoraProgramado).toLocaleTimeString(
                      "pt-BR",
                      {
                        timeZone: "UTC",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "--/--/----"}
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                width: "60%",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  fontSize: 11,
                  color: "#9E9E9E",
                }}
              >
                Valor:{" "}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  color: Cor.fixo,
                }}
              >
                R$ 100,00
              </Text>
            </View>

            <View style={styles.dividerH} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "35%",
                height: 40,
                gap: 10,
                alignItems: "center",
                borderRadius: 16,
                paddingHorizontal: 10,
                backgroundColor: Cor.fixo,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.textoFixo,
                  fontFamily: "IconeFill",
                  fontSize: 20,
                }}
              >
                arrow_downward
              </Text>
              <Text allowFontScaling={false}>Entrada</Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            paddingHorizontal: 20,
            width: "100%",
          }}
        >
          <Text style={{ color: Cor.secundaria }}>Passageiros</Text>
          <View
            style={[
              styles.divider,
              { backgroundColor: Cor.primaria, marginVertical: 0 },
            ]}
          />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 120,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          <CardPassageiro />
          <CardPassageiro />
          <CardPassageiro />
          <CardPassageiro />
          <CardPassageiro />
          <CardPassageiro />
        </ScrollView>
      </View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/voucherconcluir/[idVoucher]",
            params: { idVoucher: 43712 },
          })
        }
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignSelf: "center",
          alignItems: "center",
          overflow: "hidden",
          position: "absolute",
          width: "90%",
          bottom: 100,
          height: 50,
          zIndex: 1,
          borderRadius: 22,
          marginHorizontal: 20,
          borderWidth: 1,
          borderColor: Cor.primaria,
          backgroundColor: Cor.primaria + 70,
        }}
      >
        <BlurView
          intensity={15}
          // tint="light"
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
          experimentalBlurMethod="dimezisBlurView"
        />
        <Text
          allowFontScaling={false}
          style={{
            color: Cor.texto1,
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          Avançar
        </Text>
      </Pressable>

      <Navmenu
        home={false}
        calendario={false}
        controle={false}
        equipe={false}
        perfil={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#9E9E9E",
    marginHorizontal: 20,
    marginVertical: 10,
  },
  dividerH: {
    height: "90%",
    width: 1,
    backgroundColor: "#9E9E9E",
  },
});
