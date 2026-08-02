import { CorClara, CorEscura } from "@/assets/cores";
import { useAuth } from "@/hooks/useAuth";
import { usePrivacidade } from "@/hooks/usePrivacidade";
import { useVouchersFiltrados } from "@/hooks/useVouchers";
import { useRoute } from "@react-navigation/native";
import { Offset } from "@shopify/react-native-skia";
import {
  ScrollView,
  useColorScheme,
  View,
  Text,
  Image,
  useWindowDimensions,
} from "react-native";

export default function DetelhamentoEmpresa() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user } = useAuth();

  const route = useRoute();

  const { mesFaturamento, ano } = route.params as {
    mesFaturamento: string;
    ano: string;
  };

  const formatarParaYMD = (data: Date) => {
    const anoFormatado = data.getFullYear();
    const mesFormatado = String(data.getMonth() + 1).padStart(2, "0");
    const diaFormatado = String(data.getDate()).padStart(2, "0");

    return `${anoFormatado}-${mesFormatado}-${diaFormatado}`;
  };

  const anoNum = parseInt(ano, 10);

  const mesIndex = parseInt(mesFaturamento, 10) - 1;

  const primeiroDia = new Date(anoNum, mesIndex, 1);

  const ultimoDia = new Date(anoNum, mesIndex + 1, 0);

  const filtroBase = {
    operadoraId: user?.operadoraId || "",
    dataFim: formatarParaYMD(ultimoDia),
    dataInicio: formatarParaYMD(primeiroDia),
    motoristaId: user?.motoristaId || "",
    natureza: "",
    status: "Concluido",
    tipoCorrida: "",
    unidadeClienteId: "",
  };

  const { listaFiltrados } = useVouchersFiltrados({
    ...filtroBase,
  });

  const faturamentoAgrupado = listaFiltrados.reduce((acumulador, voucher) => {
    const idEmpresa = voucher.empresaCliente.id;
    const nomeEmpresa = voucher.empresaCliente.nome;
    const logoCliente = voucher.empresaCliente.fotoLogoCliente;
    const natureza = voucher.natureza;

    // Cálculo financeiro
    const valorViagemRep = voucher.valorViagemRepasse || 0;
    const tempoParado = voucher.qntTempoParado || 0;
    const valorHoraParadaRep = voucher.valorHoraParadaRepasse || 0;
    const valorRepasseVoucher =
      valorViagemRep + tempoParado * valorHoraParadaRep;

    // Se a empresa ainda não existe no acumulador, criamos a estrutura completa
    if (!acumulador[idEmpresa]) {
      acumulador[idEmpresa] = {
        id: idEmpresa,
        nome: nomeEmpresa,
        logoCliente,
        quantidade: 0, // Inicia a contagem
        faturamentoPorNatureza: {
          Extra: 0,
          Fixo: 0,
          Turno: 0,
        },
        faturamentoTotal: 0,
      };
    }

    // Prevenção para novas naturezas
    if (acumulador[idEmpresa].faturamentoPorNatureza[natureza] === undefined) {
      acumulador[idEmpresa].faturamentoPorNatureza[natureza] = 0;
    }

    // 1. Atualizamos o Faturamento
    acumulador[idEmpresa].faturamentoPorNatureza[natureza] +=
      valorRepasseVoucher;
    acumulador[idEmpresa].faturamentoTotal += valorRepasseVoucher;

    // 2. Atualizamos a Quantidade e guardamos o Voucher
    acumulador[idEmpresa].quantidade += 1;

    return acumulador;
  }, {});

  // Transformando em array para o React Native
  const arrayFaturamento = Object.values(faturamentoAgrupado);

  return (
    <ScrollView
      style={{
        flexDirection: "column",
        paddingTop: 15,
        paddingVertical: 5,
        paddingHorizontal: 20,
        height: "100%",
        width: "100%",
        backgroundColor: Cor.base,
      }}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ flexDirection: "column", gap: 10 }}>
        {arrayFaturamento.map((empresa: any) => {
          return <CardFaturamentoEmpresa empresa={empresa} key={empresa.id} />;
        })}
      </View>
    </ScrollView>
  );
}

function CardFaturamentoEmpresa({ empresa }: { empresa: any }) {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { segredo: segredoValores, alterarSegredo } = usePrivacidade();

  return (
    <View
      style={{
        backgroundColor: Cor.base2,
        padding: 10,
        borderRadius: 22,
        gap: 10,
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <View style={{ flexDirection: "row", gap: 5 }}>
        <View
          style={{
            width: "30%",
            aspectRatio: 1,
            backgroundColor: Cor.base2,
            borderRadius: 14,
            elevation: 10,
            shadowColor: Cor.texto2,
            shadowOffset: { width: 2, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
          }}
        >
          <Image
            source={{
              uri:
                empresa.logoCliente === null
                  ? "https://cdn.neofrota.com/storage/v1/object/public/neofrotabkt/android-icon-background.png"
                  : empresa.logoCliente,
            }}
            style={{
              height: "100%",
              width: "100%",
              borderRadius: 14,
              borderColor: Cor.texto1 + 10,
              borderWidth: 1,
            }}
          />
        </View>
        <View
          style={{
            paddingLeft: 10,
            width: "70%",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text
              allowFontScaling={false}
              style={{ fontWeight: "bold", fontSize: 20, color: Cor.primaria }}
            >
              {empresa.nome}
            </Text>
          </View>
          <View
            style={{
              height: 1,
              backgroundColor: Cor.texto2 + 30,
              width: "100%",
            }}
          />
          <View>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 14, fontWeight: "400", color: Cor.textoFixo }}
            >
              Turno:{" "}
              {segredoValores
                ? empresa.faturamentoPorNatureza.Turno.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "°°°°"}
            </Text>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 14, fontWeight: "400", color: Cor.textoExtra }}
            >
              Extra:{" "}
              {segredoValores
                ? empresa.faturamentoPorNatureza.Extra.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "°°°°"}
            </Text>
            <Text
              allowFontScaling={false}
              style={{ fontSize: 14, fontWeight: "400", color: Cor.textoTurno }}
            >
              Fixo:{" "}
              {segredoValores
                ? empresa.faturamentoPorNatureza.Fixo.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })
                : "°°°°"}
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{ height: 1, backgroundColor: Cor.texto2 + 50, width: "100%" }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
        <View
          style={{
            paddingVertical: 5,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: Cor.secundaria + 50,
            backgroundColor: Cor.secundaria + 30,
            borderRadius: 8,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{
              fontSize: 12,
              color: Cor.primariaTxt,
            }}
          >{`Total de Vouchers: ${empresa.quantidade}`}</Text>
        </View>
        <Text
          allowFontScaling={false}
          style={{
            fontSize: 12,
            color: Cor.primariaTxt,
          }}
        >
          Valor:
        </Text>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 18,
            color: Cor.primariaTxt,
            fontWeight: 600,
          }}
        >
          {segredoValores
            ? empresa.faturamentoTotal.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })
            : "°°°°"}
        </Text>
      </View>
    </View>
  );
}
