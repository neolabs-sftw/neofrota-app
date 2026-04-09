import { CorClara, CorEscura } from "@/assets/cores";
import TopoInfos from "@/componentes/topoinfos";
import { useEditarVoucher } from "@/hooks/useVouchers";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
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

  const { idVoucher, passageirosAtualizados } = route.params as {
    idVoucher: any;
    passageirosAtualizados: any;
  };

  const voucher = JSON.parse(idVoucher);
  const passageirosPresenca = JSON.parse(passageirosAtualizados);

  const valorViagemTotal =
    voucher.valorViagemRepasse +
    voucher.valorDeslocamentoRepasse +
    voucher.valorHoraParadaRepasse * tempoParado +
    voucher.valorPedagio;

  const [obsMotorista, setObsMotorista] = useState<string>("");

  const [isLoading, setIsLoading] = useState(false);

  const pendingSig = useRef<{
    resolve: (s: string) => void;
    reject: (e: Error) => void;
  } | null>(null);

  const requestSignature = () =>
    new Promise<string>((resolve, reject) => {
      pendingSig.current = { resolve, reject };
      ref.current?.readSignature();

      setTimeout(() => {
        if (pendingSig.current) {
          pendingSig.current = null;
          reject(new Error("Timeout ao capturar assinatura"));
        }
      }, 1500);
    });

  const handleOk = (sig: string) => {
    setSignature(sig);
    pendingSig.current?.resolve(sig);
    pendingSig.current = null;
  };

  const handleEmpty = () => {
    pendingSig.current?.reject(new Error("Assinatura vazia"));
    pendingSig.current = null;
  };

  const [signature, setSignature] = React.useState<string | null>(null);
  const ref = useRef<any>(null);

  const handleClear = () => {
    setSignature(null);
    ref.current.clearSignature();
  };

  const { editarVoucher, data, loading, error } = useEditarVoucher(voucher.id);

  const rateioVoucher =
    (voucher.valorViagem +
      voucher.valorDeslocamento +
      voucher.valorHoraParada +
      voucher.valorPedagio) /
    voucher.passageiros.length;

  const confirmar = async () => {
    // if (!signature) {
    //   Alert.alert("Atenção", "Por favor, assine antes de confirmar.");
    //   return;
    // }

    try {
      const sig = await requestSignature();

      setIsLoading(true);
      await editarVoucher({
        assinatura: sig,
        // assinatura: signature,
        dataHoraConclusao: new Date().toISOString(),
        qntTempoParado: tempoParado,
        observacaoMotorista: obsMotorista,
        valorViagem: voucher.valorViagem,
        valorViagemRepasse: voucher.valorViagemRepasse,
        valorDeslocamento: voucher.valorDeslocamento,
        valorDeslocamentoRepasse: voucher.valorDeslocamentoRepasse,
        valorHoraParada: voucher.valorHoraParada,
        valorHoraParadaRepasse: voucher.valorHoraParadaRepasse,
        valorPedagio: 0,
        valorEstacionamento: 0,
        status: "Concluido",
        passageiros: passageirosPresenca.map((p: any) => ({
          id: p.id,
          horarioEmbarqueReal: new Date().toISOString(),
          statusPresenca:
            p.statusPresenca === "Ausente" ? "Ausente" : "Presente",
          rateio: Number(rateioVoucher),
        })),
      });
      router.push("/home");
      // setInterval(() => router.push("/home"), 2000);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Erro", "Falha ao salvar a assinatura.");
    } finally {
      setIsLoading(false);
    }
  };

  // const loadingTemp = true;

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      {isLoading ? <Confirmacao /> : null}
      <TopoInfos segredo={false} fotoPerfil={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: Cor.base,
        }}
      >
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
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
                  onOK={handleOk}
                  onEmpty={handleEmpty}
                  webStyle={`.m-signature-pad--footer {display: none; margin: 0px;}`}
                  backgroundColor="white"
                  penColor="#053058"
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
        {/* </TouchableWithoutFeedback>
        </KeyboardAvoidingView> */}
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

function Confirmacao() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  return (
    <BlurView
      intensity={10}
      tint="light"
      pointerEvents="none"
      experimentalBlurMethod="dimezisBlurView"
      style={{
        flex: 1,
        width: "100%",
        height: "100%",
        backgroundColor: Cor.primaria,
        position: "absolute",
        zIndex: 100,
        top: 0,
        left: 0,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <ActivityIndicator color={Cor.texto1} size={"large"} />
      <Text>Enviando Voucher</Text>
    </BlurView>
  );
}
