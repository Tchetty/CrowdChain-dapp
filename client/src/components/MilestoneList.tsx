import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatCurrency } from '@/lib/format';
import { CheckCircle, Clock, Vote, AlertCircle } from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  amount: string;
  status: 'pending' | 'voting' | 'completed' | 'failed';
  votes?: number;
  totalVotes?: number;
  description?: string;
}

interface MilestoneListProps {
  milestones: Milestone[];
  onVote?: (milestoneId: string) => void;
  showVoting?: boolean;
}

export function MilestoneList({ milestones, onVote, showVoting = true }: MilestoneListProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'voting':
        return <Vote className="w-5 h-5 text-blue-600" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'voting':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getProgressPercentage = (votes: number = 0, totalVotes: number = 1) => {
    return Math.min(100, (votes / totalVotes) * 100);
  };

  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <Card key={milestone.id} className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  {getStatusIcon(milestone.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 
                      className="text-lg font-semibold"
                      data-testid={`text-milestone-title-${milestone.id}`}
                    >
                      {milestone.title}
                    </h4>
                    <Badge className={getStatusColor(milestone.status)}>
                      {milestone.status.charAt(0).toUpperCase() + milestone.status.slice(1)}
                    </Badge>
                  </div>
                  {milestone.description && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {milestone.description}
                    </p>
                  )}
                  <div className="text-sm text-gray-500">
                    Milestone {index + 1} • {formatCurrency(milestone.amount)}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primary">
                  {formatCurrency(milestone.amount)}
                </div>
              </div>
            </div>

            {/* Voting Progress */}
            {milestone.status === 'voting' && milestone.votes !== undefined && milestone.totalVotes !== undefined && (
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span>Voting Progress</span>
                  <span>{milestone.votes} / {milestone.totalVotes} votes</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${getProgressPercentage(milestone.votes, milestone.totalVotes)}%` }}
                  />
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {Math.round(getProgressPercentage(milestone.votes, milestone.totalVotes))}% approval rate
                </div>
              </div>
            )}

            {/* Action Button */}
            {showVoting && milestone.status === 'voting' && onVote && (
              <div className="flex justify-end">
                <Button 
                  onClick={() => onVote(milestone.id)}
                  size="sm"
                  className="bg-primary hover:bg-primary-dark text-white"
                  data-testid={`button-vote-milestone-${milestone.id}`}
                >
                  <Vote className="w-4 h-4 mr-2" />
                  Vote on Release
                </Button>
              </div>
            )}

            {/* Completion Status */}
            {milestone.status === 'completed' && (
              <div className="flex items-center space-x-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Milestone completed and funds released</span>
              </div>
            )}

            {milestone.status === 'failed' && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>Milestone voting failed - funds not released</span>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
