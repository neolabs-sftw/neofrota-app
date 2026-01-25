import { CorClara, CorEscura } from "@/assets/cores";
import TopoInfos from "@/componentes/topoinfos";
import { useEditarVoucher } from "@/hooks/useVouchers";
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

  const [tempoParado, setTempoParado] = useState<0 | 1 | 2 | 3 | 4>(0);

  const { idVoucher } = route.params as {
    idVoucher: any;
  };

  const voucher = JSON.parse(idVoucher);

  const valorViagemTotal =
    voucher.valorViagem +
    voucher.valorDeslocamento +
    voucher.valorHoraParada * tempoParado +
    voucher.valorPedagio;

  const [obsMotorista, setObsMotorista] = useState<string>("");

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

  const handleEnd = () => {
    setIsLoading(true);
    ref.current?.readSignature();
  };

  const { editarVoucher, data, loading, error } = useEditarVoucher(voucher.id);

  const rateioVoucher =
    (voucher.valorViagem +
      voucher.valorDeslocamento +
      voucher.valorHoraParada +
      voucher.valorPedagio) /
    voucher.passageiros.length;

  const fechamento = {
    assinatura: signature,
    dataHoraConclusao: new Date().toISOString(),
    qntTempoParado: tempoParado,
    observacaoMotorista: obsMotorista,
    valorViagem: voucher.valorViagem,
    valorViagemRepasse: voucher.valorViagemRepasse,
    valorDeslocamento: voucher.valorDeslocamento,
    valorDeslocamentoRepasse: voucher.valorDeslocamentoRepasse,
    valorHoraParada: tempoParado * voucher.valorHoraParada,
    valorHoraParadaRepasse: tempoParado * voucher.valorHoraParadaRepasse,
    valorPedagio: 0,
    valorEstacionamento: 0,
    status: "Concluido",
    passageiros: voucher?.passageiros?.map((p: any) => ({
      id: String(p.id),
      statusPresenca: "Presente",
      rateio: 0,
      horarioEmbarqueReal: new Date().toISOString(),
    })),
  };

  async function fechamentoVoucher() {
    await editarVoucher({
      assinatura: signature,
      dataHoraConclusao: new Date().toISOString(),
      qntTempoParado: tempoParado,
      observacaoMotorista: obsMotorista,
      valorViagem: voucher.valorViagem,
      valorViagemRepasse: voucher.valorViagemRepasse,
      valorDeslocamento: voucher.valorDeslocamento,
      valorDeslocamentoRepasse: voucher.valorDeslocamentoRepasse,
      valorHoraParada: tempoParado * voucher.valorHoraParada,
      valorHoraParadaRepasse: tempoParado * voucher.valorHoraParadaRepasse,
      valorPedagio: 0,
      valorEstacionamento: 0,
      status: "Concluido",
      passageiros: voucher?.passageiros?.map((p: any) => ({
        id: String(p.id),
        statusPresenca: "Presente",
        rateio: 0,
        horarioEmbarqueReal: new Date().toISOString(),
      })),
    });
  }

  const confirmar = async () => {
    if (!signature) {
      Alert.alert("Atenção", "Por favor, assine antes de confirmar.");
      return;
    }

    try {
      setIsLoading(true);
      fechamentoVoucher();
      // console.log("Assinatura Base64:", signature);
      // router.push("../confirmado");
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar a assinatura.");
    } finally {
      setIsLoading(false);
    }
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
                Valor Total:{" "}
                <Text
                  allowFontScaling={false}
                  style={{
                    color:
                      voucher?.natureza === "Fixo"
                        ? Cor.fixo
                        : voucher?.natureza === "Turno"
                          ? Cor.turno
                          : Cor.extra,
                    fontSize: 24,
                    fontWeight: "bold",
                  }}
                >
                  {" "}
                  {new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(valorViagemTotal))}
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
                <TempoParado value={tempoParado} onChange={setTempoParado} />
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
                    onChangeText={(e) => setObsMotorista(e)}
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

type Props = {
  value: 0 | 1 | 2 | 3 | 4;
  onChange: (v: 0 | 1 | 2 | 3 | 4) => void;
};

export function TempoParado({ value, onChange }: Props) {
  const options: Array<0 | 1 | 2 | 3 | 4> = [0, 1, 2, 3, 4];

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  return (
    <View
      accessibilityRole="radiogroup"
      style={{
        flexDirection: "row",
        gap: 10,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text style={{ color: Cor.texto2 }}>Tempo {"\n"}Parado: </Text>
      {options.map((opt) => {
        const selected = value === opt;

        return (
          <Pressable
            key={opt}
            onPress={() => {
              onChange(opt);
            }}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              paddingVertical: 10,
              paddingHorizontal: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: selected ? Cor.primaria : Cor.texto2,
              backgroundColor: selected ? Cor.primaria + 90 : "tranparent",
              opacity: selected ? 1 : 0.7,
            }}
          >
            <Text
              style={{
                fontSize: 16,
                color: selected ? Cor.texto1 : Cor.texto2,
              }}
            >
              {opt}h
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
