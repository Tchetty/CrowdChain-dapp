import { ethers, BrowserProvider, JsonRpcProvider, Contract } from 'ethers';
import { getConfig } from './config';

let provider: JsonRpcProvider | BrowserProvider | null = null;
let signer: ethers.Signer | null = null;
let contract: Contract | null = null;

export async function getProvider(): Promise<JsonRpcProvider | BrowserProvider> {
  if (!provider) {
    const config = getConfig();
    
    // Try to use browser wallet first, fallback to RPC
    if (typeof window !== 'undefined' && window.ethereum) {
      provider = new BrowserProvider(window.ethereum);
    } else {
      provider = new JsonRpcProvider(config.rpcUrl);
    }
  }
  return provider;
}

export async function getSigner(): Promise<ethers.Signer> {
  if (!signer) {
    if (typeof window !== 'undefined' && window.ethereum) {
      const browserProvider = new BrowserProvider(window.ethereum);
      await browserProvider.send("eth_requestAccounts", []);
      signer = await browserProvider.getSigner();
    } else {
      throw new Error('No wallet found. Please install MetaMask.');
    }
  }
  return signer;
}

export async function getContract(readOnly = false): Promise<Contract> {
  const config = getConfig();
  
  if (!config.contractAddress) {
    throw new Error('Contract address not configured');
  }

  try {
    // Load ABI
    const response = await fetch(config.abiUrl);
    if (!response.ok) {
      throw new Error(`Failed to load ABI from ${config.abiUrl}`);
    }
    const abi = await response.json();

    if (readOnly) {
      const provider = await getProvider();
      return new Contract(config.contractAddress, abi, provider);
    } else {
      const signer = await getSigner();
      return new Contract(config.contractAddress, abi, signer);
    }
  } catch (error) {
    console.error('Failed to initialize contract:', error);
    throw error;
  }
}

export async function connectWallet(): Promise<string> {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error('MetaMask not found. Please install MetaMask.');
  }

  try {
    const config = getConfig();
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });

    // Check if we're on the correct network
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });
    const currentChainId = parseInt(chainId, 16);

    if (currentChainId !== config.chainId) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: `0x${config.chainId.toString(16)}` }],
        });
      } catch (switchError: any) {
        if (switchError.code === 4902) {
          // Chain not added, add it
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: `0x${config.chainId.toString(16)}`,
              rpcUrls: [config.rpcUrl],
              chainName: 'Base Sepolia',
              nativeCurrency: {
                name: 'ETH',
                symbol: 'ETH',
                decimals: 18
              }
            }]
          });
        }
      }
    }

    // Reset provider and signer to force re-initialization
    provider = null;
    signer = null;
    contract = null;

    return accounts[0];
  } catch (error) {
    console.error('Failed to connect wallet:', error);
    throw error;
  }
}

export function isWalletConnected(): boolean {
  return typeof window !== 'undefined' && 
         window.ethereum && 
         window.ethereum.selectedAddress;
}

export async function getWalletAddress(): Promise<string | null> {
  if (typeof window === 'undefined' || !window.ethereum) {
    return null;
  }

  try {
    const accounts = await window.ethereum.request({
      method: 'eth_accounts'
    });
    return accounts[0] || null;
  } catch {
    return null;
  }
}

// Event subscription service
type EventHandler = (event: any) => void;

class EventSubscriptionService {
  private listeners: Map<string, EventHandler[]> = new Map();
  private contract: Contract | null = null;

  async subscribe(eventName: string, handler: EventHandler) {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, []);
    }
    this.listeners.get(eventName)!.push(handler);

    if (!this.contract) {
      try {
        this.contract = await getContract(true);
        this.setupEventListeners();
      } catch (error) {
        console.warn('Failed to setup event listeners:', error);
        return;
      }
    }
  }

  unsubscribe(eventName: string, handler: EventHandler) {
    const handlers = this.listeners.get(eventName);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index > -1) {
        handlers.splice(index, 1);
      }
    }
  }

  private setupEventListeners() {
    if (!this.contract) return;

    // Setup listeners for all events we're interested in
    this.contract.on('CampaignCreated', (id, creator, goal, deadline, event) => {
      this.notifyListeners('CampaignCreated', { id, creator, goal, deadline, event });
    });

    this.contract.on('Pledged', (campaignId, pledger, amount, event) => {
      this.notifyListeners('Pledged', { campaignId, pledger, amount, event });
    });

    this.contract.on('MilestoneRequested', (campaignId, milestoneIndex, event) => {
      this.notifyListeners('MilestoneRequested', { campaignId, milestoneIndex, event });
    });

    this.contract.on('MilestoneReleased', (campaignId, milestoneIndex, amount, event) => {
      this.notifyListeners('MilestoneReleased', { campaignId, milestoneIndex, amount, event });
    });

    this.contract.on('RefundClaimed', (campaignId, pledger, amount, event) => {
      this.notifyListeners('RefundClaimed', { campaignId, pledger, amount, event });
    });
  }

  private notifyListeners(eventName: string, eventData: any) {
    const handlers = this.listeners.get(eventName);
    if (handlers) {
      handlers.forEach(handler => handler(eventData));
    }
  }

  cleanup() {
    if (this.contract) {
      this.contract.removeAllListeners();
      this.contract = null;
    }
    this.listeners.clear();
  }
}

export const eventService = new EventSubscriptionService();

// Cleanup on page unload
if (typeof window !== 'undefined') {
  window.addEventListener('beforeunload', () => {
    eventService.cleanup();
  });
}
