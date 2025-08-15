interface Config {
  rpcUrl: string;
  chainId: number;
  contractAddress: string;
  abiUrl: string;
}

// Default configuration from environment variables
const defaultConfig: Config = {
  rpcUrl: import.meta.env.VITE_RPC_URL || 'https://sepolia.base.org',
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '84532'),
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS || '',
  abiUrl: import.meta.env.VITE_ABI_URL || '/abi/CrowdChain.json',
};

// Runtime configuration with localStorage overrides
export function getConfig(): Config {
  const stored = localStorage.getItem('crowdchain-config');
  if (stored) {
    try {
      const storedConfig = JSON.parse(stored);
      return { ...defaultConfig, ...storedConfig };
    } catch (e) {
      console.warn('Failed to parse stored config, using defaults');
    }
  }
  return defaultConfig;
}

export function saveConfig(config: Partial<Config>) {
  const currentConfig = getConfig();
  const newConfig = { ...currentConfig, ...config };
  localStorage.setItem('crowdchain-config', JSON.stringify(newConfig));
}

export function resetConfig() {
  localStorage.removeItem('crowdchain-config');
}
