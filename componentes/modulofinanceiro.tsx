import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { CorClara, CorEscura } from "../assets/cores";
import CardDescontos from "./carddescontos";
import CardResumoValores from "./cardresumovalores";
import { useAuth } from "@/hooks/useAuth";
import { useVouchersFiltrados } from "@/hooks/useVouchers";

export default function ModuloFinanceiro() {
  const formatarParaYMD = (data: Date) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  };

  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const { user } = useAuth();
  const operadoraId = user?.operadoraId;

  const { listaFiltrados: listaExtras } = useVouchersFiltrados({
    operadoraId: String(operadoraId),
    adminUsuarioId: "",
    dataFim: formatarParaYMD(ultimoDia),
    dataInicio: formatarParaYMD(primeiroDia),
    empresaClienteId: "",
    motoristaId: user?.motoristaId || "",
    natureza: "Extra",
    solicitanteId: "",
    status: "Concluido",
    tipoCorrida: "",
  });

  const totaisExtras = listaExtras.reduce(
    (acc, voucher) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: acc.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          acc.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: acc.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          acc.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const { listaFiltrados: listaFixos } = useVouchersFiltrados({
    operadoraId: String(operadoraId),
    adminUsuarioId: "",
    dataFim: formatarParaYMD(ultimoDia),
    dataInicio: formatarParaYMD(primeiroDia),
    empresaClienteId: "",
    motoristaId: user?.motoristaId || "",
    natureza: "Fixo",
    solicitanteId: "",
    status: "Concluido",
    tipoCorrida: "",
  });

  const totaisFixos = listaFixos.reduce(
    (acc, voucher) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: acc.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          acc.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: acc.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          acc.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const { listaFiltrados: listaTurnos } = useVouchersFiltrados({
    operadoraId: String(operadoraId),
    adminUsuarioId: "",
    dataFim: formatarParaYMD(ultimoDia),
    dataInicio: formatarParaYMD(primeiroDia),
    empresaClienteId: "",
    motoristaId: user?.motoristaId || "",
    natureza: "Turno",
    solicitanteId: "",
    status: "Concluido",
    tipoCorrida: "",
  });

  const totaisTurnos = listaTurnos.reduce(
    (acc, voucher) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: acc.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          acc.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: acc.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          acc.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;
  return (
    <>
      <View style={{ flexDirection: "column", gap: 5 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 20,
          }}
        >
          <Text style={{ color: Cor.secundaria }}>Mês Atual</Text>
          <View style={[styles.divider, { backgroundColor: Cor.primaria }]} />
        </View>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginHorizontal: 20,
              gap: 5,
            }}
          >
            <CardResumoValores
              tipo="fixo"
              totalV={listaFixos.length + listaTurnos.length}
              valor={
                totaisFixos.viagemRepasse +
                totaisFixos.deslocamentoRepasse +
                totaisFixos.horaParadaRepasse +
                totaisFixos.pedagio +
                totaisTurnos.viagemRepasse +
                totaisTurnos.deslocamentoRepasse +
                totaisTurnos.horaParadaRepasse +
                totaisTurnos.pedagio
              }
            />
            <CardResumoValores
              tipo="extra"
              totalV={listaExtras.length}
              valor={
                totaisExtras.viagemRepasse +
                totaisExtras.deslocamentoRepasse +
                totaisExtras.horaParadaRepasse +
                totaisExtras.pedagio
              }
            />
          </View>
        </View>
        <CardDescontos />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "gray",
    marginHorizontal: 20,
    marginVertical: 10,
  },
});
