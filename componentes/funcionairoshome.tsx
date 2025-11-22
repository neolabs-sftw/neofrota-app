import { useAuth } from "@/hooks/useAuth";
import { useFrota } from "@/hooks/useFrota";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { CorClara, CorEscura } from "../assets/cores";
import Btnfuncionarioshome from "./btnfuncionarioshome";

export default function FuncionariosHome() {

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user } = useAuth();

  const agregadoId = user?.motoristaId;
  const {data, loading, error} = useFrota(agregadoId!);

  if (!agregadoId) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: Cor.secundaria }}>Usuário não autenticado</Text>
      </View>
    );
  }


  if (loading) {
    return (
      <View style={{ padding: 20, alignItems: "center" }}>
        <ActivityIndicator size="small" color={Cor.primaria} />
        <Text style={{ color: Cor.secundaria, marginTop: 8 }}>Carregando funcionários...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: "red" }}>Erro: {error.message}</Text>
      </View>
    );
  }

  const listaFuncionarios = data?.listaFuncionariosAgregadoId;

  if (!listaFuncionarios || listaFuncionarios.length === 0) {
    return (
      <View style={{ padding: 20 }}>
        <Text style={{ color: Cor.secundaria }}>Nenhum funcionário encontrado</Text>
      </View>
    );
  }

  return (
    <View style={{ flexDirection: "column" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: 20,
        }}
      >
        <Text style={{ color: Cor.secundaria }}>Funcionários</Text>
        <View style={[styles.divider, { backgroundColor: Cor.primaria }]} />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        style={{ height: 80 }}
      >
        {listaFuncionarios?.map((funcionario, index) => (
          <Btnfuncionarioshome key={index} funcionario={funcionario} />
        ))}
      </ScrollView>
    </View>
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
