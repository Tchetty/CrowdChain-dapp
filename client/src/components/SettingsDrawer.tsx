import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useStore } from '@/lib/store';
import { getConfig, saveConfig } from '@/lib/config';
import { getWalletAddress } from '@/lib/ethers';
import { useToast } from '@/hooks/use-toast';
import { Settings, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function SettingsDrawer() {
  const { isSettingsOpen, setSettingsOpen } = useStore();
  const { toast } = useToast();
  const [config, setConfig] = useState(getConfig());
  const [status, setStatus] = useState({
    network: 'Base Sepolia',
    account: 'Not Connected',
    contract: 'Not Connected'
  });

  useEffect(() => {
    updateStatus();
  }, []);

  const updateStatus = async () => {
    try {
      const address = await getWalletAddress();
      setStatus(prev => ({
        ...prev,
        account: address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not Connected',
        contract: config.contractAddress ? 'Connected' : 'Not Connected'
      }));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSaveConfig = () => {
    try {
      saveConfig(config);
      toast({
        title: 'Configuration Saved',
        description: 'Settings have been saved to local storage.',
      });
      updateStatus();
    } catch (error) {
      toast({
        title: 'Save Failed',
        description: 'Failed to save configuration.',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (key: keyof typeof config, value: string | number) => {
    setConfig(prev => ({
      ...prev,
      [key]: key === 'chainId' ? Number(value) : value
    }));
  };

  return (
    <>
      {/* Floating Settings Button */}
      <Sheet open={isSettingsOpen} onOpenChange={setSettingsOpen}>
        <SheetTrigger asChild>
          <Button
            size="sm"
            className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-primary hover:bg-primary-dark text-white shadow-lg transition-all duration-300 hover:scale-110 z-40"
            data-testid="button-settings-toggle"
          >
            <Settings className="w-6 h-6" />
          </Button>
        </SheetTrigger>

        <SheetContent side="right" className="w-96 max-w-[90vw]">
          <SheetHeader>
            <SheetTitle className="flex items-center justify-between">
              Developer Settings
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-6 mt-6">
            {/* Configuration Inputs */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="rpcUrl">RPC URL</Label>
                <Input
                  id="rpcUrl"
                  type="text"
                  value={config.rpcUrl}
                  onChange={(e) => handleInputChange('rpcUrl', e.target.value)}
                  placeholder="https://sepolia.base.org"
                  data-testid="input-rpc-url"
                />
              </div>

              <div>
                <Label htmlFor="chainId">Chain ID</Label>
                <Input
                  id="chainId"
                  type="number"
                  value={config.chainId}
                  onChange={(e) => handleInputChange('chainId', e.target.value)}
                  placeholder="84532"
                  data-testid="input-chain-id"
                />
              </div>

              <div>
                <Label htmlFor="contractAddress">Contract Address</Label>
                <Input
                  id="contractAddress"
                  type="text"
                  value={config.contractAddress}
                  onChange={(e) => handleInputChange('contractAddress', e.target.value)}
                  placeholder="0x..."
                  data-testid="input-contract-address"
                />
              </div>

              <div>
                <Label htmlFor="abiUrl">ABI URL</Label>
                <Input
                  id="abiUrl"
                  type="text"
                  value={config.abiUrl}
                  onChange={(e) => handleInputChange('abiUrl', e.target.value)}
                  placeholder="/abi/CrowdChain.json"
                  data-testid="input-abi-url"
                />
              </div>

              <Button 
                onClick={handleSaveConfig}
                className="w-full bg-primary hover:bg-primary-dark text-white"
                data-testid="button-save-config"
              >
                Save Configuration
              </Button>
            </div>

            {/* Connection Status */}
            <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <h4 className="font-medium mb-3">Connection Status</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Network:</span>
                  <span 
                    className="text-primary font-medium"
                    data-testid="text-network-status"
                  >
                    {status.network}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Account:</span>
                  <span 
                    className="text-primary font-medium"
                    data-testid="text-account-status"
                  >
                    {status.account}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Contract:</span>
                  <span 
                    className={`font-medium ${
                      status.contract === 'Connected' 
                        ? 'text-green-600' 
                        : 'text-red-600'
                    }`}
                    data-testid="text-contract-status"
                  >
                    {status.contract}
                  </span>
                </div>
              </div>
            </div>

            {/* Developer Info */}
            <div className="text-xs text-gray-500 dark:text-gray-400 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <h4 className="font-medium mb-2">Development Notes:</h4>
              <ul className="space-y-1">
                <li>• Settings are stored in localStorage</li>
                <li>• Contract address and ABI required for functionality</li>
                <li>• Make sure MetaMask is on the correct network</li>
                <li>• Check console for detailed error messages</li>
              </ul>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
