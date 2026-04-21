import { CorClara, CorEscura } from "@/assets/cores";
import { useAuth } from "@/hooks/useAuth";
import { useLancamentosOperadora } from "@/hooks/useLancamentos";
import { Text, useColorScheme, View } from "react-native";

export default function CardDescontos() {
  const Cor = useColorScheme() === "dark" ? CorEscura : CorClara;

  const { user } = useAuth();

  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const formatarParaYMD = (data: Date) => {
    const ano = data.getFullYear();
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const dia = String(data.getDate()).padStart(2, "0");

    return `${ano}-${mes}-${dia}`;
  };
  const { lancamentos, loading, error, refetch } = useLancamentosOperadora({
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
  console.log(creditos, descontos);

  const saldo = creditos - descontos;
  console.log(saldo);

  return (
    <>
      <View
        style={{
          width: "auto",
          height: 50,
          marginHorizontal: 20,
          backgroundColor: Cor.base2,
          borderRadius: 22,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 5,
        }}
      >
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor:saldo === 0 ? Cor.texto2 + 60 : saldo < 0 ? Cor.atencao + 20 : Cor.ativo + 20,
            borderTopStartRadius: 22,
            borderBottomStartRadius: 22,
            alignItems: "flex-start",
            justifyContent: "center",
            padding: 10,
            marginRight: 10,
          }}
        >
          <View
            style={{
              width: 30,
              height: 30,
              backgroundColor: saldo === 0 ? Cor.texto2 : saldo < 0 ? Cor.atencao : Cor.ativo,
              borderRadius: 12,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text
              allowFontScaling={false}
              style={{
                fontFamily: "IconeFill",
                color: "#F4F4F4",
                fontSize: 20,
                textAlign: "center",
              }}
            >
             {saldo === 0 ? "counter_0" : saldo < 0 ? "money_off" : "attach_money"}
            </Text>
          </View>
        </View>
        <Text allowFontScaling={false} style={{ color: Cor.texto1 }}>
          Lançamentos
        </Text>
        <Text allowFontScaling={false} style={{ color: Cor.texto2 }}>
          R${" "}
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 16,
              color:saldo === 0 ? Cor.texto2 : saldo < 0 ? Cor.atencao : Cor.ativo,
            }}
          >
            {Intl.NumberFormat("pt-BR", {
              style: "decimal",
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }).format(saldo)}
          </Text>
        </Text>
      </View>
    </>
  );
}
