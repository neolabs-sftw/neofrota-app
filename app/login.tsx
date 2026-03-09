import { useFazerLogin } from "@/hooks/fazerLogin";
import { BlurView } from "expo-blur";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CorClara, CorEscura } from "../assets/cores";

export default function Login() {
  const rota = useRouter();
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const { fazerLogin, loading, error } = useFazerLogin();

  const [erroDados, setErroDados] = useState(false);

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [verSenha, setVerSenha] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setErroDados(false);
    }, 4000);
  }, [erroDados]);

  const logar = async () => {
    if (email === "" || senha === "") {
      setErroDados(true);
      console.log("erro");
    }
    try {
      await fazerLogin(email, senha);
      rota.push("/home");
    } catch (err) {
      console.log(error);
      return (
        <View
          style={{
            padding: 20,
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#F4F4F450",
          }}
        >
          Preencha dos campos
        </View>
      );
    }
  };
  return (
    <>
      {erroDados && (
        <BlurView
          intensity={10}
          style={{
            padding: 20,
            flex: 1,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            position: "absolute",
            backgroundColor: Cor.base2 + "05",
            zIndex: 10,
          }}
        >
          <View
            style={{
              width: "70%",
              height: "30%",
              backgroundColor: Cor.base2,
              borderWidth: 1,
              borderColor: Cor.texto2 + 50,
              borderRadius: 22,
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <Text
              style={{
                fontSize: 100,
                fontWeight: "bold",
                fontFamily: "Icone",
                color: Cor.atencao,
              }}
            >
              emergency_home
            </Text>
            <Text
              style={{ color: Cor.texto1, fontSize: 16, fontWeight: "bold" }}
            >
              Preencha Todos os campos
            </Text>
            <Pressable onPress={() => setErroDados(false)}>
              <Text
                style={{
                  color: Cor.primaria,
                  fontSize: 16,
                  textDecorationLine: "underline",
                }}
              >
                Voltar
              </Text>
            </Pressable>
          </View>
        </BlurView>
      )}
      <SafeAreaView
        style={{ flex: 1, paddingHorizontal: 20, backgroundColor: Cor.base }}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              contentContainerStyle={styles.container}
              keyboardShouldPersistTaps="handled"
            >
              <Image
                source={Cor.logo}
                resizeMode="contain"
                style={{ height: 120, width: 220 }}
              />
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.primariaTxt,
                  fontSize: 14,
                  fontWeight: "500",
                }}
              >
                Motorista
              </Text>
              <TextInput
                allowFontScaling={false}
                style={[
                  styles.input,
                  {
                    backgroundColor: Cor.base2,
                    color: Cor.texto1,

                    height: 55,
                  },
                ]}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#999999"
                value={email}
                onChangeText={(text) => setEmail(text.toLowerCase().trim())}
              />
              <View
                style={[
                  styles.input,
                  {
                    height: 55,
                    backgroundColor: Cor.base2,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                  },
                ]}
              >
                <TextInput
                  allowFontScaling={false}
                  style={{ flex: 1, color: Cor.texto1 }}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#999999"
                  secureTextEntry={verSenha}
                  value={senha}
                  onChangeText={(text) => setSenha(text)}
                />
                <Pressable
                  onPress={() => {
                    verSenha ? setVerSenha(false) : setVerSenha(true);
                  }}
                >
                  <Text
                    allowFontScaling={false}
                    style={{
                      fontFamily: "Icone",
                      fontSize: 24,
                      color: Cor.texto2,
                    }}
                  >
                    {verSenha ? "visibility" : "visibility_off"}
                  </Text>
                </Pressable>
              </View>

              <Pressable
                style={[
                  styles.botao,
                  { backgroundColor: loading ? "gray" : Cor.primaria },
                ]}
                onPress={() => {
                  logar();
                  // rota.push("/home");
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text
                    allowFontScaling={false}
                    style={{ color: "white", fontWeight: "bold", fontSize: 15 }}
                  >
                    Entrar
                  </Text>
                )}
              </Pressable>
              <Text
                allowFontScaling={false}
                style={{ color: Cor.primaria, fontWeight: "500" }}
                onPress={() => {
                  rota.push("/_sitemap");
                }}
              >
                Esqueci minha senha
              </Text>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </SafeAreaView>
      <SafeAreaView
        style={{
          backgroundColor: Cor.base,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Pressable
          style={{
            marginBottom: 40,
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
          onPress={() => rota.push("./acessos")}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.primaria, fontWeight: "600" }}
          >
            Meus acessos
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: "IconeFill",
              color: Cor.primaria,
              fontWeight: "900",
              transform: "scale(2)",
            }}
          >
            chevron_right
          </Text>
        </Pressable>
        <Text
          allowFontScaling={false}
          style={{ color: Cor.texto1, fontSize: 12 }}
        >
          Conheça o NeoFrota - App para Operadoras de Táxi
        </Text>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderRadius: 30,
    padding: 20,
    width: "95%",
  },
  botao: {
    marginTop: 30,
    width: "95%",
    height: 45,
    padding: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
});
