import { CorClara, CorEscura } from "@/assets/cores";
import CardPassageiro from "@/componentes/cardpassageiro";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function VoucherDetalhes() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const route = useRoute();
  const router = useRouter();
  const { idVoucher } = route.params as {
    idVoucher: any;
  };

  const voucher = JSON.parse(decodeURIComponent(idVoucher));

  const valorViagemTotal =
    voucher.valorViagemRepasse +
    voucher.valorDeslocamentoRepasse +
    voucher.valorPedagio;

  const [passageirosAtualizados, setPassageirosAtualizados] = useState<any[]>(
    [],
  );

  const marcarAusente = (voucherPassageiroId: string) => {
    setPassageirosAtualizados((prev) =>
      prev.map((p) =>
        p.id === voucherPassageiroId
          ? {
              ...p,
              statusPresenca:
                p.statusPresenca !== "Ausente"
                  ? "Ausente"
                  : p.statusPresenca !== "Presente"
                    ? "Presente"
                    : "Ausente",
            }
          : p,
      ),
    );
  };

  useEffect(() => {
    setPassageirosAtualizados(voucher?.passageiros);
  }, [voucher?.id]);

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
        <View
          style={{
            width: "100%",
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 30,
          }}
        >
          <View style={{ width: "45%", flexDirection: "column" }}>
            <Text allowFontScaling={false}>Origem</Text>
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.texto1,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {voucher?.origem || "..."}
            </Text>
          </View>
          <View
            style={{
              width: "10%",
              height: 50,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text
              style={{
                color: Cor.texto1,
                fontSize: 38,
                fontFamily: "IconeFill",
                fontWeight: "bold",
              }}
            >
              arrow_right
            </Text>
          </View>
          <View
            style={{
              width: "45%",
              alignItems: "flex-end",
            }}
          >
            <Text allowFontScaling={false}>Destino</Text>
            <Text
              numberOfLines={1}
              allowFontScaling={false}
              style={{
                color: Cor.texto1,
                fontSize: 20,
                fontWeight: "bold",
              }}
            >
              {voucher?.destino || "..."}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            marginBottom: 20,
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
                {voucher?.unidadeCliente?.nome}
              </Text>
              <Text
                allowFontScaling={false}
                style={{ fontWeight: "500", fontSize: 14, color: "##9E9E9E" }}
              >
                {voucher?.empresaCliente?.rSocial}
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
                  {voucher?.passageiros?.length}
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
                  fontSize: 18,
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
                      },
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
                  color:
                    voucher?.natureza === "Fixo"
                      ? Cor.fixo
                      : voucher?.natureza === "Turno"
                        ? Cor.turno
                        : Cor.extra,
                }}
              >
                {new Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(Number(valorViagemTotal))}
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
                backgroundColor:
                  voucher?.natureza === "Fixo"
                    ? Cor.fixo + "50"
                    : voucher?.natureza === "Turno"
                      ? Cor.turno + "50"
                      : Cor.extra + "50",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color:
                    voucher?.natureza === "Fixo"
                      ? Cor.fixo
                      : voucher?.natureza === "Turno"
                        ? Cor.turno
                        : Cor.extra,
                  fontFamily: "IconeFill",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                {voucher.tipoCorrida === "Entrada" ? "login" : "logout"}
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  color:
                    voucher?.natureza === "Fixo"
                      ? Cor.fixo
                      : voucher?.natureza === "Turno"
                        ? Cor.turno
                        : Cor.extra,
                  fontSize: 18,
                }}
              >
                {voucher.tipoCorrida}
              </Text>
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
            paddingBottom: 150,
            paddingHorizontal: 20,
            paddingTop: 10,
          }}
        >
          {passageirosAtualizados.map((p: any, index: any) => {
            return (
              <CardPassageiro
                p={p}
                natureza={voucher?.natureza}
                key={index}
                onLongPress={() => marcarAusente(p.id)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Pressable
        onPress={() =>
          router.push({
            pathname: "/voucherconcluir/[idVoucher]",
            params: {
              idVoucher: JSON.stringify(voucher),
              passageirosAtualizados: JSON.stringify(passageirosAtualizados),
            },
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
