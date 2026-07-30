import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_LISTA_OPERADORA = gql`
  query Operadoras {
    operadoras {
      id
      nome
      slug
      logoOperadora
      cnpj
      rSocial
      endRua
      endNumero
      endBairro
      endCep
      endCidade
      endUf
      statusOperadora
      dataCriacao
    }
  }
`;

export interface Operadora {
  id: string;
  nome: string;
  slug: string;
  logoOperadora: string;
  cnpj: string;
  rSocial: string;
  endRua: string;
  endNumero: string;
  endBairro: string;
  endCep: string;
  endCidade: string;
  endUf: string;
  statusOperadora: boolean;
  dataCriacao: string;
}

// Tipagem da resposta completa da query (correspondente ao JSON retornado)
interface OperadorasDataResponse {
  operadoras: Operadora[];
}

export function useOperadoras() {
  const { data, loading, error } =
    useQuery<OperadorasDataResponse>(GET_LISTA_OPERADORA);

  return {
    data: data?.operadoras || [],
    loading,
    error,
  };
}
