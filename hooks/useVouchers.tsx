import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_VOUCHERS = gql`
  query VouchersPorMotorista($motoristaId: ID!) {
    vouchersPorMotorista(motoristaId: $motoristaId) {
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
        statusCliente
        rSocial
      }
      unidadeCliente {
        id
        nome
        endBairro
        endCep
        endCidade
        endComplemento
        endNumero
        endRua
        endUf
      }
      passageiros {
        statusPresenca
        passageiroId {
          id
          nome
          telefone
          pontoApanha
          endBairro
          endCidade
          endNumero
          endRua
          fotoPerfilPassageiro
          matricula
        }
      }
    }
  }
`;

interface VouchersData {
  vouchersPorMotorista: Array<{
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

export function useVouchers(motoristaId?: string) {
  const { data, loading, error, refetch } = useQuery<VouchersData>(
    GET_VOUCHERS,
    {
      variables: { motoristaId },
      fetchPolicy: "cache-and-network",
    }
  );

  return {
    listaVouchers: data?.vouchersPorMotorista || [],
    loading,
    error,
    refetch: (id?: string) => refetch({ motoristaId: id ?? motoristaId! }),
  };
}

const GET_VOUCHER_BY_ID = gql`
  query Voucher($voucherId: ID!) {
    voucher(id: $voucherId) {
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
        nome
        rSocial
        fotoLogoCliente
      }
      unidadeCliente {
        nome
        endBairro
        endCep
        endCidade
        endComplemento
        endNumero
        endRua
        endUf
      }
      motorista {
        id
        nome
        email
        senha
        fotoMotorista
        cpf
        cnh
        vCnh
        statusMotorista
        tipoMotorista
        dataCriacao
        statusCnh
      }
      carro {
        ano
        cor
        marca
        modelo
        placa
      }
      adminUsuario {
        id
        nome
      }
      solicitante {
        id
        nome
        fotoUrlSolicitante
        telefone
      }
      passageiros {
        id
        horarioEmbarqueReal
        statusPresenca
        rateio
        passageiroId {
          id
          nome
          matricula
          telefone
          email
          ativo
          fotoPerfilPassageiro
          endRua
          endNumero
          endBairro
          endCidade
          pontoApanha
          horarioEmbarque
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

interface Voucher {
    voucher:{
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
    }>;}
}

export function useVoucherId(voucherId: string) {
  const { data, loading, error, refetch } = useQuery<Voucher>(GET_VOUCHER_BY_ID, {
    variables: { voucherId },
    fetchPolicy: "cache-and-network",
  });
  return {
    voucher: data?.voucher,
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  }
}
