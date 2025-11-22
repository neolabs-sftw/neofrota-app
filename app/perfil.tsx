import { CorClara, CorEscura } from "@/assets/cores";
import DetalhesCarro from "@/componentes/detalhescarro";
import DetalhesFuncionario from "@/componentes/detalhesfuncionario";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useMotorista } from "@/hooks/useMotorista";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, useColorScheme, View } from "react-native";

export default function Perfil() {
  const rota = useRouter();
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const {user, isLoading, logout} = useAuth();
  const motorista = useMotorista(user?.motoristaId);

  const perfil = motorista.data?.motorista;

  const [motoristaID, setMotoristaID] = useState(user?.motoristaId);
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
          alignItems: "center"
        }}
      >
        <Text
          allowFontScaling={false}
          style={{ fontSize: 16, fontWeight: "bold", color: Cor.secundaria }}
        >
          Meu Perfil
        </Text>
        <View
          style={{ flexDirection: "column", gap: 10, paddingHorizontal: 20 }}
        >
          <DetalhesFuncionario
            cpf={perfil?.cpf}
            email={perfil?.email}
            nome={perfil?.nome}
            status={perfil?.statusMotorista}
            fotoMotorista={perfil?.fotoMotorista}
            cnh={perfil?.cnh}
            vCnh={perfil?.vCnh}
          />
          <DetalhesCarro
            idMotorista={user?.motoristaId}
          />
        </View>
        <Pressable
          style={{
            flexDirection: "row",
            gap: 10,
            paddingVertical: 20,
            marginTop: 100,
            width: "80%",
            borderRadius: 22,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: Cor.inativo + 90,
          }}
          onPress={() => {
            // AsyncStorage.removeItem("userToken");
            logout();
            // window.location.reload();
            rota.replace("/login");
          }}
        >
          <Text style={{ color: Cor.texto1, fontWeight: "bold", fontSize: 16 }}>
            Sair
          </Text>
        </Pressable>
      </View>
      <Navmenu
        home={false}
        calendario={false}
        controle={false}
        equipe={false}
        perfil={true}
      />
    </View>
  );
}
