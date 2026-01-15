import { CorClara, CorEscura } from "@/assets/cores";
import { BlurView } from "expo-blur";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function CardPassageiro() {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [passageiroAusente, setPassageiroAusente] = useState(true);
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <>
      <Pressable
        style={{
          flexDirection: "row",
          backgroundColor: passageiroAusente ? Cor.base2 : Cor.atencao + 50,
          width: "100%",
          height: 60,
          borderRadius: 22,
          marginBottom: 10,
          padding: 10,
          shadowColor: "black",
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.05,
          shadowRadius: 2,
        }}
        onLongPress={() => setPassageiroAusente(!passageiroAusente)}
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
              color: passageiroAusente ? Cor.fixo : Cor.atencao,
              textOverflow: "ellipsis",
              overflow: "hidden",
            }}
          >
            {passageiroAusente ? null : "(Ausente)"} Jeferson da Rocha Lima
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
                  color: passageiroAusente ? Cor.texto2 : Cor.texto1,
                }}
              >
                Cargo
              </Text>
            </View>
            <View style={[styles.dividerH, { backgroundColor: Cor.texto1 }]} />
            <View style={{ width: "48%" }}>
              <Text
                allowFontScaling={false}
                style={{
                  fontSize: 12,
                  color: passageiroAusente ? Cor.texto2 : Cor.texto1,
                }}
              >
                Centro de Custo
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
            backgroundColor: Cor.texto2 + "80",
          }}
          onPress={() => setModalVisivel(true)}
        >
          <Text
            allowFontScaling={false}
            style={{
              color: Cor.texto1,
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
                    uri: "https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg",
                  }}
                  style={{
                    width: 80,
                    aspectRatio: 1,
                    backgroundColor: "red",
                    borderRadius: 14,
                  }}
                ></Image>
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
                      Jeferson da Rocha Lima
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
                      (71) 99999-9999
                    </Text>
                    <View
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        width: 56,
                        height: 36,
                        backgroundColor: Cor.primaria,
                        borderTopRightRadius: 12,
                        borderBottomRightRadius: 12,
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
                    </View>
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
                    Av. Rivaldo Gomes Guimarães
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
                    105-A
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
                    Centro
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
                    Simões Filho
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
                    06:00
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
                  lorem ipsum dolor sit amet consectetur adipiscing elit sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua ut
                  enim ad minim veniam quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat
                </Text>
              </View>
            </Pressable>
          </BlurView>
        </Pressable>
      </Modal>
    </>
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
