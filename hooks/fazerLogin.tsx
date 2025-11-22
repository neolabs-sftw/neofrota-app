import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const FAZER_LOGIN = gql`
  mutation LoginMotorista($email: String!, $senha: String!) {
    loginMotorista(email: $email, senha: $senha) {
      token
    }
  }
`;

interface LoginResponse {
  loginMotorista: {
    token: string;
  };
}

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY!;

export function useFazerLogin() {
  const [login, { data, loading, error }] =
    useMutation<LoginResponse>(FAZER_LOGIN);

  const fazerLogin = async (email: string, senha: string) => {
    try {
      const resposta = await login({ variables: { email, senha } });
      const token = resposta.data?.loginMotorista?.token;

      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
      }

      return token ?? null;
    } catch (err) {
      console.log("Erro no login:");
      throw err;
    }
  };

  return { fazerLogin, data, loading, error };
}
