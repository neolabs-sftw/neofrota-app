import { CorClara, CorEscura } from "@/assets/cores";
import CardVoucher from "@/componentes/cardVoucher";
import Navmenu from "@/componentes/navmenu";
import TopoInfos from "@/componentes/topoinfos";
import { useAuth } from "@/hooks/useAuth";
import { useVouchersMotoristaData } from "@/hooks/useVouchers";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  useColorScheme,
  View,
} from "react-native";
import { Calendar, LocaleConfig } from "react-native-calendars";

export default function Calendario() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user, isLoading } = useAuth();

  const formatarData = (isoOrDate: string | Date) => {
    const d = new Date(isoOrDate);

    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`;
  };

  const hoje = formatarData(new Date());

  const [diaSelecionado, setDiaSelecionado] = useState<string>(hoje);

  LocaleConfig.locales["pt-BR"] = {
    monthNames: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julio",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    monthNamesShort: [
      "Jan",
      "Fev",
      "Mar",
      "Abr",
      "Mai",
      "Jun",
      "Jul",
      "Ago",
      "Set",
      "Out.",
      "Nov",
      "Dez",
    ],
    dayNames: [
      "Domingo",
      "Segunda",
      "Terça",
      "Quarta",
      "Quinta",
      "Sexta",
      "Sábado",
    ],
    dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Quin", "Sex", "Sab"],
    today: "Hoje",
  };

  LocaleConfig.defaultLocale = "pt-BR";

  const {
    listaVouchersData: ordemDia,
    loading: loadingVouchers,
    error: errorVMD,
    refetch: refetchVouchers,
  } = useVouchersMotoristaData(user?.motoristaId || "", diaSelecionado);

   const listaVouchersData = [...ordemDia].sort(
    (a, b) =>
      new Date(a.dataHoraProgramado).getTime() -
      new Date(b.dataHoraProgramado).getTime(),
  );

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
            Histórico de Vouchers
          </Text>
          <View style={{ height: 1, backgroundColor: Cor.primaria }} />
        </View>
        <View style={{ width: "100%", height: 320 }}>
          <View
            style={{
              width: "100%",
              height: 320,
              backgroundColor: Cor.base2,
            }}
          >
            <Calendar
              style={{
                borderColor: Cor.texto2 + 50,
                borderWidth: 1,
                height: 320,
              }}
              onDayPress={(day) => {
                setDiaSelecionado(day.dateString);
              }}
              theme={{
                calendarBackground: "transparent",
                textSectionTitleColor: Cor.texto1 + 99,
                todayTextColor: Cor.primaria,
                dayTextColor: Cor.primariaTxt,
                textDisabledColor: Cor.texto2 + 80,
                arrowColor: Cor.secundaria,
                monthTextColor: Cor.primariaTxt,
                selectedDayBackgroundColor: Cor.primaria,
                selectedDayTextColor: "#fff",
              }}
              markedDates={{
                ...(diaSelecionado
                  ? {
                      [diaSelecionado]: {
                        selected: true,
                        selectedColor: Cor.primaria,
                        selectedTextColor: "#fff",
                      },
                    }
                  : {}),
              }}
            />
          </View>
        </View>
        <View
          style={{
            width: "100%",
            paddingHorizontal: 20,
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            justifyContent: "space-between",
          }}
        >
          <Text
            allowFontScaling={false}
            style={{ color: Cor.secundaria, fontSize: 12 }}
          >
            Registros do dia
          </Text>
          <View
            style={{ width: "100%", height: 1, backgroundColor: Cor.primaria }}
          />
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
          {loadingVouchers ? (
            <ActivityIndicator color={Cor.primaria} />
          ) : (
            listaVouchersData.map((v, index) => {
              return <CardVoucher key={index} voucher={v} />;
            })
          )}
        </ScrollView>
      </View>
      <Navmenu
        home={false}
        calendario={true}
        controle={false}
        equipe={false}
        perfil={false}
      />
    </View>
  );
}
