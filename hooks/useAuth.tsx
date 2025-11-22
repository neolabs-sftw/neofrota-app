import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';

const TOKEN_KEY = process.env.EXPO_PUBLIC_TOKEN_KEY!;

interface JwtPayload {
  motoristaId: string;
  operadoraId: string;
  iat: number;
  exp?: number;
}

interface AuthState {
  token: string | null;
  user: JwtPayload | null;
  isLoading: boolean;
}

export function useAuth() {
  const [authState, setAuthState] = useState<AuthState>({
    token: null,
    user: null,
    isLoading: true,
  });

  // Carregar token ao iniciar
  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      if (token) {
        const user = jwtDecode<JwtPayload>(token);
        setAuthState({ token, user, isLoading: false });
      } else {
        setAuthState({ token: null, user: null, isLoading: false });
      }
    } catch (error) {
      console.error('Erro ao carregar token:', error);
      setAuthState({ token: null, user: null, isLoading: false });
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem(TOKEN_KEY);
    setAuthState({ token: null, user: null, isLoading: false });
  };

  return {
    ...authState,
    logout,
    refetch: loadToken,
  };
}