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
const HISTORY_KEY = "HistoricoLogins";

type LoginHistoryItem = {
  token: string;
  email: string;
  loggedAt: string; // ISO
};

async function getLoginHistory(): Promise<LoginHistoryItem[]> {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed as LoginHistoryItem[];
  } catch {
    // Se corromper/vir diferente, reseta
    return [];
  }
}

async function addToLoginHistory(item: LoginHistoryItem) {
  const history = await getLoginHistory();

  // Dedup: remove entradas iguais (por email) e coloca a mais recente no topo
  const next = [item, ...history.filter((h) => h.email !== item.email)];

  // Opcional: limita tamanho (pra não crescer infinito)
  const MAX = 10;
  const limited = next.slice(0, MAX);

  await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(limited));
}

export function useFazerLogin() {
  const [login, { data, loading, error }] =
    useMutation<LoginResponse>(FAZER_LOGIN);

  const fazerLogin = async (email: string, senha: string) => {
    try {
      const resposta = await login({ variables: { email, senha } });
      const token = resposta.data?.loginMotorista?.token;

      if (token) {
        await AsyncStorage.setItem(TOKEN_KEY, token);
        await addToLoginHistory({
          token,
          email,
          loggedAt: new Date().toISOString(),
        });
      }

      return token ?? null;
    } catch (err) {
      console.log("Erro no login:");
      throw err;
    }
  };

  return { fazerLogin, data, loading, error };
}


export async function removerLoginDoHistoricoPorEmail(email: string) {
  const raw = await AsyncStorage.getItem(HISTORY_KEY);
  const history: LoginHistoryItem[] = raw ? JSON.parse(raw) : [];

  const next = history.filter((h) => h.email !== email);

  if (next.length === 0) {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } else {
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(next));
  }

  // opcional: se o token atual pertence a esse email, derruba a sessão também
  const tokenAtual = await AsyncStorage.getItem(TOKEN_KEY);
  const tokenRemovido = history.find((h) => h.email === email)?.token;

  if (tokenAtual && tokenRemovido && tokenAtual === tokenRemovido) {
    await AsyncStorage.removeItem(TOKEN_KEY);
  }
}