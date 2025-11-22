import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "../assets/cores";
import CardDescontos from "./carddescontos";
import CardResumoValores from "./cardresumovalores";

export default function ModuloFinanceiro() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <>
      <View style={{ flexDirection: "column", gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ color: Cor.secundaria }}>Mês Atual</Text>
          <View style={[styles.divider, { backgroundColor: Cor.primaria }]} />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              gap: 5,
            }}
          >
            <CardResumoValores tipo= "fixo"/>
            <CardResumoValores tipo="extra"/>
          </View>
        </View>
          <CardDescontos />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
