import { CorClara, CorEscura } from "@/assets/cores";
import CardVoucher from "@/componentes/cardVoucher";
import FuncionariosHome from "@/componentes/funcionairoshome";
import ModuloFinanceiro from "@/componentes/modulofinanceiro";
import MotoristaInfos from "@/componentes/motoristainfos";
import NavMenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useCarroID } from "@/hooks/useCarro";
import { useFrota } from "@/hooks/useFrota";
import { useMotorista } from "@/hooks/useMotorista";
import { useVouchers } from "@/hooks/useVouchers";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";

const listaVoucher = [<CardVoucher />];

function home() {
  const rota = useRouter();
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading } = useAuth();
  const {
    listaVouchers,
    loading,
    error,
    refetch: refetchVouchers,
  } = useVouchers(user?.motoristaId);
  const { motorista, refetch: refetchMotorista } = useMotorista(
    user?.motoristaId
  );
  const { refetch: refetchFrota } = useFrota(user?.motoristaId!);
  const { refetch: refetchCarro } = useCarroID(user?.motoristaId);

  const [reCarregando, setReCarregando] = useState(false);
  const onRefresh = () => {
    setReCarregando(true);
    console.log("Refreshing...");
    refetchMotorista();
    refetchFrota();
    refetchCarro();
    refetchVouchers();
    setTimeout(() => {
      setReCarregando(false);
    }, 1000);
  };

  return (
    <>
      <View style={{ flex: 1, backgroundColor: Cor.base }}>
        <TopoInfos segredo={true} fotoPerfil={false} />
        <MotoristaInfos motoristaId={motorista} />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={reCarregando} onRefresh={onRefresh} />
          }
          style={{
            flex: 1,
            backgroundColor: Cor.base,
            paddingTop: 10,
            paddingBottom: 150,
          }}
        >
          {/* <View style={{width:350, height: 150, backgroundColor:"#333", alignSelf: "center", borderRadius:22, marginBottom: 5 }}/> */}
          {motorista?.tipoMotorista === "Agregado" && <FuncionariosHome />}
          {motorista?.tipoMotorista === "Agregado" && <ModuloFinanceiro />}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Text style={{ color: Cor.secundaria }}>Programação do Dia</Text>
            <View style={[styles.divider, { backgroundColor: Cor.primaria }]} />
          </View>
          {listaVouchers.map((v, index) => {
            return <CardVoucher key={index} Voucher={v} />;
          })}
          <View
            style={{
              width: "100%",
              height: 100,
              backgroundColor: "transparent",
              alignSelf: "center",
              borderRadius: 22,
              marginBottom: 5,
            }}
          />
        </ScrollView>
        <NavMenu
          home={true}
          calendario={false}
          controle={false}
          equipe={false}
          perfil={false}
        />
      </View>
    </>
  );
}

export default home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
