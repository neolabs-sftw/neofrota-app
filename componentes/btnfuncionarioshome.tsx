// import LottieView from "lottie-react-native";
import { Image, Pressable, Text, useColorScheme, View } from "react-native";
import icAtivo from "../assets/animation/icativo.json";
import icInativo from "../assets/animation/icinativo.json";
import { CorClara, CorEscura } from "../assets/cores";

export default function BtnfuncionariosHome(funcionario: any) {
  const motoristaFunc = funcionario.funcionario.motoristaComoFuncionario;

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <>
      <Pressable
        style={{
          height: 70,
          width: 200,
          marginLeft: 10,
          backgroundColor: Cor.base2,
          borderRadius: 22,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: 10,
          gap: 5,
        }}
      >
        <Image
          source={{
            uri: motoristaFunc.fotoMotorista,
          }}
          style={{ height: 50, width: 50, borderRadius: 14 }}
        />
        <View style={{ flexDirection: "column", gap: 2, width: "70%" }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              width: "100%",
            }}
          >
            <Text
              allowFontScaling={false}
              numberOfLines={1}
              style={{
                textOverflow: "ellipsis",
                fontWeight: "bold",
                color: Cor.texto1,
                fontSize: 12,
              }}
            >
              {motoristaFunc.nome}
            </Text>
          </View>

          <Text
            allowFontScaling={false}
            style={{
              textOverflow: "ellipsis",
              color: Cor.texto1,
              fontSize: 10,
            }}
          >
            CNH - {new Date(motoristaFunc.vCnh).toLocaleDateString("pt-BR")}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {/* <LottieView
              source={motoristaFunc.statusCnh ? icAtivo : icInativo}
              autoPlay
              loop={true}
              style={{ width: 20, height: 20 }}
            /> */}
            <Text
              allowFontScaling={false}
              style={{
                textOverflow: "ellipsis",
                color: motoristaFunc.statusCnh ? Cor.ativo : Cor.inativo,
                fontSize: 12,
              }}
            >
              {motoristaFunc.statusCnh ? "Ativo" : "Vencida"}
            </Text>
          </View>
        </View>
      </Pressable>
    </>
  );
}
