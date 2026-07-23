import { CorClara, CorEscura } from "@/assets/cores";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useEditarMotorisa, useMotorista } from "@/hooks/useMotorista";
import { router } from "expo-router";
import { useState } from "react";
import {
  useColorScheme,
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  ActivityIndicator,
} from "react-native";

export default function AlterarSenha() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading, logout } = useAuth();

  const { motorista, refetch: refetchMotorista } = useMotorista(
    user?.motoristaId,
  );

  const {
    editarMotorista,
    loading: editandoSenha,
    error,
  } = useEditarMotorisa();

  const [senha, setSenha] = useState<string>("");
  const [reSenha, setReSenha] = useState<string>("");

  const novaSenha = senha === reSenha ? senha : undefined;

  const EditarSenhaFunc = async () => {
    if (senha === "" && reSenha === "") {
      return Alert.alert("Atenção", "Digite as senhas antes de redefinir.");
    }

    if (novaSenha === undefined) {
      return Alert.alert("Atenção", "Senhas não conferem.");
    }

    if (novaSenha.length < 4) {
      return Alert.alert(
        "Atenção",
        "Sua senha deve ter ao menos 4 caracteres.",
      );
    }
    await editarMotorista(user?.motoristaId, { senha });

    console.log(user?.motoristaId, reSenha);

    Alert.alert("Sucesso", "Sua senha foi alterada com sucesso!")

    router.replace("/home")
  };

  const motoristaID = user?.motoristaId;

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={false} motoristaID={motoristaID} />
      <View
        style={{
          paddingTop: 20,
          paddingHorizontal: 30,
          gap: 20,
          width: "100%",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text allowFontScaling={false} style={{ fontSize: 20 }}>
          Definir Nova Senha
        </Text>
        <Text allowFontScaling={false} style={{ fontSize: 12 }}>
          Insira a nova senha abaixo para confirmar a alteração.
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text>Nova Senha:</Text>
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
            placeholder="Digite sua senha"
            placeholderTextColor="#999999"
            secureTextEntry={true}
            value={reSenha}
            onChangeText={(text) => setReSenha(text)}
          />
        </View>
        <View
          style={{
            width: "100%",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "flex-start",
          }}
        >
          <Text>Repita Nova Senha:</Text>
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
            placeholder="Repita sua senha"
            placeholderTextColor="#999999"
            secureTextEntry={true}
            value={senha}
            onChangeText={(text) => setSenha(text)}
          />
        </View>
        {senha === "" && reSenha === "" ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.texto2 + 30,
                fontFamily: "Icone",
                fontSize: 22,
              }}
            >
              circle
            </Text>
          </View>
        ) : reSenha === senha ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.ativo,
                fontFamily: "Icone",
                fontSize: 22,
              }}
            >
              check
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.ativo,
              }}
            >
              Suas senhas estão corretas!
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.inativo,
                fontFamily: "Icone",
                fontSize: 22,
              }}
            >
              release_alert
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: Cor.inativo,
              }}
            >
              As senhas devem ser iguais!
            </Text>
          </View>
        )}
        <Pressable
          style={{
            backgroundColor: Cor.primaria + 50,
            paddingVertical: 10,
            paddingHorizontal: 50,
            borderRadius: 12,
          }}
          onPress={() => EditarSenhaFunc()}
        >
          {editandoSenha ? (
            <ActivityIndicator color={Cor.secundaria} />
          ) : (
            <Text allowFontScaling={false}>Redefinir</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}
