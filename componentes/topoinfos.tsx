import { CorClara, CorEscura } from "@/assets/cores";
import { useAuth } from "@/hooks/useAuth";
import { useMotorista } from "@/hooks/useMotorista";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Pressable, Text, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TopoInfos({ segredo, fotoPerfil }: any) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading } = useAuth();
  const { motorista } = useMotorista(user?.motoristaId);

  const [segredoValores, setSegredoValores] = useState(true);

  const inset = useSafeAreaInsets();

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 20,
          width: "100%",
          paddingTop: inset.top,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            width: "75%",
          }}
        >
          <View
            style={{
              aspectRatio: 1,
              width: 60,
              backgroundColor: "white",
              borderRadius: 18,
            }}
          >
            <Image
              source={{
                uri:
                  motorista?.operadoraId?.logoOperadora ??
                  "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/foto_logo_cliente/icon.png",
              }}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 18,
              }}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text
              allowFontScaling={false}
              style={{ color: Cor.texto1, fontSize: 12 }}
            >
              Operadora
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                fontWeight: "bold",
                fontSize: 22,
                color: Cor.primariaTxt,
              }}
            >
              {motorista?.operadoraId?.nome}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {segredo ? (
            <Pressable
              onPress={() => {
                setSegredoValores(!segredoValores);
                router.push("/TesteSkia");
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  color: Cor.primaria,
                  fontFamily: "IconeFill",
                  fontSize: 30,
                }}
              >
                {segredoValores ? "visibility" : "visibility_off"}
              </Text>
            </Pressable>
          ) : null}
          {fotoPerfil ? (
            <Image
              source={{
                uri:
                  motorista?.fotoMotorista ??
                  "https://iyqleanlhzcnndzuugkg.supabase.co/storage/v1/object/public/neofrotabkt/foto_perfil_motorista/default.png",
              }}
              style={{
                width: 50,
                aspectRatio: 1,
                resizeMode: "cover",
                borderRadius: 10,
              }}
            />
          ) : null}
        </View>
      </View>
    </>
  );
}
