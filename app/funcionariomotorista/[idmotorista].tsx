import { CorClara, CorEscura } from "@/assets/cores";
import DetalhesCarro from "@/componentes/detalhescarro";
import DetalhesFuncionario from "@/componentes/detalhesfuncionario";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useMotorista } from "@/hooks/useMotorista";
import { useRoute } from "@react-navigation/native";
// import LottieView from "lottie-react-native";
import { Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FuncionarioMotorista() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const route = useRoute();

  const {
    idmotorista,
  } = route.params as {
    idmotorista: number;
  };
  const { data: motoristaId } = useMotorista(idmotorista);
  const motorista = motoristaId?.motorista;

  const avisoCNH = (
    <View
      style={{
        flexDirection: "row",
        gap: 10,
        paddingHorizontal: 20,
        paddingVertical: 5,
        backgroundColor: Cor.inativo + 50,
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* <LottieView
        source={require("../../assets/animation/icinativo.json")}
        autoPlay
        speed={1}
        loop={true}
        style={{
          width: 500,
          height: 500,
          position: "absolute",
          opacity: 0.5,
          left: -350,
        }}
      /> */}
      <View style={{ flexDirection: "row", alignItems: "center", zIndex: 1 }}>
        {/* <LottieView
          source={require("../../assets/animation/icinativo.json")}
          autoPlay
          speed={2.5}
          loop={true}
          style={{ width: 50, height: 50 }}
        /> */}
        <Text allowFontScaling={false} style={{ color: Cor.texto1 }}>
          CNH Vencida desde o dia{" "}
          <Text style={{ fontWeight: "bold", color: Cor.inativo }}>
            22/12/2022
          </Text>
        </Text>
      </View>
    </View>
  );
  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={true} />
      <SafeAreaView style={{ flex: 1, backgroundColor: Cor.base, gap: 10 }}>
        {motorista?.statusCnh === "false" ? avisoCNH : null}
        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "column",
            gap: 10,
            paddingHorizontal: 20,
          }}
        >
          <DetalhesFuncionario
            cpf={motorista?.cpf}
            email={motorista?.email}
            nome={motorista?.nome}
            status={motorista?.statusMotorista}
            fotoMotorista={motorista?.fotoMotorista}
            cnh={motorista?.cnh}
            vCnh={motorista?.vCnh}
          />

          <DetalhesCarro idMotorista={motorista?.id} />
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <View
              style={{
                padding: 10,
                backgroundColor: Cor.primaria,
                borderRadius: 22,
                width: "40%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{ color: Cor.texto1, fontSize: 16, fontWeight: "bold" }}
              >
                Salvar
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
      <Navmenu
        home={false}
        calendario={false}
        controle={false}
        equipe={false}
        perfil={false}
      />
    </View>
  );
}
