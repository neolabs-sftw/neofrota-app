import { useAuth } from "@/hooks/useAuth";
import { useCarroID } from "@/hooks/useCarro";
import { Image, Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "../assets/cores";

export default function MotoristaInfos(motoristaId: any) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  const { user, isLoading } = useAuth();
  const motorista = motoristaId.motoristaId;
  const getCarro = useCarroID(user?.motoristaId);

  const carro = getCarro.data?.carroMotoristaId[0];

  const link = `https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/carros/${carro?.marca?.toLocaleLowerCase()}/${carro?.modelo?.toLocaleLowerCase()}/${carro?.cor?.toLocaleLowerCase()}.png`;

  return (
    <>
      <View
        style={{
          paddingLeft: 20,
          paddingVertical: 10,
          flexDirection: "column",
          borderBottomWidth: 1,
          borderBottomColor: Cor.texto2 + 50,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              height: 120,
              width: "30%",
              flexDirection: "column",
              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                aspectRatio: 1,
                width: 100,
                borderRadius: 22,
              }}
            >
              <Image
                source={{
                  uri:
                    motorista?.fotoMotorista === null
                      ? "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/foto_perfil_motorista/default.png"
                      : motorista?.fotoMotorista,
                }}
                style={{
                  width: 100,
                  height: 130,
                  borderRadius: 22,
                }}
              />
            </View>
          </View>
          <Image
            source={{
              uri: link,
            }}
            style={{ height: 150, width: "70%", paddingHorizontal: 10 }}
            resizeMode="contain"
          />
        </View>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.texto2, fontSize: 12 }}
          >
            Nome:{" "}
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 22,
              fontWeight: "bold",
              color: Cor.secundaria,
            }}
          >
            {motorista?.nome}
          </Text>
        </View>
      </View>
    </>
  );
}
