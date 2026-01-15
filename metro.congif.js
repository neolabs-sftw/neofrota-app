import { getDefaultConfig } from 'expo/metro-config';

const config = getDefaultConfig(__dirname);

// Habilita suporte a links simbólicos (crucial para pnpm)
config.resolver.unstable_enableSymlinks = true;
// Garante que o Metro consiga resolver dependências dentro da estrutura do pnpm
config.resolver.unstable_enablePackageExports = true;

export default config;