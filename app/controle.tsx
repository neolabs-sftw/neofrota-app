import { CorClara, CorEscura } from "@/assets/cores";
import Navmenu from "@/componentes/navmenu";
import ResumoMesFaturamento from "@/componentes/resumomesfaturamento";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useFaturamentoMes } from "@/hooks/useFinanceiro";
import React, { useState } from "react";
import {
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
  FlatList,
} from "react-native";
import { LineChart } from "react-native-gifted-charts";

export default function Controle() {
  const { user } = useAuth();

  const anoAtual = new Date().getFullYear();

  const [ano, setAno] = useState(new Date().getFullYear());

  const anosDisponiveis = Array.from({ length: 6 }, (_, i) =>
    String(anoAtual - i),
  );

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

  const { listaMeses } = useFaturamentoMes({
    motoristaId: user?.motoristaId || "",
    ano: ano,
  });

  const nomesDosMeses = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];

  function formatarDadosParaGrafico(dadosDaApi: any[]) {
    // Ordena os dados de Janeiro (1) a Dezembro (12) para o gráfico não ficar de trás pra frente
    const dadosOrdenados = [...dadosDaApi].sort((a, b) => a.mes - b.mes);

    // Array 1: Apenas os repasses de Viagem
    const dadosViagem = dadosOrdenados.map((item) => ({
      x: nomesDosMeses[item.mes - 1], // Converte mês 1 para "Jan"
      y: item.valorViagemRepasse,
    }));

    // Array 2: Apenas os repasses de Hora Parada
    const dadosHoraParada = dadosOrdenados.map((item) => ({
      x: nomesDosMeses[item.mes - 1],
      y: item.valorHoraParadaRepasse,
    }));

    return { dadosViagem, dadosHoraParada };
  }

  const maiorFaturamento = Math.max(
    ...listaMeses.map((item) => item.faturamentoTotal || 0),
  );

  const valorMaximoEixoY = Math.max(
    Math.ceil(maiorFaturamento / 1000) * 1000,
    1000,
  );

  const numeroDeSecoes = valorMaximoEixoY / 1000;

  const textosEixoY = Array.from({ length: numeroDeSecoes + 1 }, (_, index) => {
    if (index === 0) return "0";
    return `${index}k`;
  });

  const [modalVisivel, setModalVisivel] = useState(false);

  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { dadosViagem } = formatarDadosParaGrafico(listaMeses);
  const { dadosHoraParada } = formatarDadosParaGrafico(listaMeses);

  // Mapeia os dados para o formato esperado pelo gifted-charts
  const listaDadosViagem = dadosViagem.map((item) => ({
    value: item.y,
    label: item.x,
  }));
  const listaDadosHoraParada = dadosHoraParada.map((item) => ({
    value: item.y,
    label: item.x,
  }));

  return (
    <View style={{ flex: 1, backgroundColor: Cor.base }}>
      <TopoInfos segredo={false} fotoPerfil={true} />
      <View
        style={{
          flex: 1,
          backgroundColor: Cor.base,
          flexDirection: "column",
          gap: 10,
        }}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 14 }}
          >
            Relatório de Faturamento
          </Text>
          <View style={{ height: 1, backgroundColor: Cor.primaria }} />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 10,
            marginHorizontal: 20,
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 12 }}
          >
            Selecione um ano:
          </Text>
          <TouchableOpacity
            style={{
              width: "50%",
              padding: 10,
              backgroundColor: Cor.base2,
              borderRadius: 10,
              gap: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}
            onPress={() => setModalVisivel(true)}
          >
            <Text
              allowFontScaling={false}
              style={{ color: Cor.texto1, fontSize: 14, fontWeight: "bold" }}
            >
              {ano}
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
              keyboard_arrow_down
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ width: "100%", paddingLeft: 20 }}>
          <View
            style={{
              width: "100%",
              height: 250,
              backgroundColor: Cor.base2,
              borderTopLeftRadius: 22,
              borderBottomLeftRadius: 22,
              // paddingVertical: 20,
              justifyContent: "center",
            }}
          >
            <LineChart
              areaChart
              curved
              data={listaDadosViagem}
              data2={listaDadosHoraParada}
              height={200}
              width={350}
              spacing={50}
              initialSpacing={0}
              color1={Cor.primaria}
              color2={Cor.secundaria}
              textColor1={Cor.texto1}
              textColor2={Cor.texto2}
              dataPointsColor1={Cor.primaria}
              dataPointsColor2={Cor.secundaria}
              startFillColor1={Cor.primaria}
              startFillColor2={Cor.secundaria}
              endFillColor1={Cor.primaria}
              endFillColor2={Cor.secundaria}
              startOpacity={0.9}
              endOpacity={0.1}
              maxValue={valorMaximoEixoY}
              xAxisColor={Cor.texto1 + 50}
              yAxisColor={Cor.texto1 + 50}              
              noOfSections={numeroDeSecoes}
              yAxisLabelTexts={textosEixoY}
              yAxisLabelWidth={30}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            marginBottom: -10,
            flexDirection: "row",
            alignItems: "flex-end",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 12 }}
          >
            Resumo por mês
          </Text>
          <View
            style={{ width: "100%", height: 1, backgroundColor: Cor.primaria }}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
            paddingHorizontal: 20,
            paddingTop: 10,
            gap: 10,
          }}
        >
          <Modal visible={modalVisivel} transparent animationType="none">
            <TouchableOpacity
              style={{
                flex: 1,
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setModalVisivel(false)}
            >
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  width: "70%",
                  maxHeight: 100, // Limita a altura caso queira aumentar os anos no futuro
                  overflow: "hidden",
                  elevation: 5, // Sombra no Android
                  shadowColor: "#000", // Sombra no iOS
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.8,
                  shadowRadius: 3.84,
                }}
              >
                <FlatList
                  data={anosDisponiveis}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{
                        padding: 10,
                      }}
                      onPress={() => {
                        setAno(Number(item));
                        setModalVisivel(false);
                      }}
                    >
                      <Text>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </TouchableOpacity>
          </Modal>
          {listaMeses.toReversed().map((v: any) => {
            return (
              <ResumoMesFaturamento
                key={v.mes}
                mes={meses[v.mes - 1]}
                resumoValor={Intl.NumberFormat("pt-BR", {
                  style: "decimal",
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                }).format(v.faturamentoTotal)}
                press={() => console.log("teste")}
              />
            );
          })}
        </ScrollView>
      </View>
      <Navmenu
        home={false}
        calendario={false}
        controle={true}
        equipe={false}
        perfil={false}
      />
    </View>
  );
}
