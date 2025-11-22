import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

const GET_CARRO_MOTORISTA_ID = gql`
  query CarroMotoristaId($idMotorista: ID!) {
    carroMotoristaId(idMotorista: $idMotorista) {
      id
      placa
      marca
      modelo
      cor
      crlv
      vCrlv
      chassi
      ano
      agregadoId {
        id
        nome
      }
      motoristaId {
        id
        nome
      }
    }
  }
`;

const GET_LISTA_CARROS = gql`
query CarrosAgregadoId($carrosAgregadoId: ID!) {
  carrosAgregadoId(id: $carrosAgregadoId) {
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
}`;

interface carroProps {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  cor: string;
  crlv: string;
  vCrlv: string;
  chassi: string;
  ano: string;
  agregadoId: {
    id: string;
    nome: string;
  };
  motoristaId: {
    id: string;
    nome: string;
  };
}

interface carroData {
  carroMotoristaId: carroProps[];
}

export function useCarroID(idMotorista: any) {
  const { data, loading, error, refetch } = useQuery<carroData>(GET_CARRO_MOTORISTA_ID, {
    variables: { idMotorista },
    fetchPolicy: "cache-and-network",
  });
  return { data, loading, error, refetch: refetch || (() => Promise.resolve()) };
}


export function useListaCarros(idMotorista: any) {
  const { data, loading, error, refetch } = useQuery<carroData>(GET_LISTA_CARROS, {
    variables: { idMotorista },
    fetchPolicy: "cache-and-network"
  });
  return { data, loading, error, refetch: refetch || (() => Promise.resolve()) }
}