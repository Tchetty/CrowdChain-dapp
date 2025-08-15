import { ethers } from 'ethers';

export function formatEther(value: bigint | string): string {
  return ethers.formatEther(value);
}

export function parseEther(value: string): bigint {
  return ethers.parseEther(value);
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatNumber(num: number | string): string {
  const value = typeof num === 'string' ? parseFloat(num) : num;
  
  if (value >= 1e9) {
    return `${(value / 1e9).toFixed(1)}B`;
  } else if (value >= 1e6) {
    return `${(value / 1e6).toFixed(1)}M`;
  } else if (value >= 1e3) {
    return `${(value / 1e3).toFixed(1)}K`;
  }
  
  return value.toFixed(2);
}

export function formatCurrency(amount: string | number, currency = 'ETH'): string {
  const num = typeof amount === 'string' ? parseFloat(amount) : amount;
  return `${formatNumber(num)} ${currency}`;
}

export function formatDate(date: Date | string | number): string {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}

export function formatTimeLeft(endDate: Date | string | number): string {
  const now = Date.now();
  const end = new Date(endDate).getTime();
  const diff = end - now;

  if (diff <= 0) {
    return 'Campaign ended';
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) {
    return `${days} day${days > 1 ? 's' : ''} left`;
  } else if (hours > 0) {
    return `${hours} hour${hours > 1 ? 's' : ''} left`;
  } else {
    return 'Less than 1 hour left';
  }
}

export function calculateProgress(current: string | number, target: string | number): number {
  const curr = typeof current === 'string' ? parseFloat(current) : current;
  const targ = typeof target === 'string' ? parseFloat(target) : target;
  
  if (targ === 0) return 0;
  
  return Math.min(100, (curr / targ) * 100);
}

export function formatPercentage(value: number): string {
  return `${Math.round(value)}%`;
}
