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

  const valorHoraParada =
    voucher.valorHoraParadaRepasse * voucher.qntTempoParado;

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
                textOverflow: "",
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
              gap: 5,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontWeight: "500",
                  fontSize: 15,
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
                        weekday: "long",
                        day: "2-digit",
                        month: "2-digit",
                        year: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                      },
                    )
                  : "--/--/----"}
              </Text>
              <Text>
                Assinado em:{" "}
                <Text
                  allowFontScaling={false}
                  style={{
                    fontSize: 16,
                    fontWeight: "bold",
                    color:
                      voucher?.natureza === "Fixo"
                        ? Cor.fixo
                        : voucher?.natureza === "Turno"
                          ? Cor.turno
                          : Cor.extra,
                  }}
                >
                  {voucher?.dataHoraConclusao
                    ? new Date(voucher.dataHoraConclusao).toLocaleTimeString(
                        "pt-BR",
                        {
                          weekday: "long",
                          day: "2-digit",
                          month: "2-digit",
                          year: "2-digit",
                          hour: "2-digit",
                          minute: "2-digit",
                        },
                      )
                    : "--/--/----"}
                </Text>
              </Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                width: "70%",
                height: 40,
                borderRadius: 16,
                paddingHorizontal: 5,
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
                <Text
                  allowFontScaling={false}
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#9E9E9E",
                  }}
                >
                  R$
                </Text>
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
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(Number(valorViagemTotal + valorHoraParada))}
              </Text>
              {voucher?.qntTempoParado > 0 ? (
                <>
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      color: "#9E9E9E",
                    }}
                  >
                    |
                  </Text>
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
                    {voucher?.qntTempoParado}h Parado
                  </Text>
                </>
              ) : null}
            </View>

            {/* <View style={styles.dividerH} /> */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                width: "30%",
                height: 40,
                gap: 5,
                alignItems: "center",
                borderRadius: 16,
                paddingHorizontal: 5,
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
                {voucher.id}
              </Text>
            </View>
          </View>
        </View>
        {/* bubble Operador inicio */}
        {voucher?.status === "Cancelado" &&
          voucher?.observacao &&
          voucher.observacao.trim() !== "" && (
            <View
              style={{
                width: "90%",
                justifyContent: "center",
                display: voucher?.observacao === "" ? "none" : "flex",
              }}
            >
              <View style={{ alignSelf: "flex-start", flexDirection: "row" }}>
                {/* Este View pequeno e rotacionado cria o "rabicho" da bolha */}
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor: Cor.texto2,
                    position: "absolute",
                    top: 2,
                    left: 5, // Metade para fora da bolha
                    transform: [{ rotate: "45deg" }], // Rotacionado
                    zIndex: 0,
                  }}
                />

                <View
                  style={{
                    backgroundColor: Cor.texto2,
                    borderRadius: 8,
                    borderTopLeftRadius: 0,
                    marginLeft: 10,
                    padding: 10,
                    maxWidth: "85%",
                  }}
                >
                  {/* O layout aqui é a chave: Row, com Wrap e alinhamento na base */}
                  <Text
                    style={{
                      color: Cor.base2,
                      fontSize: 16,
                    }}
                  >
                    {voucher?.observacao || ""}
                  </Text>
                </View>
              </View>
            </View>
          )}
        {/* bubble Operador fim */}
        {/* bubble Motorista inicio */}
        {voucher?.observacaoMotorista &&
          voucher.observacaoMotorista.trim() !== "" && (
            <View
              style={{
                width: "90%",
                justifyContent: "center",
                marginTop: 5,
              }}
            >
              <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
                {/* Este View pequeno e rotacionado cria o "rabicho" da bolha */}
                <View
                  style={{
                    width: 10,
                    height: 10,
                    backgroundColor:
                      voucher?.natureza === "Fixo"
                        ? Cor.textoFixo
                        : voucher?.natureza === "Turno"
                          ? Cor.textoTurno
                          : Cor.textoExtra,
                    position: "absolute",
                    top: 2,
                    right: 5, // Metade para fora da bolha
                    transform: [{ rotate: "45deg" }], // Rotacionado
                    zIndex: 1,
                  }}
                />
                <View
                  style={{
                    backgroundColor:
                      voucher?.natureza === "Fixo"
                        ? Cor.textoFixo
                        : voucher?.natureza === "Turno"
                          ? Cor.textoTurno
                          : Cor.textoExtra,
                    borderRadius: 8,
                    borderTopRightRadius: 0,
                    marginRight: 10,
                    padding: 8,
                    maxWidth: "85%",
                  }}
                >
                  {/* O layout aqui é a chave: Row, com Wrap e alinhamento na base */}
                  <Text
                    style={{
                      color: Cor.base2,
                      fontSize: 16,
                    }}
                  >
                    {voucher?.observacaoMotorista || ""}
                  </Text>
                </View>
              </View>
            </View>
          )}
        {/* bubble Motorista fim */}
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
                onLongPress={
                  voucher?.status === "Concluido"
                    ? () => {}
                    : () => marcarAusente(p.id)
                }
              />
            );
          })}
        </ScrollView>
      </View>
      {voucher.status === "Concluido" ||
      voucher.status === "Cancelado" ? null : (
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
      )}
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

// Definição das cores padrão do WhatsApp Dark Mode (já que a imagem é dark)
const WA_COLORS = {
  bg_dark: "#111b21",
  bubble_green: "#005c4b",
  text_white: "#e9edef",
  time_gray: "#8696a0",
  read_blue: "#53bdeb",
};

// Interface opcional para garantir a tipagem dos dados no seu app NeoFrota
interface WhatsAppBubbleProps {
  texto: string; // Propriedade para controlar se a mensagem foi lida
}

const WhatsAppBubble: React.FC<WhatsAppBubbleProps> = ({ texto }) => {
  return (
    <View
      style={{
        backgroundColor: WA_COLORS.bg_dark,
        flex: 1,
        justifyContent: "center",
        padding: 20,
      }}
    >
      <View style={{ alignSelf: "flex-end", flexDirection: "row" }}>
        {/* Este View pequeno e rotacionado cria o "rabicho" da bolha */}
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: WA_COLORS.bubble_green,
            position: "absolute",
            top: 0,
            right: -5, // Metade para fora da bolha
            transform: [{ rotate: "45deg" }], // Rotacionado
            zIndex: -1,
          }}
        />

        <View
          style={{
            backgroundColor: WA_COLORS.bubble_green,
            borderRadius: 8,
            // Garante que o canto superior direito seja pontudo (simulando a asa)
            borderTopRightRadius: 0,
            paddingHorizontal: 12,
            paddingTop: 8,
            paddingBottom: 4, // Menos espaço embaixo para alinhar o horário
            maxWidth: "85%",
          }}
        >
          {/* O layout aqui é a chave: Row, com Wrap e alinhamento na base */}
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap", // Faz o horário ir para baixo se o texto for longo
              alignItems: "flex-end", // Alinha o horário à base do texto
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: WA_COLORS.text_white,
                fontSize: 16,
                marginRight: 8, // Espaço entre o texto e o horário
                flexShrink: 1,
              }}
            >
              {texto}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const stylesBubble = StyleSheet.create({
  container: {
    // Fundo da tela inteira (só para demonstração)
    backgroundColor: WA_COLORS.bg_dark,
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  bubbleContainer: {
    // Alinha a bolha à direita (para mensagens enviadas)
    alignSelf: "flex-end",
    flexDirection: "row",
  },
  rightTail: {
    // Truque para criar o "rabicho"
    width: 10,
    height: 10,
    backgroundColor: WA_COLORS.bubble_green,
    position: "absolute",
    top: 0,
    right: -5, // Metade para fora da bolha
    transform: [{ rotate: "45deg" }], // Rotacionado
    zIndex: -1, // Fica atrás do corpo principal
  },
  bubbleBody: {
    backgroundColor: WA_COLORS.bubble_green,
    borderRadius: 8,
    // Garante que o canto superior direito seja pontudo (simulando a asa)
    borderTopRightRadius: 0,
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 4, // Menos espaço embaixo para alinhar o horário
    maxWidth: "85%", // Impede que a bolha ocupe a tela toda
  },
  contentRow: {
    flexDirection: "row",
    flexWrap: "wrap", // Faz o horário ir para baixo se o texto for longo
    alignItems: "flex-end", // Alinha o horário à base do texto
    justifyContent: "flex-end", // Joga o horário para a direita
  },
  messageText: {
    color: WA_COLORS.text_white,
    fontSize: 16,
    marginRight: 8, // Espaço entre o texto e o horário
    flexShrink: 1, // Permite que o texto quebre linha se necessário
  },
  metaContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  timeText: {
    color: WA_COLORS.time_gray,
    fontSize: 12,
    marginTop: 4, // Dá um leve espaço em cima do horário se ele quebrar
  },
  checkText: {
    color: WA_COLORS.read_blue,
    fontSize: 14,
    fontWeight: "bold",
  },
});

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "#9E9E9E",
    marginHorizontal: 10,
    marginVertical: 5,
  },
  dividerH: {
    height: "90%",
    width: 1,
    backgroundColor: "#9E9E9E",
  },
});
