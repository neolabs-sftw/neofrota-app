import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define a tipagem do nosso contexto
interface PrivacidadeContextData {
  segredo: boolean;
  alterarSegredo: () => Promise<void>;
}

// Cria o contexto
const PrivacidadeContext = createContext<PrivacidadeContextData>({} as PrivacidadeContextData);

// Cria o Provider que vai envolver a aplicação
export const PrivacidadeProvider = ({ children }: { children: ReactNode }) => {
  const [segredo, setSegredo] = useState(false); // Pode iniciar como true (oculto) por segurança

  // Carrega a preferência salva assim que o app abrir
  useEffect(() => {
    const loadStorageData = async () => {
      try {
        const storedSegredo = await AsyncStorage.getItem('@app_segredo');
        if (storedSegredo !== null) {
          setSegredo(JSON.parse(storedSegredo));
        }
      } catch (error) {
        console.error('Erro ao carregar o estado do AsyncStorage:', error);
      }
    };
    loadStorageData();
  }, []);

  // Função para alternar o estado e salvar no AsyncStorage ao mesmo tempo
  const alterarSegredo = async () => {
    try {
      const newValue = !segredo;
      setSegredo(newValue);
      await AsyncStorage.setItem('@app_segredo', JSON.stringify(newValue));
    } catch (error) {
      console.error('Erro ao salvar o estado no AsyncStorage:', error);
    }
  };

  return (
    <PrivacidadeContext.Provider value={{ segredo, alterarSegredo }}>
      {children}
    </PrivacidadeContext.Provider>
  );
};

// Hook customizado para facilitar o uso nos componentes
export const usePrivacidade = () => useContext(PrivacidadeContext);