import { CorClara, CorEscura } from "@/assets/cores";
import CardFuncionario from "@/componentes/cardfuncionario";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useFrota } from "@/hooks/useFrota";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";

export default function EquipeMotoristas() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading } = useAuth();
  const { data: frota, refetch: refetchFrota } = useFrota(user?.motoristaId!);

  const listaFuncionarios = frota?.listaFuncionariosAgregadoId;

  const [reCarregando, setReCarregando] = useState(false);
  const onRefresh = () => {
    setReCarregando(true);
    console.log("Refreshing...");
    refetchFrota();
    setTimeout(() => {
      setReCarregando(false);
    }, 2000);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: Cor.base,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            marginTop: 10
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 14 }}
          >
            Equipe de Motoristas
          </Text>
          <View
            style={{ height: 1, backgroundColor: Cor.primaria, width: "100%" }}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={reCarregando} onRefresh={onRefresh} />
          }
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 20,
            gap: 10,
          }}
        >
          {listaFuncionarios?.map((motorista) => {
            return (
              <CardFuncionario
                key={motorista.motoristaComoFuncionario.id}
                idmotorista={Number(motorista.motoristaComoFuncionario.id)}
              />
            );
          })}
        </ScrollView>
      </View>
      <Navmenu
        home={false}
        calendario={false}
        controle={false}
        equipe={true}
        perfil={false}
      />
    </View>
  );
}
function setReCarregando(arg0: boolean) {
  throw new Error("Function not implemented.");
}
