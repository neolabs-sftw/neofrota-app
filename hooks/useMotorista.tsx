import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_MOTORISTA = gql`
  query Motorista($motoristaId: ID!) {
    motorista(id: $motoristaId) {
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
      operadoraId {
        id
        nome
        logoOperadora
        statusOperadora
      }
      statusCnh
    }
  }
`;

interface motoristaProps {
  id: string;
  nome: string;
  email: string;
  senha: string;
  fotoMotorista: string;
  cpf: string;
  cnh: string;
  vCnh: string;
  statusMotorista: string;
  tipoMotorista: string;
  dataCriacao: string;
  operadoraId: {
    id: string;
    nome: string;
    logoOperadora: string;
    statusOperadora: string;
  };
  statusCnh: string;
}

export function useMotorista(motoristaId: any) {
  const { data, loading, error, refetch } = useQuery<{ motorista: motoristaProps }>(GET_MOTORISTA, {
    variables: { motoristaId },
    fetchPolicy: "cache-and-network",
  });
  return { data, loading, error, refetch: refetch || (() => Promise.resolve()) };
}
