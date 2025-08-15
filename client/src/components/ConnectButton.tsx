import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store';
import { formatAddress } from '@/lib/format';
import { useToast } from '@/hooks/use-toast';
import { Wallet, LogOut } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function ConnectButton() {
  const { address, isConnected, isConnecting, connect, disconnect } = useStore();
  const { toast } = useToast();

  const handleConnect = async () => {
    try {
      await connect();
      toast({
        title: 'Wallet Connected',
        description: 'Successfully connected to your wallet.',
      });
    } catch (error) {
      toast({
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect wallet',
        variant: 'destructive',
      });
    }
  };

  const handleDisconnect = () => {
    disconnect();
    toast({
      title: 'Wallet Disconnected',
      description: 'Your wallet has been disconnected.',
    });
  };

  if (isConnected && address) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="outline"
            className="flex items-center space-x-2 bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
            data-testid="wallet-dropdown-trigger"
          >
            <Wallet className="w-4 h-4" />
            <span>{formatAddress(address)}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={handleDisconnect}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700"
            data-testid="button-disconnect"
          >
            <LogOut className="w-4 h-4" />
            <span>Disconnect</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Button 
      onClick={handleConnect}
      disabled={isConnecting}
      className="flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white font-medium transition-all duration-300 transform hover:scale-105"
      data-testid="button-connect-wallet"
    >
      <Wallet className="w-4 h-4" />
      <span>{isConnecting ? 'Connecting...' : 'Connect Wallet'}</span>
    </Button>
  );
}
