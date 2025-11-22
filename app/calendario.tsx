import { CorClara, CorEscura } from "@/assets/cores";
import CardVoucher from "@/componentes/cardVoucher";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { ScrollView, Text, useColorScheme, View } from "react-native";

export default function Calendario() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

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
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 14 }}
          >
            Histórico de Vouchers
          </Text>
          <View style={{ height: 1, backgroundColor: Cor.primaria }} />
        </View>
        <View style={{ width: "100%", paddingHorizontal: 20 }}>
          <View
            style={{
              width: "100%",
              height: 250,
              backgroundColor: Cor.base2,
            }}
          ></View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 12 }}
          >
            Registros do dia
          </Text>
          <View
            style={{ width: "100%", height: 1, backgroundColor: Cor.primaria }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
          <CardVoucher />
        </ScrollView>
      </View>
      <Navmenu
        home={false}
        calendario={true}
        controle={false}
        equipe={false}
        perfil={false}
      />
    </View>
  );
}
