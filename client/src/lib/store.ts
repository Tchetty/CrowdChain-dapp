import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface WalletState {
  address: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  connect: () => Promise<void>;
  disconnect: () => void;
  setAddress: (address: string | null) => void;
}

interface ThemeState {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

interface AppState extends WalletState, ThemeState {
  // Add other app-wide state here
  isSettingsOpen: boolean;
  setSettingsOpen: (open: boolean) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Wallet state
      address: null,
      isConnected: false,
      isConnecting: false,
      connect: async () => {
        set({ isConnecting: true });
        try {
          const { connectWallet } = await import('./ethers');
          const address = await connectWallet();
          set({ 
            address, 
            isConnected: true, 
            isConnecting: false 
          });
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          set({ isConnecting: false });
          throw error;
        }
      },
      disconnect: () => {
        set({ 
          address: null, 
          isConnected: false 
        });
      },
      setAddress: (address) => {
        set({ 
          address, 
          isConnected: !!address 
        });
      },

      // Theme state
      theme: 'light',
      toggleTheme: () => {
        const newTheme = get().theme === 'light' ? 'dark' : 'light';
        set({ theme: newTheme });
        
        // Update DOM class
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', newTheme === 'dark');
        }
      },
      setTheme: (theme) => {
        set({ theme });
        
        // Update DOM class
        if (typeof document !== 'undefined') {
          document.documentElement.classList.toggle('dark', theme === 'dark');
        }
      },

      // App state
      isSettingsOpen: false,
      setSettingsOpen: (open) => set({ isSettingsOpen: open }),
    }),
    {
      name: 'crowdchain-store',
      partialize: (state) => ({
        theme: state.theme,
        // Don't persist wallet connection state for security
      }),
    }
  )
);

// Initialize theme on load
if (typeof window !== 'undefined') {
  const store = useStore.getState();
  const savedTheme = localStorage.getItem('crowdchain-store');
  
  if (savedTheme) {
    try {
      const parsed = JSON.parse(savedTheme);
      const theme = parsed.state?.theme || 'light';
      document.documentElement.classList.toggle('dark', theme === 'dark');
    } catch (e) {
      // Default to system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  } else {
    // Default to system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.documentElement.classList.toggle('dark', prefersDark);
    store.setTheme(prefersDark ? 'dark' : 'light');
  }
}
