import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_LANCAMENTOS_OPERADORA = gql`
  query Lancamentos($filter: filtroLancamento) {
    lancamentos(filter: $filter) {
      id
      descricao
      valor
      tipo
      dataHora
      motorista {
        nome
      }
      adminUsuario {
        nome
      }
      operadora {
        nome
      }
    }
  }
`;

interface Lancamento {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  dataHora: string;
  motorista?: {
    nome: string;
  };
  adminUsuario?: {
    nome: string;
  };
  operadora?: {
    nome: string;
  };
}

interface GetLancamentosData {
  lancamentos: Lancamento[];
}

interface GetLancamentosVars {
  filter: filtroLancamento;
}

interface filtroLancamento {
  tipo?: string;
  dataInicial?: string;
  dataFinal?: string;
  motoristaId?: string;
  adminUsuarioId?: string;
  operadoraId?: string;
}

export function useLancamentosOperadora(filter: filtroLancamento) {
  const { data, loading, error, refetch } = useQuery<
    GetLancamentosData,
    GetLancamentosVars
  >(
    GET_LANCAMENTOS_OPERADORA,
    {
      variables: {
        filter: filter,
      },
      fetchPolicy: "cache-and-network",
      skip: !filter?.operadoraId,
    },
  );
  return {
    lancamentos: data ? data?.lancamentos : [],
    loading,
    error,
    refetch: refetch || Promise.resolve(),
  };
}