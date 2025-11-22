import { CorClara, CorEscura } from "@/assets/cores";
import { useCarroID } from "@/hooks/useCarro";
import { useMotorista } from "@/hooks/useMotorista";
import { useRouter } from "expo-router";
import { Image, Pressable, Text, useColorScheme, View } from "react-native";

export default function CardFuncionario({
  idmotorista,
}: {
  idmotorista: number;
}) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const router = useRouter();

  const { data, loading, refetch } = useMotorista(idmotorista);

  const {data: carroID } = useCarroID(idmotorista);

  const carro = carroID?.carroMotoristaId[0]

  const motorista = data?.motorista;
  
  const icativo = require("../assets/animation/icativo.json");
  const icinativo = require("../assets/animation/icinativo.json");

  const link = `https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/carros/${carro?.marca?.toLocaleLowerCase()}/${carro?.modelo?.toLocaleLowerCase()}/${carro?.cor?.toLocaleLowerCase()}.png`;

  return (
    <Pressable
      style={{
        backgroundColor: Cor.base2,
        padding: 10,
        borderRadius: 22,
        height: 200,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
      onPress={() =>
        router.push({
          pathname: "/funcionariomotorista/[idmotorista]",
          params: {
            idmotorista: idmotorista,
          },
        })
      }
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <Image
          source={{
                  uri:
                    motorista?.fotoMotorista === null
                      ? "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/foto_perfil_motorista/default.png"
                      : motorista?.fotoMotorista,
                }}
          style={{ height: 120, width: 120, borderRadius: 14 }}
        />
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            width: 120,
            paddingVertical: 2.5,
            backgroundColor: Cor.base2 + "EE",
            position: "absolute",
            left: 0,
            zIndex: 1,
            alignItems: "center",
            justifyContent: "center",
            borderBottomLeftRadius: 14,
            borderBottomRightRadius: 14,
          }}
        >
          {/* <LottieView
            source={motorista?.statusMotorista ? icativo : icinativo}
            autoPlay
            loop={true}
            style={{ width: 20, height: 20 }}
          /> */}
          <Text
            allowFontScaling={false}
            style={{
              color: motorista?.statusMotorista ? Cor.ativo : Cor.inativo,
              fontSize: 12,
              fontWeight: "bold",
            }}
          >
            {motorista?.statusMotorista ? "ATIVO" : "INATIVO"}
          </Text>
        </View>
        <Image
          source={{ uri: link }}
          style={{ height: 120, width: "60%" }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{ height: 1, backgroundColor: Cor.texto2 + 50, width: "100%" }}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 10,
          width: "100%",
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 2,
            width: "50%",
            alignItems: "flex-start",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Motorista
          </Text>
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={{ color: Cor.texto1, fontSize: 14, fontWeight: "bold" }}
          >
            {motorista?.nome}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 2,
            width: "25%",
            alignItems: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Placa
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto1, fontSize: 14, fontWeight: "bold" }}
          >
            {carro?.placa}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "column",
            gap: 2,
            width: "25%",
            alignItems: "flex-end",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            CNH
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: motorista?.statusCnh ? Cor.ativo : Cor.inativo,
              fontSize: 14,
              fontWeight: "bold",
            }}
          >
            { motorista?.statusCnh ? "Válida" : "Vencida"}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
