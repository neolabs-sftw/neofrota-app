import React from 'react';
import { Button, Text, View } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function PerfilScreen() {
  const { user, token, isLoading, logout } = useAuth();

  if (isLoading) {
    return <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Carregando...</Text></View>;
  }

  if (!user) {
    return <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Não Autenticado</Text></View>;
  }

  return (
    <View style={{ padding: 20, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Bem-vindo!</Text>
      <Text>Motorista ID: {user.motoristaId}</Text>
      <Text>Operadora ID: {user.operadoraId}</Text>
      <Text>Token (primeiros 20): {token?.substring(0, 20)}...</Text>

      <Button title="Sair" onPress={logout} />
    </View>
  );
}