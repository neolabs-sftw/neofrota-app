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

function acessos() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const [listaLogins, setListaLogins] = useState<any[]>([]);

  async function name() {
    const raw = await AsyncStorage.getItem("HistoricoLogins");
    setListaLogins(raw ? JSON.parse(raw) : []);
    return raw ? JSON.parse(raw) : [];
  }

  useEffect(() => {
    name();
  }, []);

  const rota = useRouter();
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
              imagem={
                "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/img_perfis/logoservir.jpeg "
              }
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
            fontWeight: "900",
            transform: "scale(2)"
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
  imagem,
}: {
  email: string;
  data: string;
  token: any;
  imagem: string;
}) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const rota = useRouter();

  const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY!;

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
      onPress={() => {
        AsyncStorage.setItem(TOKEN_KEY, token);
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
            uri: imagem,
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
            Servir Transportes
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontWeight: "500" }}
          >
            {email}
          </Text>
          <Text>
            Registrado em:{" "}
            {new Date(data).toLocaleTimeString("pt-BR", {
              timeZone: "UTC-3",
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
        onPress={() => {
          removerLoginDoHistoricoPorEmail(email);
          rota.push("./login");
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            fontFamily: "IconeFill",
            color: Cor.atencao + 95,
            fontWeight: "900",
            transform: "scale(1.5)",
          }}
        >
          delete
        </Text>
      </Pressable>
    </Pressable>
  );
}
