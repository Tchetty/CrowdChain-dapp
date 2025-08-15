import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from './ProgressBar';
import { formatCurrency, formatTimeLeft, calculateProgress } from '@/lib/format';
import { useLocation } from 'wouter';

interface Campaign {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  raised: string;
  goal: string;
  endDate: string;
  status: 'active' | 'funding' | 'completed' | 'failed';
}

interface CampaignCardProps {
  campaign: Campaign;
  className?: string;
}

export function CampaignCard({ campaign, className }: CampaignCardProps) {
  const [, navigate] = useLocation();
  
  const progress = calculateProgress(campaign.raised, campaign.goal);
  const timeLeft = formatTimeLeft(campaign.endDate);
  
  const statusColors = {
    active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300',
    funding: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300',
    completed: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300',
    failed: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
  };

  const handleViewDetails = () => {
    navigate(`/campaigns/${campaign.id}`);
  };

  return (
    <Card 
      className={`campaign-card overflow-hidden transition-all duration-300 hover:shadow-lg ${className}`}
      data-testid={`card-campaign-${campaign.id}`}
    >
      <div className="relative">
        <img 
          src={campaign.image} 
          alt={campaign.title}
          className="w-full h-48 object-cover"
          data-testid={`img-campaign-${campaign.id}`}
        />
        <div className="absolute top-4 left-4">
          <Badge className={statusColors[campaign.status]}>
            {campaign.status}
          </Badge>
        </div>
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-700">
            {campaign.category}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6">
        <h3 
          className="text-xl font-semibold mb-2 line-clamp-2"
          data-testid={`text-title-${campaign.id}`}
        >
          {campaign.title}
        </h3>
        <p 
          className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3"
          data-testid={`text-description-${campaign.id}`}
        >
          {campaign.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span data-testid={`text-raised-${campaign.id}`}>
              {formatCurrency(campaign.raised)} raised
            </span>
            <span data-testid={`text-percentage-${campaign.id}`}>
              {Math.round(progress)}%
            </span>
          </div>
          <ProgressBar progress={progress} animate />
        </div>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            <span data-testid={`text-time-left-${campaign.id}`}>
              {timeLeft}
            </span>
          </div>
          <Button 
            onClick={handleViewDetails}
            className="bg-primary hover:bg-primary-dark text-white font-medium"
            data-testid={`button-view-${campaign.id}`}
          >
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
