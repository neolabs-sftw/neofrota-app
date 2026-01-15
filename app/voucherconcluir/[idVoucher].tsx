import { CorClara, CorEscura } from "@/assets/cores";
import TopoInfos from "@/componentes/topoinfos";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import SignaturePad from "react-native-signature-canvas";

export default function VoucherConcluir() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const route = useRoute();

  const navigation = useNavigation();

  const { idVoucher } = route.params as { idVoucher: number };

  const [signature, setSignature] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<any>(null);

  const handleSignature = (signature: any) => {
    setSignature(signature);
    setIsLoading(false);
  };

  const handleClear = () => {
    setSignature(null);
    ref.current.clearSignature();
  };

  const confirmar = async () => {
    if (!signature) {
      Alert.alert("Atenção", "Por favor, assine antes de confirmar.");
      return;
    }

    try {
      setIsLoading(true);
      // Aqui você pode enviar a assinatura para o backend
      // Exemplo:
      // await fetch(`${API_URL}/salvar-assinatura`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ idVoucher, assinatura: signature }),
      // });

      console.log("Assinatura Base64:", signature);
      router.push("../confirmado");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar a assinatura.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnd = () => {
    setIsLoading(true);
    ref.current?.readSignature();
  };

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: Cor.base,
        }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View
              style={{
                flex: 1,
                alignItems: "center",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.texto1,
                  fontSize: 15,
                  marginTop: 10,
                }}
              >
                Voucher:{" "}
                <Text
                  allowFontScaling={false}
                  style={{
                    color: Cor.fixo,
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  {idVoucher}
                </Text>
              </Text>
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                  paddingHorizontal: 20,
                  gap: 15,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: 40,
                    backgroundColor: Cor.base2,
                  }}
                ></View>
                <View
                  style={{
                    width: "100%",
                    height: 120,
                    backgroundColor: Cor.base2,
                    borderRadius: 22,
                    padding: 10,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: Cor.secundaria, fontSize: 12 }}
                  >
                    Observação:
                  </Text>

                  <TextInput
                    multiline
                    style={{ flex: 1, fontSize: 14, color: Cor.texto1 }}
                    placeholder="Observação"
                  />
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 300,
                    backgroundColor: Cor.base2,
                    borderRadius: 22,
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{ color: Cor.secundaria, fontSize: 12, padding: 10 }}
                  >
                    Assinatura:
                  </Text>
                  <View style={{ flex: 1 }}>
                    <SignaturePad
                      ref={ref}
                      onOK={handleSignature}
                      onEnd={handleEnd}
                      webviewProps={{
                        // Custom WebView optimization
                        cacheEnabled: true,
                        androidLayerType: "hardware",
                      }}
                    />
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Pressable
                        onPress={handleClear}
                        style={{
                          alignItems: "center",
                          width: "50%",
                        }}
                      >
                        <Text
                          allowFontScaling={false}
                          style={{ color: Cor.secundaria, marginVertical: 10 }}
                        >
                          Limpar Assinatura
                        </Text>
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Pressable
                  // onPress={() => router.push("../confirmado")}
                  onPress={() => confirmar()}
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignSelf: "center",
                    alignItems: "center",
                    overflow: "hidden",
                    width: "100%",
                    height: 50,
                    zIndex: 1,
                    borderRadius: 22,
                    marginHorizontal: 20,
                    borderWidth: 1,
                    borderColor: Cor.primaria,
                    backgroundColor: Cor.primaria + "AA",
                  }}
                >
                  <BlurView
                    intensity={50}
                    tint="light"
                    pointerEvents="none"
                    style={StyleSheet.absoluteFill}
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
                    Confirmar
                  </Text>
                </Pressable>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Text
                    allowFontScaling={false}
                    style={{
                      color: Cor.primaria,
                      fontSize: 14,
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                    onPress={() => {
                      router.push("/_sitemap");
                    }}
                  >
                    Cancelar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
}
