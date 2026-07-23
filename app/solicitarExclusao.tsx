import { CorClara, CorEscura } from "@/assets/cores";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useMotorista } from "@/hooks/useMotorista";
import { router } from "expo-router";
import { useState } from "react";
import {
  useColorScheme,
  View,
  Text,
  Pressable,
  TextInput,
  Linking,
  Alert,
} from "react-native";

export default function SolicitarExclusao() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user } = useAuth();
  const motoristaID = user?.motoristaId;

  const { motorista } = useMotorista(motoristaID);
  const [cpfValidacao, setCpfValidacao] = useState<string>("");
  const enviarMensagem = async () => {
    // 1. Verifica se o campo está vazio
    if (cpfValidacao === "") {
      Alert.alert("Atenção", "Informe seu CPF!");
      return; // O 'return' encerra a função aqui imediatamente!
    }

    const cpfDigitadoLimpo = cpfValidacao.replace(/\D/g, "");

    // Se motorista.cpf existir, limpa. Se não, assume string vazia.
    const cpfBancoLimpo = motorista?.cpf
      ? motorista.cpf.replace(/\D/g, "")
      : "";

    // 3. Compara as versões limpas
    if (cpfDigitadoLimpo !== cpfBancoLimpo) {
      Alert.alert("INCORRETO", "Seu CPF não confere com o informado.");
      return;
    }

    // --- Se o código chegou até aqui, é porque o CPF passou nas duas validações acima ---

    const emailDestino = "jeferson.lima.cj@gmail.com";
    const assunto = `SOLICITAÇÃO DE EXCLUSÃO DO MOTORISTA ${motorista?.nome}`;
    const corpoMensagem = "Olá, gostaria de relatar que...";

    // Formata a URL no padrão mailto
    const url = `mailto:${emailDestino}?subject=${assunto}&body=${corpoMensagem}`;

    try {
      // 3. Agora sim, testamos especificamente se o celular consegue abrir o link de e-mail
      const suporta = await Linking.canOpenURL(url);

      if (suporta) {
        await Linking.openURL(url);
      } else {
        Alert.alert(
          "Erro",
          "Nenhum aplicativo de e-mail encontrado neste dispositivo.",
        );
      }
    } catch (error) {
      console.error("Erro ao abrir o app de e-mail:", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={false} motoristaID={motoristaID} />
      <View
        style={{
          flex: 1,
          backgroundColor: Cor.base,
          gap: 10,
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            flexDirection: "column",
            marginTop: 25,
            borderWidth: 4,
            borderColor: Cor.atencao + 80,
            borderRadius: 22,
            padding: 15,
            gap: 10,
          }}
        >
          <View style={{ flexDirection: "row", gap: 15, alignItems: "center" }}>
            <View
              style={{
                width: 80,
                height: 80,
                borderRadius: 12,
                backgroundColor: Cor.atencao + 50,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.atencao,
                  fontFamily: "Icone",
                  fontSize: 65,
                }}
              >
                delete_forever
              </Text>
            </View>
            <View>
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.atencao,
                  fontSize: 20,
                  fontWeight: 600,
                }}
              >
                Solicitação de
              </Text>
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.atencao,
                  fontSize: 35,
                  fontWeight: 900,
                }}
              >
                Exclusão
              </Text>
            </View>
          </View>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontSize: 12, textAlign: "justify" }}
          >
            Aviso: Ao solicitar a exclusão, sua conta passará por análise da
            operadora. Lembre-se de que essa ação é definitiva e não poderá ser
            desfeita.
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontSize: 14, textAlign: "center" }}
          >
            Para a sua segurança, confirme o seu CPF antes de prosseguir.
          </Text>
          <TextInput
            allowFontScaling={false}
            style={{
              color: Cor.texto1,
              padding: 20,
              borderRadius: 22,
              width: "100%",
              marginTop: 5,
              backgroundColor: Cor.base2,
            }}
            keyboardType="decimal-pad"
            placeholder="Seu CPF aqui"
            placeholderTextColor="#999999"
            value={cpfValidacao}
            onChangeText={(text) => setCpfValidacao(text)}
          />
          <Pressable
            style={{
              flexDirection: "row",
              gap: 10,
              paddingVertical: 20,
              width: "100%",
              borderRadius: 22,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Cor.inativo + 90,
            }}
            onPress={() => enviarMensagem()}
          >
            <Text
              allowFontScaling={false}
              style={{ color: Cor.texto1, fontWeight: "bold", fontSize: 16 }}
            >
              Solicitar Exclusão
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => router.replace("/home")}>
          <Text
            allowFontScaling={false}
            style={{
              marginTop: 50,
              textDecorationLine: "underline",
              textDecorationStyle: "solid",
              textDecorationColor: Cor.atencao,
              color: Cor.atencao,
              fontWeight: 500,
            }}
          >
            Cancelar
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
