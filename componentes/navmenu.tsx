import { CorClara, CorEscura } from "@/assets/cores";
import { useAuth } from "@/hooks/useAuth";
import { useMotorista } from "@/hooks/useMotorista";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, Text, useColorScheme } from "react-native";

function NavMenu({
  home,
  calendario,
  controle,
  equipe,
  perfil,
}: {
  home: boolean;
  calendario: boolean;
  controle: boolean;
  equipe: boolean;
  perfil: boolean;
}) {
  const router = useRouter();
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading } = useAuth();

  const { motorista, refetch: refetchMotorista } = useMotorista(
    user?.motoristaId
  );

  return (
    <>
      <BlurView
        intensity={20}
        experimentalBlurMethod="dimezisBlurView"
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 30,
          width: "90%",
          height: 60,
          overflow: "hidden",
          backgroundColor: Cor.base + 70,
          flexDirection: "row",
          alignItems: "center",
          justifyContent:
            motorista?.tipoMotorista === "Agregado"
              ? "space-between"
              : "space-evenly",
          paddingHorizontal: 20,
          borderWidth: 1,
          borderColor: Cor.bordaNavMenu,
          borderRadius: 40,
          zIndex: 999,
        }}
      >
        <Pressable
          style={{
            width: 50,
            height: 50,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.replace("/home")}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: home ? "IconeFill" : "Icone",
              color: home ? Cor.primaria : Cor.texto2,
              fontSize: 24,
            }}
          >
            home
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: home ? Cor.primariaTxt : Cor.texto2,
              fontSize: 12,
            }}
          >
            Home
          </Text>
        </Pressable>
        <Pressable
          style={{
            width: 50,
            height: 50,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.replace("/calendario")}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: calendario ? "IconeFill" : "Icone",
              color: calendario ? Cor.primaria : Cor.texto2,
              fontSize: 24,
            }}
          >
            calendar_month
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: calendario ? Cor.primariaTxt : Cor.texto2,
              fontSize: 12,
            }}
          >
            Voucher
          </Text>
        </Pressable>
        {motorista?.tipoMotorista === "Agregado" ? (
          <Pressable
            style={{
              width: 50,
              height: 50,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.replace("/controle")}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: controle ? "IconeFill" : "Icone",
                color: controle ? Cor.texto1 : Cor.texto2,
                fontSize: 24,
              }}
            >
              leaderboard
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: controle ? Cor.texto1 : Cor.texto2,
                fontSize: 12,
              }}
            >
              Controle
            </Text>
          </Pressable>
        ) : null}
        {motorista?.tipoMotorista === "Agregado" ? (
          <Pressable
            style={{
              width: 50,
              height: 50,
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => router.replace("/equipe")}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: equipe ? "IconeFill" : "Icone",
                color: equipe ? Cor.texto1 : Cor.texto2,
                fontSize: 24,
              }}
            >
              tenancy
            </Text>
            <Text
              allowFontScaling={false}
              style={{ color: equipe ? Cor.texto1 : Cor.texto2, fontSize: 12 }}
            >
              Equipe
            </Text>
          </Pressable>
        ) : null}
        <Pressable
          style={{
            width: 50,
            height: 50,
            borderRadius: 18,
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => router.replace("/perfil")}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontFamily: perfil ? "IconeFill" : "Icone",
              color: perfil ? Cor.texto1 : Cor.texto2,
              fontSize: 24,
            }}
          >
            person
          </Text>
          <Text
            allowFontScaling={false}
            style={{ color: perfil ? Cor.texto1 : Cor.texto2, fontSize: 12 }}
          >
            Perfil
          </Text>
        </Pressable>
      </BlurView>
      <LinearGradient
        colors={[Cor.base + "00", Cor.base]}
        style={{
          position: "absolute",
          alignSelf: "center",
          bottom: 0,
          width: "100%",
          height: 150,
          overflow: "hidden",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          zIndex: 997,
        }}
        pointerEvents="none"
      />
    </>
  );
}

export default NavMenu;
