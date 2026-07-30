import { CorClara, CorEscura } from "@/assets/cores";
import { removerLoginDoHistoricoPorEmail } from "@/hooks/fazerLogin";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  Text,
  useColorScheme,
  ScrollView,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { jwtDecode } from "jwt-decode";
import { useOperadoras } from "@/hooks/useOperadoras";

function acessos() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const [listaLogins, setListaLogins] = useState<any[]>([]);
  const rota = useRouter();

  async function carregarHistorico() {
    try {
      const raw = await AsyncStorage.getItem("HistoricoLogins");
      if (raw) {
        const dados = JSON.parse(raw);

        const dadosComTokenDecodificado = dados.map((item: any) => {
          try {
            const payloadJwt = jwtDecode(item.token);
            return {
              ...item,
              infoJwt: payloadJwt,
            };
          } catch (e) {
            return { ...item, infoJwt: null };
          }
        });

        setListaLogins(dadosComTokenDecodificado);
      } else {
        setListaLogins([]);
      }
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
    }
  }

  useEffect(() => {
    carregarHistorico();
  }, []);

  // Função para deletar o login e atualizar o estado imediatamente na tela
  const handleDeleteLogin = async (emailParaRemover: string) => {
    await removerLoginDoHistoricoPorEmail(emailParaRemover);
    // Atualiza o estado filtrando o item removido para atualizar a UI na hora
    setListaLogins((prev) => prev.filter((item) => item.email !== emailParaRemover));
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: Cor.base,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Text
        allowFontScaling={false}
        style={{ color: Cor.texto2, fontWeight: "500", marginTop: 20 }}
      >
        Histórico de Logins nesse aparelho
      </Text>
      <ScrollView style={{ width: "100%", paddingTop: 20 }}>
        {listaLogins.map((l: any) => {
          return (
            <BtnAcesso
              key={l.token}
              email={l.email}
              data={l.loggedAt}
              token={l.token}
              infos={l.infoJwt}
              onDelete={handleDeleteLogin}
            />
          );
        })}
      </ScrollView>
      <Pressable
        style={{
          width: "50%",
          height: 45,
          padding: 10,
          gap: 10,
          borderRadius: 25,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 1,
          borderColor: Cor.primaria + 50,
          backgroundColor: Cor.primaria + 30,
        }}
        onPress={() => rota.push("./login")}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "IconeFill",
            color: Cor.primaria,
            transform: "scale(2)",
          }}
        >
          chevron_left
        </Text>
        <Text
          allowFontScaling={false}
          style={{ color: Cor.primaria, fontWeight: "600" }}
        >
          Voltar
        </Text>
      </Pressable>
    </SafeAreaView>
  );
}

export default acessos;

function BtnAcesso({
  email,
  data,
  token,
  infos,
  onDelete,
}: {
  email: string;
  data: string;
  token: any;
  infos: any;
  onDelete: (email: string) => void;
}) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const rota = useRouter();
  const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY!;

  const { data: listaOperadoras } = useOperadoras();

  const operadora = listaOperadoras.find(
    (o: any) => o.id === infos?.operadoraId,
  );

  return (
    <Pressable
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        height: 75,
        padding: 10,
        marginVertical: 5,
        backgroundColor: Cor.primaria + 10,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Cor.primaria + 30,
      }}
      onPress={async () => {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        rota.push("./home");
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{
            uri:
              operadora?.logoOperadora ||
              "https://cdn.neofrota.com/storage/v1/object/public/neofrotabkt/foto_logo_cliente/01457895000145-1756600886295.png",
          }}
          style={{
            width: 55,
            height: 55,
            borderRadius: 12,
          }}
        />
        <View style={{ flexDirection: "column" }}>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.primariaTxt, fontWeight: "500", fontSize: 18 }}
          >
            {operadora?.nome || "Carregando"}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontWeight: "500" }}
          >
            {email}
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontWeight: "200", fontSize: 11 }}
          >
            Registrado em:{" "}
            {new Date(data).toLocaleString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>
      <Pressable
        style={{
          width: 45,
          height: 55,
          borderRadius: 12,
          backgroundColor: Cor.atencao + 30,
          borderWidth: 1,
          borderColor: Cor.atencao + 20,
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={() => onDelete(email)}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "IconeFill",
            color: Cor.atencao + 95,
            transform: "scale(1.5)",
          }}
        >
          delete
        </Text>
      </Pressable>
    </Pressable>
  );
}