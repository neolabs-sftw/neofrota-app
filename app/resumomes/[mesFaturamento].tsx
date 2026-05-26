import { useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { CorClara, CorEscura } from "@/assets/cores";
import { useVouchersFiltrados } from "@/hooks/useVouchers";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { useLancamentosOperadora } from "@/hooks/useLancamentos";
import Navmenu from "@/componentes/navmenu";
import { PieChart } from "react-native-gifted-charts";

export default function ResumoMes() {
  const route = useRoute();

  const { user } = useAuth();

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

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

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

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
  const { listaFiltrados: NaturezaTurno, loading: loadingTurno } =
    useVouchersFiltrados({
      ...filtroBase,
      natureza: "Turno",
    });

  const { listaFiltrados: NaturezaFixo, loading: loadingFixo } =
    useVouchersFiltrados({
      ...filtroBase,
      natureza: "Fixo",
    });

  const { listaFiltrados: NaturezaExtra, loading: loadingExtra } =
    useVouchersFiltrados({
      ...filtroBase,
      natureza: "Extra",
    });

  const totais = NaturezaExtra.concat(NaturezaFixo)
    .concat(NaturezaTurno)
    .reduce(
      (soma: any, voucher: any) => {
        const totalHoraParadaRepasseVoucher =
          (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

        return {
          viagemRepasse: soma.viagemRepasse + (voucher.valorViagemRepasse || 0),
          deslocamentoRepasse:
            soma.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
          pedagio: soma.pedagio + (voucher.valorPedagio || 0),
          horaParadaRepasse:
            soma.horaParadaRepasse + totalHoraParadaRepasseVoucher,
        };
      },
      {
        viagemRepasse: 0,
        deslocamentoRepasse: 0,
        pedagio: 0,
        horaParadaRepasse: 0,
      },
    );

  const totalRepasse =
    totais.viagemRepasse +
    totais.deslocamentoRepasse +
    totais.pedagio +
    totais.horaParadaRepasse;

  const totaisExtras = NaturezaExtra.reduce(
    (soma: any, voucher: any) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: soma.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          soma.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: soma.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          soma.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const totalExtras =
    totaisExtras.viagemRepasse +
    totaisExtras.deslocamentoRepasse +
    totaisExtras.pedagio +
    totaisExtras.horaParadaRepasse;

  const totaisFixos = NaturezaFixo.reduce(
    (soma: any, voucher: any) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: soma.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          soma.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: soma.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          soma.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const totalFixos =
    totaisFixos.viagemRepasse +
    totaisFixos.deslocamentoRepasse +
    totaisFixos.pedagio +
    totaisFixos.horaParadaRepasse;

  const totaisTurnos = NaturezaTurno.reduce(
    (soma: any, voucher: any) => {
      const totalHoraParadaRepasseVoucher =
        (voucher.valorHoraParadaRepasse || 0) * (voucher.qntTempoParado || 0);

      return {
        viagemRepasse: soma.viagemRepasse + (voucher.valorViagemRepasse || 0),
        deslocamentoRepasse:
          soma.deslocamentoRepasse + (voucher.valorDeslocamentoRepasse || 0),
        pedagio: soma.pedagio + (voucher.valorPedagio || 0),
        horaParadaRepasse:
          soma.horaParadaRepasse + totalHoraParadaRepasseVoucher,
      };
    },
    {
      viagemRepasse: 0,
      deslocamentoRepasse: 0,
      pedagio: 0,
      horaParadaRepasse: 0,
    },
  );

  const totalTurnos =
    totaisTurnos.viagemRepasse +
    totaisTurnos.deslocamentoRepasse +
    totaisTurnos.pedagio +
    totaisTurnos.horaParadaRepasse;

  const { lancamentos } = useLancamentosOperadora({
    motoristaId: user?.motoristaId,
    operadoraId: user?.operadoraId,
    dataInicial: formatarParaYMD(primeiroDia),
    dataFinal: formatarParaYMD(ultimoDia),
  });

  const descontos = lancamentos
    .filter((lancamento: any) => lancamento.tipo === "Desconto")
    .reduce((total: any, lancamento: any) => total + lancamento.valor, 0);

  const creditos = lancamentos
    .filter((lancamento: any) => lancamento.tipo === "Credito")
    .reduce((total: any, lancamento: any) => total + lancamento.valor, 0);

  const saldoLancamentos = creditos - descontos;

  const saldoBruto = totalRepasse + creditos;
  const saldo = totalRepasse + saldoLancamentos;

  const porcentagens = (value: any) => {
    if (saldoBruto === 0) return 0;
    return Math.round((value / saldoBruto) * 100);
  };

  // 2. Calcula as porcentagens
  const percTurnos = porcentagens(totalTurnos);
  const percFixos = porcentagens(totalFixos);
  const percExtras = porcentagens(totalExtras);
  const percCreditos = porcentagens(creditos);
  const percDescontos = porcentagens(descontos);

  const pieData = [
    {
      value: totalTurnos,
      color: Cor.turno,
      label: "Turnos",
      percent: percTurnos,
    },
    { value: totalFixos, color: Cor.fixo, label: "Fixos", percent: percFixos },
    {
      value: totalExtras,
      color: Cor.extra,
      label: "Extras",
      percent: percExtras,
    },
    {
      value: creditos,
      color: Cor.ativo + 50,
      label: "Créditos",
      percent: percCreditos,
    },
    {
      value: descontos,
      color: Cor.atencao,
      label: "Descontos",
      percent: percDescontos,
    },
  ];

  const fatiasValidas = pieData.filter((item) => item.value > 0);

  const maiorFatia =
    fatiasValidas.length > 0
      ? [...fatiasValidas].sort((a, b) => b.value - a.value)[0]
      : { percent: 0, label: "-" };

  const ItemLegenda = (cor: any, label: any, porcentagem: any) => {
    return (
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 12 }}
      >
        <View
          style={[
            {
              width: 12,
              height: 12,
              borderRadius: 6,
              marginRight: 8,
              backgroundColor: cor,
            },
          ]}
        />
        <Text
          style={{ color: Cor.texto1, fontSize: 12 }}
          allowFontScaling={false}
        >
          {label}: {porcentagem}
        </Text>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView
        style={{
          backgroundColor: Cor.base2,
          width: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: -25,
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
          }}
        >
          <Pressable
            style={{
              paddingVertical: 5,
              paddingHorizontal: 20,
              borderRadius: 10,
              backgroundColor: Cor.primaria + 20,
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              gap: 5,
            }}
            onPress={() => router.back()}
          >
            <Text
              style={{
                fontWeight: 500,
                color: Cor.primaria,
                fontSize: 16,
                fontFamily: "Icone",
              }}
              allowFontScaling={false}
            >
              arrow_back
            </Text>
            <Text
              style={{ fontWeight: 500, color: Cor.primaria, fontSize: 12 }}
              allowFontScaling={false}
            >
              Voltar
            </Text>
          </Pressable>
          <View
            style={{
              width: "20%",
              height: 1,
              backgroundColor: Cor.secundaria,
            }}
          />
          <Text
            style={{ fontWeight: 500, color: Cor.secundaria, fontSize: 12 }}
            allowFontScaling={false}
          >
            Detalhes do Faturamento
          </Text>
        </View>
      </SafeAreaView>
      <ScrollView
        style={{
          flexDirection: "column",
          paddingVertical: 5,
          paddingHorizontal: 20,
          gap: 10,
          height: "100%",
          width: "100%",
          backgroundColor: Cor.base2,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Gráfico */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            marginBottom: 10,
            height: 200,
            borderRadius: 22,
            borderWidth: 1,
            borderColor: Cor.texto2 + 50,
            flexDirection: "column",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 10,
          }}
        >
          <Text
            style={{ fontWeight: 500, color: Cor.secundaria, fontSize: 12 }}
            allowFontScaling={false}
          >
            Distribuição de faturamento
          </Text>
          {/* Gráfico Inicial */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 10,
            }}
          >
            <PieChart
              donut
              innerRadius={50}
              radius={75}
              data={pieData}
              innerCircleColor={Cor.base}
              centerLabelComponent={() => {
                return (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text
                      style={{
                        fontSize: 26,
                        color: Cor.secundaria,
                        fontWeight: "bold",
                      }}
                      allowFontScaling={false}
                    >
                      {maiorFatia.percent}%
                    </Text>
                    <Text
                      style={{ fontSize: 14, color: Cor.secundaria }}
                      allowFontScaling={false}
                    >
                      {maiorFatia.label}
                    </Text>
                  </View>
                );
              }}
            />
            <View
              style={{
                flex: 1,
                paddingLeft: 20,
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {ItemLegenda(Cor.extra, "Extras", percExtras + "%")}
              {ItemLegenda(Cor.fixo, "Fixos", percFixos + "%")}
              {ItemLegenda(Cor.turno, "Turnos", percTurnos + "%")}
              {ItemLegenda(Cor.ativo + 50, "Créditos", percCreditos + "%")}
              <View
                style={{
                  width: "70%",
                  height: 1,
                  backgroundColor: Cor.secundaria,
                  marginBottom: 8,
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <View
                  style={[
                    {
                      width: 12,
                      height: 12,
                      borderRadius: 6,
                      marginRight: 8,
                      backgroundColor: Cor.atencao,
                    },
                  ]}
                />
                <Text
                  style={{ color: Cor.texto1, fontSize: 12 }}
                  allowFontScaling={false}
                >
                  Descontos:{" "}
                  <Text
                    style={{ color: Cor.atencao, fontWeight: 500 }}
                    allowFontScaling={false}
                  >
                    -{percDescontos + "%"}
                  </Text>
                </Text>
              </View>
              {/* {ItemLegenda(Cor.atencao, "Descontos", percDescontos + "%")} */}
            </View>
          </View>
        </View>
        {/* Valor Total */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            marginBottom: 10,
            height: 80,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 10,
            borderLeftColor: Cor.primaria,
            borderRightWidth: 10,
            borderRightColor: Cor.primaria,
            borderColor: Cor.texto2 + 50,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: 5,
          }}
        >
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Saldo referênte ao mês de{" "}
              <Text
                style={{ fontWeight: 800, color: Cor.primaria }}
                allowFontScaling={false}
              >
                {meses[mesIndex]}
              </Text>
            </Text>
          </View>
          {loadingExtra || loadingFixo || loadingTurno ? (
            <ActivityIndicator color={Cor.primaria} />
          ) : (
            <Text
              style={{ fontWeight: 800, color: Cor.primaria, fontSize: 25 }}
              allowFontScaling={false}
            >
              {saldo.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Text>
          )}
        </View>
        {/* Valor Extra */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            padding: 5,
            marginBottom: 10,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: Cor.extra,
            borderColor: Cor.texto2 + 50,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Cor.extra + 50,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Cor.extra,
                fontSize: 25,
                fontFamily: "IconeFill",
              }}
              allowFontScaling={false}
            >
              local_taxi
            </Text>
          </View>
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Valores de Extras
            </Text>
            {loadingExtra || loadingFixo || loadingTurno ? (
              <ActivityIndicator color={Cor.extra} />
            ) : (
              <Text
                style={{ fontWeight: 500, color: Cor.textoExtra, fontSize: 18 }}
                allowFontScaling={false}
              >
                {totalExtras.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
          </View>
        </View>
        {/* Valor Fixo */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            padding: 5,
            marginBottom: 10,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: Cor.fixo,
            borderColor: Cor.texto2 + 50,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Cor.fixo + 50,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Cor.fixo,
                fontSize: 38,
                fontFamily: "IconeFill",
              }}
              allowFontScaling={false}
            >
              history
            </Text>
          </View>
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Valores de Fixos
            </Text>
            {loadingExtra || loadingFixo || loadingTurno ? (
              <ActivityIndicator color={Cor.fixo} />
            ) : (
              <Text
                style={{ fontWeight: 500, color: Cor.textoFixo, fontSize: 18 }}
                allowFontScaling={false}
              >
                {totalFixos.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
          </View>
        </View>
        {/* Valor Turno */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            padding: 5,
            marginBottom: 10,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: Cor.turno,
            borderColor: Cor.texto2 + 50,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Cor.turno + 50,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Cor.turno,
                fontSize: 38,
                fontFamily: "IconeFill",
              }}
              allowFontScaling={false}
            >
              cycle
            </Text>
          </View>
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Valores de Turnos
            </Text>
            {loadingExtra || loadingFixo || loadingTurno ? (
              <ActivityIndicator color={Cor.turno} />
            ) : (
              <Text
                style={{ fontWeight: 500, color: Cor.textoTurno, fontSize: 18 }}
                allowFontScaling={false}
              >
                {totalTurnos.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
          </View>
        </View>
        {/* Lançamentos Crédito */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            padding: 5,
            marginBottom: 10,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: Cor.ativo,
            borderColor: Cor.texto2 + 50,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Cor.ativo + 50,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Cor.ativo,
                fontSize: 38,
                fontFamily: "IconeFill",
              }}
              allowFontScaling={false}
            >
              attach_money
            </Text>
          </View>
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Total de Créditos
            </Text>
            {loadingExtra || loadingFixo || loadingTurno ? (
              <ActivityIndicator color={Cor.ativo} />
            ) : (
              <Text
                style={{ fontWeight: 500, color: Cor.ativo, fontSize: 18 }}
                allowFontScaling={false}
              >
                {creditos.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
          </View>
        </View>
        {/* Lançamentos Desconto */}
        <View
          style={{
            backgroundColor: Cor.base,
            width: "100%",
            padding: 5,
            marginBottom: 100,
            borderRadius: 22,
            borderWidth: 1,
            borderLeftWidth: 5,
            borderLeftColor: Cor.atencao,
            borderColor: Cor.texto2 + 50,
            justifyContent: "flex-start",
            alignItems: "center",
            flexDirection: "row",
            gap: 10,
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: Cor.atencao + 50,
              borderRadius: 14,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                color: Cor.atencao,
                fontSize: 38,
                fontFamily: "IconeFill",
              }}
              allowFontScaling={false}
            >
              money_off
            </Text>
          </View>
          <View>
            <Text
              style={{ color: Cor.texto1, fontSize: 12 }}
              allowFontScaling={false}
            >
              Total de Descontos
            </Text>
            {loadingExtra || loadingFixo || loadingTurno ? (
              <ActivityIndicator color={Cor.atencao} />
            ) : (
              <Text
                style={{ fontWeight: 500, color: Cor.atencao, fontSize: 18 }}
                allowFontScaling={false}
              >
                -
                {descontos.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
      <Navmenu
        home={false}
        calendario={false}
        controle={true}
        equipe={false}
        perfil={false}
      />
    </>
  );
}
