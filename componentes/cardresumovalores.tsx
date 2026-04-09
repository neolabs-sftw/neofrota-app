import { Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "../assets/cores";

type Props = {
  tipo: string;
  valor: number;
  totalV: number;
};
export default function CardResumoValores({ tipo, valor, totalV }: Props) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const titulo = tipo === "fixo" ? "Fixos e Turnos" : "Extras";

  return (
    <View
      style={{
        flexDirection: "column",
        backgroundColor: Cor.base2,
        width: "50%",
        height: 125,
        borderRadius: 22,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          height: "70%",
          justifyContent: "space-between",
          backgroundColor: tipo === "fixo" ? Cor.texto1 + 30 : Cor.extra + 30,
          borderTopLeftRadius: 22,
          borderTopRightRadius: 22,
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
          padding: 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: tipo === "fixo" ? Cor.fixo : Cor.extra,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "IconeFill",
                fontSize: 24,
                color: "#F4F4F4",
              }}
            >
              {tipo === "fixo" ? "history" : "local_taxi"}
            </Text>
          </View>
          {tipo === "fixo" ? (
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: Cor.turno,
                borderRadius: 12,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                allowFontScaling={false}
                style={{
                  fontFamily: "IconeFill",
                  fontSize: 24,
                  color: "#F4F4F4",
                }}
              >
                cycle
              </Text>
            </View>
          ) : null}
          <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
            <Text
              allowFontScaling={false}
              style={{
                color: tipo === "fixo" ? Cor.texto1 + 90 : Cor.textoExtra,
                fontSize: 14,
                fontWeight: "700",
              }}
            >
              Julho
            </Text>
            <Text
              allowFontScaling={false}
              style={{
                color: tipo === "fixo" ? Cor.texto1 + 90 : Cor.textoExtra,
                fontSize: 10,
              }}
            >
              {titulo}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <Text
            allowFontScaling={false}
            style={{
              color: tipo === "fixo" ? Cor.texto1 + 90 : Cor.textoExtra,
              fontSize: 12,
            }}
          >
            R$
          </Text>
          <Text
            allowFontScaling={false}
            style={{
              color: tipo === "fixo" ? Cor.texto1 + "BB" : Cor.textoExtra,
              fontSize: 22,
              fontWeight: "700",
            }}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(valor)}
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          height: "30%",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: Cor.base2,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          borderBottomLeftRadius: 18,
          borderBottomRightRadius: 18,
          padding: 10,
        }}
      >
        <Text
          allowFontScaling={false}
          style={{
            color: tipo === "fixo" ? Cor.texto1 + "BB" : Cor.textoExtra,
            fontSize: 10,
          }}
        >
          Número de Viagens
        </Text>
        <Text
          allowFontScaling={false}
          style={{
            color: tipo === "fixo" ? Cor.texto1 + "BB" : Cor.textoExtra,
            fontSize: 16,
            fontWeight: "700",
          }}
        >
          {totalV}
        </Text>
      </View>
    </View>
  );
}
