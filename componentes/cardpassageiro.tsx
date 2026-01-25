import { CorClara, CorEscura } from "@/assets/cores";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function CardPassageiro({
  p,
  natureza,
  onLongPress
}: {
  p: any;
  natureza: string;
  onLongPress: () => void;
}) {
  const [modalVisivel, setModalVisivel] = useState(false);
  // const statusPresenca = true
  const statusPresenca = p.statusPresenca !== "Ausente" ? true : false
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const passageiro = p?.passageiroId;

  const abrirLink = async (url: string) => {
    const verificacao = await Linking.canOpenURL(url);

    if (!verificacao) {
      Alert.alert("Ops", "Não dá pra abrir esse link no seu aparelho.");
      return;
    }

    await Linking.openURL(url);
  };

  function formatarTelefone(telefone: string) {
    let digitos = telefone.replace(/\D/g, "");

    digitos = digitos.replace(/^0+/, "");

    if (digitos.length === 11) digitos = "55" + digitos;

    return digitos;
  }

  return (
    <View>
      {statusPresenca ? null : (
        <View
          style={{
            position: "absolute",
            alignSelf: "center",
            top: "20%",
            left: "45%",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            width: "50%",
            padding: 5,
            backgroundColor: Cor.base,
            zIndex: 10,
            borderRadius: 12,
            borderWidth: 1,
            borderColor: Cor.texto2 + 50,
            shadowColor: "black",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              zIndex: 10,
              color: Cor.atencao,
            }}
          >
            Ausente
          </Text>
        </View>
      )}
      <Pressable
        style={{
          flexDirection: "row",
          backgroundColor: statusPresenca ? Cor.base2 : Cor.atencao + 50,
          width: "100%",
          height: 60,
          borderRadius: 22,
          marginBottom: 10,
          padding: 10,
          opacity: statusPresenca ? 1 : 0.2,
          shadowColor: "black",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}
        // onLongPress={() => setStatusPresenca(!statusPresenca)}
        onLongPress={onLongPress}
      >
        <View
          style={{
            flexDirection: "column",
            width: "80%",
            height: 30,
            justifyContent: "space-between",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: statusPresenca
                ? natureza === "Fixo"
                  ? Cor.textoFixo
                  : natureza === "Turno"
                    ? Cor.textoTurno
                    : Cor.textoExtra
                : Cor.atencao,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {passageiro?.nome || "pensando"}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={{ width: "48%" }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: statusPresenca ? Cor.texto2 : Cor.atencao + 99,
                }}
              >
                Horário: <Text style={{fontWeight: "bold"}}>{passageiro?.horarioEmbarque}</Text>
              </Text>
            </View>
            <View
              style={[
                styles.dividerH,
                {
                  backgroundColor: statusPresenca
                    ? Cor.texto2
                    : Cor.atencao + 99,
                },
              ]}
            />
            <View style={{ width: "48%" }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: statusPresenca ? Cor.texto2 : Cor.atencao + 99,
                }}
              >
                Custo: <Text style={{fontWeight: "bold"}}>{passageiro?.centroCustoClienteId.nome}</Text>
              </Text>
            </View>
          </View>
        </View>
        <Pressable
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 16,
            backgroundColor: statusPresenca
              ? Cor.texto2 + 80
              : Cor.atencao + 50,
          }}
          onPress={() => setModalVisivel(true)}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: statusPresenca ? Cor.texto1 : Cor.atencao,
              textAlign: "center",
              fontWeight: "700",
            }}
          >
            Ver
          </Text>
        </Pressable>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisivel}
        onRequestClose={() => {
          setModalVisivel(false);
        }}
      >
        <Pressable
          style={{
            flex: 1,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
          onPress={() => setModalVisivel(false)}
        >
          <BlurView
            intensity={30}
            experimentalBlurMethod="dimezisBlurView"
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Cor.base + "CC",
            }}
          >
            <Pressable
              onPress={() => {}}
              style={{
                width: "80%",
                backgroundColor: Cor.base2,
                borderRadius: 20,
                padding: 10,
                alignItems: "center",
                shadowColor: "black",
                shadowOffset: {
                  width: 2,
                  height: 2,
                },
                shadowOpacity: 0.05,
                shadowRadius: 2,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Image
                  source={{
                    uri:
                      passageiro?.fotoPerfilPassageiro ||
                      "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
                  }}
                  style={{
                    width: 80,
                    aspectRatio: 1,
                    borderRadius: 14,
                  }}
                />
                <View
                  style={{
                    flexDirection: "column",
                    gap: 5,
                    justifyContent: "space-between",
                    width: "70%",
                  }}
                >
                  <View
                    style={{
                      height: 36,
                      padding: 10,
                      backgroundColor: Cor.texto2 + "20",
                      borderRadius: 12,
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{
                        fontWeight: "bold",
                        fontSize: 12,
                        color: Cor.texto1,
                      }}
                    >
                      {passageiro?.nome}
                    </Text>
                  </View>
                  <View
                    style={{
                      height: 36,
                      paddingLeft: 10,
                      backgroundColor: Cor.texto2 + "20",
                      borderRadius: 12,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      allowFontScaling={false}
                      style={{ fontSize: 12, color: Cor.texto1 }}
                    >
                      {passageiro?.telefone}
                    </Text>
                    <Pressable
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 36,
                        backgroundColor: Cor.primaria,
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
                      }}
                      onPress={() => {
                        abrirLink(
                          `https://wa.me/${formatarTelefone(
                            passageiro?.telefone,
                          )}`,
                        );
                      }}
                    >
                      <Text
                        allowFontScaling={false}
                        style={{
                          fontFamily: "IconeFill",
                          fontSize: 24,
                          color: Cor.base,
                        }}
                      >
                        phone
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginHorizontal: 10,
                  marginVertical: 10,
                  width: "100%",
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ color: Cor.secundaria, fontSize: 12 }}
                >
                  Dados do Passageiro
                </Text>
                <View
                  style={{
                    height: 1,
                    width: "55%",
                    backgroundColor: Cor.primaria,
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: Cor.texto1 + 20,
                    width: "100%",
                    padding: 10,
                    borderRadius: 18,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 10, color: Cor.secundaria }}
                  >
                    Endereço:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 14, color: Cor.texto1 }}
                  >
                    {passageiro?.endRua}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: Cor.texto1 + 20,
                    width: "30%",
                    padding: 10,
                    borderRadius: 18,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 10, color: Cor.secundaria }}
                  >
                    Número:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, color: Cor.texto1 }}
                  >
                    {passageiro?.endNumero}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: Cor.texto1 + 20,
                    width: "66%",
                    padding: 10,
                    borderRadius: 18,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 10, color: Cor.secundaria }}
                  >
                    Bairro:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, color: Cor.texto1 }}
                  >
                    {passageiro?.endBairro}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  gap: 10,
                  marginBottom: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: Cor.texto1 + 20,
                    width: "61%",
                    padding: 10,
                    borderRadius: 18,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 10, color: Cor.secundaria }}
                  >
                    Cidade:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, color: Cor.texto1 }}
                  >
                    {passageiro?.endCidade}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    backgroundColor: Cor.texto1 + 20,
                    width: "35%",
                    padding: 10,
                    borderRadius: 18,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ fontSize: 10, color: Cor.secundaria }}
                  >
                    Horário apanha:
                  </Text>
                  <Text
                    allowFontScaling={false}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{ fontSize: 14, color: Cor.texto1 }}
                  >
                    {passageiro?.horarioEmbarque}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "column",
                  backgroundColor: Cor.texto1 + 20,
                  width: "100%",
                  padding: 10,
                  borderRadius: 18,
                }}
              >
                <Text
                  allowFontScaling={false}
                  style={{ fontSize: 10, color: Cor.secundaria }}
                >
                  Complemento:
                </Text>
                <Text
                  allowFontScaling={false}
                  numberOfLines={5}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 14,
                    color: Cor.texto1,
                    textAlign: "justify",
                  }}
                >
                  {passageiro?.pontoApanha || "Sem Complemento"}
                </Text>
              </View>
            </Pressable>
          </BlurView>
        </Pressable>
      </Modal>
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
  },
});
