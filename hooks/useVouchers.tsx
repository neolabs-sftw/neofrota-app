import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_VOUCHERS_MOTORISTA_DATA = gql`
  query VouchersMotoristaData($motoristaId: ID!, $diaSelecionado: String!) {
    vouchersMotoristaData(
      motoristaId: $motoristaId
      diaSelecionado: $diaSelecionado
    ) {
      id
      origem
      destino
      dataHoraProgramado
      dataHoraConclusao
      dataHoraCriacao
      qntTempoParado
      assinatura
      observacaoMotorista
      observacao
      valorViagem
      valorViagemRepasse
      valorDeslocamento
      valorDeslocamentoRepasse
      valorHoraParada
      valorHoraParadaRepasse
      valorPedagio
      valorEstacionamento
      natureza
      tipoCorrida
      status
      empresaCliente {
        id
        nome
        fotoLogoCliente
        rSocial
        statusCliente
      }
      unidadeCliente {
        endBairro
        endCep
        endCidade
        endComplemento
        endNumero
        endRua
        endUf
        id
        statusUnidadeCliente
        cnpj
        nome
      }
      motorista {
        cnh
        cpf
        nome
        fotoMotorista
        email
        statusCnh
        statusMotorista
        tipoMotorista
        vCnh
      }
      carro {
        id
        placa
        marca
        modelo
        cor
        crlv
        vCrlv
        chassi
        ano
      }
      adminUsuario {
        id
        nome
      }
      solicitante {
        funcao
        fotoUrlSolicitante
        nome
        telefone
      }
      passageiros {
        horarioEmbarqueReal
        id
        rateio
        statusPresenca
        passageiroId {
          ativo
          email
          endBairro
          endCidade
          endNumero
          endRua
          fotoPerfilPassageiro
          horarioEmbarque
          id
          matricula
          nome
          pontoApanha
          telefone
          centroCustoClienteId {
            id
            nome
            codigo
          }
        }
      }
    }
  }
`;

interface VouchersMotoristaData {
  vouchersMotoristaData: Array<{
    id: string;
    origem: string;
    destino: string;
    dataHoraProgramado: string;
    dataHoraConclusao: string | null;
    dataHoraCriacao: string;
    qntTempoParado: number;
    assinatura: string | null;
    observacaoMotorista: string | null;
    observacao: string | null;
    valorViagem: number;
    valorViagemRepasse: number;
    valorDeslocamento: number;
    valorDeslocamentoRepasse: number;
    valorHoraParada: number;
    valorHoraParadaRepasse: number;
    valorPedagio: number;
    valorEstacionamento: number;
    natureza: string;
    tipoCorrida: string;
    status: string;
    empresaCliente: {
      id: string;
      nome: string;
      fotoLogoCliente: string | null;
      statusCliente: boolean;
      rSocial: string;
    };
    unidadeCliente: {
      id: string;
      nome: string;
      endBairro: string;

      endCep: string;
      endCidade: string;
      endComplemento: string | null;
      endNumero: string;
      endRua: string;
      endUf: string;
    };
    passageiros: Array<{
      statusPresenca: string;
      passageiroId: {
        id: string;
        nome: string;
        telefone: string;
        pontoApanha: string | null;
        endBairro: string;
        endCidade: string;
        endNumero: string;
        endRua: string;
        fotoPerfilPassageiro: string | null;
        matricula: string;
      };
    }>;
  }>;
}

export function useVouchersMotoristaData(
  motoristaId: string,
  diaSelecionado: string
) {
  const { data, loading, error, refetch } = useQuery<VouchersMotoristaData>(
    GET_VOUCHERS_MOTORISTA_DATA,
    {
      variables: {
        motoristaId,
        diaSelecionado,
      },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    listaVouchersData: data?.vouchersMotoristaData || [],
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}


