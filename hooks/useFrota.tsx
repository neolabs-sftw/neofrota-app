import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_FROTA = gql`
  query RelacaoAgrdFuncs($listaFuncionariosAgregadoId: ID!) {
    listaFuncionariosAgregadoId(id: $listaFuncionariosAgregadoId) {
      id
      motoristaComoFuncionario {
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
    }
  }
`;

// Tipos
interface Motorista {
  id: string;
  nome: string;
  email: string;
  senha: string;
  fotoMotorista: string;
  cpf: string;
  cnh: string;
  vCnh: string;
  statusMotorista: boolean;
  tipoMotorista: string;
  dataCriacao: string;
  statusCnh: boolean;
}

interface RelacaoAgrdFunc {
  id: string;
  motoristaComoFuncionario: Motorista;
}

interface FrotaData {
  listaFuncionariosAgregadoId: RelacaoAgrdFunc[];
}

export function useFrota(listaFuncionariosAgregadoId: string) {
  const { loading, error, data, refetch } = useQuery<FrotaData>(GET_FROTA, {
    variables: { listaFuncionariosAgregadoId },
    fetchPolicy: "cache-and-network",
  });

  return { data, loading, error, refetch: refetch || (() => Promise.resolve()) };
}
