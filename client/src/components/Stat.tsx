import { Card, CardContent } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatProps {
  icon: LucideIcon;
  label: string;
  value: string;
  className?: string;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
}

export function Stat({ icon: Icon, label, value, className, trend }: StatProps) {
  return (
    <Card className={cn("transition-all duration-300 hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-baseline space-x-2">
              <div 
                className="text-2xl font-bold text-gray-900 dark:text-white"
                data-testid={`stat-value-${label.toLowerCase().replace(/\s+/g, '-')}`}
              >
                {value}
              </div>
              {trend && (
                <div className={`text-sm font-medium ${
                  trend.direction === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {trend.direction === 'up' ? '+' : '-'}{trend.value}
                </div>
              )}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">{label}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
