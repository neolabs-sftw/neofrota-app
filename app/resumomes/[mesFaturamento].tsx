import { SafeAreaView } from "react-native-safe-area-context";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "@/assets/cores";
import { router } from "expo-router";
import Navmenu from "@/componentes/navmenu";
import { usePrivacidade } from "@/hooks/usePrivacidade";
import DetalhamentoNatureza from "@/componentes/relatorioNatureza";
import DetalhamentoEmpresa from "@/componentes/relatorioEmpresa";
import { useState } from "react";

export default function ResumoMes() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { segredo: segredoValores, alterarSegredo } = usePrivacidade();

  const [abaAtiva, setAbaAtiva] = useState<"natureza" | "empresa">("natureza");

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Cor.base2,
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: -25,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: Cor.primaria + 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                fontWeight: 500,
                color: Cor.primaria,
                fontSize: 16,
                fontFamily: "Icone",
              }}
              allowFontScaling={false}
            >
              arrow_back
            </Text>
            <Text
              style={{ fontWeight: 500, color: Cor.primaria, fontSize: 12 }}
              allowFontScaling={false}
            >
              Voltar
            </Text>
          </Pressable>
          <View
            style={{
              width: "10%",
              height: 1,
              backgroundColor: Cor.secundaria,
            }}
          />
          <Text
            style={{ fontWeight: 500, color: Cor.secundaria, fontSize: 12 }}
            allowFontScaling={false}
          >
            Detalhes do Faturamento
          </Text>
          <Pressable
            onPress={() => {
              alterarSegredo();
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.primaria,
                fontFamily: "IconeFill",
                fontSize: 30,
              }}
            >
              {segredoValores ? "visibility" : "visibility_off"}
            </Text>
          </Pressable>
        </View>
      </SafeAreaView>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 15,
          paddingHorizontal: 20,
          justifyContent: "center",
          backgroundColor: Cor.base2,
          paddingBottom: 10,
        }}
      >
        <Pressable
          style={{
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 10,
            // Altera a cor do fundo baseada no estado ativo
            backgroundColor: abaAtiva === "natureza" ? Cor.primaria + 20 : Cor.texto1 + 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
          onPress={() => setAbaAtiva("natureza")}
        >
          <Text
            style={{
              fontWeight: 500,
              // Altera a cor do texto baseada no estado ativo
              color: abaAtiva === "natureza" ? Cor.primaria : Cor.texto1 + 50,
              fontSize: 16,
              fontFamily: "Icone",
            }}
            allowFontScaling={false}
          >
            confirmation_number
          </Text>
          <Text
            style={{
              fontWeight: 500,
              color: abaAtiva === "natureza" ? Cor.primaria : Cor.texto1 + 50,
              fontSize: 12,
            }}
            allowFontScaling={false}
          >
            Por Natureza
          </Text>
        </Pressable>
        <Pressable
          style={{
            paddingVertical: 5,
            paddingHorizontal: 20,
            borderRadius: 10,
            // Altera a cor do fundo baseada no estado ativo
            backgroundColor: abaAtiva === "empresa" ? Cor.primaria + 20 : Cor.texto1 + 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
          onPress={() => setAbaAtiva("empresa")}
        >
          <Text
            style={{
              fontWeight: 500,
              // Altera a cor do texto baseada no estado ativo
              color: abaAtiva === "empresa" ? Cor.primaria : Cor.texto1 + 50,
              fontSize: 16,
              fontFamily: "Icone",
            }}
            allowFontScaling={false}
          >
            apartment
          </Text>
          <Text
            style={{
              fontWeight: 500,
              color: abaAtiva === "empresa" ? Cor.primaria : Cor.texto1 + 50,
              fontSize: 12,
            }}
            allowFontScaling={false}
          >
            Por Empresa
          </Text>
        </Pressable>
      </View>
     {abaAtiva === "natureza" ? <DetalhamentoNatureza /> : <DetalhamentoEmpresa />}
      <Navmenu
        home={false}
        calendario={false}
        controle={true}
        equipe={false}
        perfil={false}
      />
    </>
  );
}
