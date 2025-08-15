import { useState, useEffect } from 'react';
import { useRoute } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ProgressBar } from '@/components/ProgressBar';
import { MilestoneList } from '@/components/MilestoneList';
import { VoteDialog } from '@/components/VoteDialog';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/lib/store';
import { formatCurrency, formatTimeLeft, calculateProgress, formatAddress } from '@/lib/format';
import { animations } from '@/lib/gsap';
import { 
  Share2, 
  Users, 
  Calendar, 
  Target, 
  TrendingUp,
  ExternalLink,
  Copy,
  Heart,
  MessageCircle
} from 'lucide-react';

// Mock campaign data - in real app this would come from smart contract
const mockCampaign = {
  id: '1',
  title: 'ChainLink DeFi Protocol',
  description: 'Next-generation cross-chain asset management protocol with automated yield optimization and advanced risk management features.',
  category: 'DeFi',
  image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600',
  creator: '0x1234567890123456789012345678901234567890',
  raised: '45.2',
  goal: '60.0',
  backers: 127,
  endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
  status: 'active' as const,
  milestones: [
    { id: '1', title: 'Smart Contract Development', amount: '15.0', status: 'completed' as const, votes: 45, totalVotes: 60 },
    { id: '2', title: 'Security Audit', amount: '20.0', status: 'voting' as const, votes: 32, totalVotes: 60 },
    { id: '3', title: 'Frontend Development', amount: '15.0', status: 'pending' as const, votes: 0, totalVotes: 60 },
    { id: '4', title: 'Marketing & Launch', amount: '10.0', status: 'pending' as const, votes: 0, totalVotes: 60 }
  ],
  updates: [
    { id: '1', title: 'Development Update #3', content: 'Smart contracts are now complete and deployed to testnet...', date: '2024-01-15' },
    { id: '2', title: 'Security Audit Started', content: 'We have begun the comprehensive security audit with CertiK...', date: '2024-01-10' }
  ]
};

export default function CampaignDetail() {
  const [match, params] = useRoute('/campaigns/:id');
  const { toast } = useToast();
  const { isConnected } = useStore();
  const [pledgeAmount, setPledgeAmount] = useState('');
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [isPledging, setIsPledging] = useState(false);

  const campaignId = params?.id;
  const progress = calculateProgress(mockCampaign.raised, mockCampaign.goal);
  const timeLeft = formatTimeLeft(mockCampaign.endDate);

  useEffect(() => {
    // Animate elements on page load
    animations.staggerCards('.detail-card', 0.1);
  }, []);

  const handlePledge = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to pledge to this campaign.',
        variant: 'destructive',
      });
      return;
    }

    if (!pledgeAmount || parseFloat(pledgeAmount) <= 0) {
      toast({
        title: 'Invalid Amount',
        description: 'Please enter a valid pledge amount.',
        variant: 'destructive',
      });
      return;
    }

    setIsPledging(true);
    try {
      // In real app: call smart contract pledge function
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate transaction
      
      toast({
        title: 'Pledge Successful!',
        description: `Successfully pledged ${pledgeAmount} ETH to this campaign.`,
      });
      
      setPledgeAmount('');
      // Animate progress bar update
      animations.progressBar('.pledge-progress', progress + (parseFloat(pledgeAmount) / parseFloat(mockCampaign.goal)) * 100);
    } catch (error) {
      toast({
        title: 'Pledge Failed',
        description: 'There was an error processing your pledge. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsPledging(false);
    }
  };

  const handleVote = (milestoneId: string) => {
    setSelectedMilestone(milestoneId);
    setIsVoteDialogOpen(true);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: mockCampaign.title,
          text: mockCampaign.description,
          url: window.location.href,
        });
      } catch (error) {
        // Fallback to clipboard
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: 'Link Copied',
          description: 'Campaign link has been copied to your clipboard.',
        });
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      toast({
        title: 'Link Copied',
        description: 'Campaign link has been copied to your clipboard.',
      });
    }
  };

  if (!match) {
    return <div>Campaign not found</div>;
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="detail-card mb-8">
          <div className="relative rounded-2xl overflow-hidden mb-6">
            <img 
              src={mockCampaign.image} 
              alt={mockCampaign.title}
              className="w-full h-64 md:h-80 object-cover"
              data-testid="img-campaign-hero"
            />
            <div className="absolute top-6 left-6">
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                {mockCampaign.status}
              </Badge>
            </div>
            <div className="absolute top-6 right-6 flex space-x-2">
              <Button
                size="sm"
                variant="secondary"
                onClick={handleShare}
                className="bg-white/90 text-gray-700 hover:bg-white"
                data-testid="button-share"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 
                    className="text-4xl font-bold text-gray-900 dark:text-white mb-2"
                    data-testid="text-campaign-title"
                  >
                    {mockCampaign.title}
                  </h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    by <span className="font-medium">{formatAddress(mockCampaign.creator)}</span>
                  </p>
                </div>
                <Badge variant="secondary">{mockCampaign.category}</Badge>
              </div>

              <p 
                className="text-lg text-gray-700 dark:text-gray-300 mb-8"
                data-testid="text-campaign-description"
              >
                {mockCampaign.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(mockCampaign.raised)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Raised</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Target className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        {formatCurrency(mockCampaign.goal)}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Goal</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Users className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        {mockCampaign.backers}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Backers</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-5 h-5 text-primary mr-2" />
                      <span className="text-2xl font-bold text-primary">
                        {timeLeft.split(' ')[0]}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Days Left</div>
                  </CardContent>
                </Card>
              </div>

              {/* Milestones */}
              <Card className="detail-card">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-6">Project Milestones</h3>
                  <MilestoneList 
                    milestones={mockCampaign.milestones}
                    onVote={handleVote}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Pledge Widget */}
            <div className="lg:col-span-1">
              <Card className="detail-card sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <ProgressBar 
                      progress={progress} 
                      animate 
                      className="pledge-progress mb-4"
                    />
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {formatCurrency(mockCampaign.raised)}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        of {formatCurrency(mockCampaign.goal)} goal
                      </div>
                    </div>
                  </div>

                  {/* Pledge Form */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="pledgeAmount">Pledge Amount (ETH)</Label>
                      <Input
                        id="pledgeAmount"
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="0.1"
                        value={pledgeAmount}
                        onChange={(e) => setPledgeAmount(e.target.value)}
                        disabled={!isConnected}
                        data-testid="input-pledge-amount"
                      />
                    </div>
                    
                    <Button 
                      onClick={handlePledge}
                      disabled={!isConnected || isPledging || !pledgeAmount}
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3"
                      data-testid="button-pledge"
                    >
                      {isPledging ? 'Processing...' : isConnected ? 'Pledge Now' : 'Connect Wallet to Pledge'}
                    </Button>

                    {/* Quick Pledge Buttons */}
                    <div className="grid grid-cols-3 gap-2">
                      {['0.1', '0.5', '1.0'].map((amount) => (
                        <Button
                          key={amount}
                          variant="outline"
                          size="sm"
                          onClick={() => setPledgeAmount(amount)}
                          disabled={!isConnected}
                          data-testid={`button-quick-pledge-${amount}`}
                        >
                          {amount} ETH
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div className="text-sm text-gray-600 dark:text-gray-400 space-y-2">
                      <div className="flex justify-between">
                        <span>Campaign ends:</span>
                        <span>{timeLeft}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Funding type:</span>
                        <span>All-or-nothing</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Vote Dialog */}
      <VoteDialog
        isOpen={isVoteDialogOpen}
        onClose={() => setIsVoteDialogOpen(false)}
        milestoneId={selectedMilestone}
        campaignId={campaignId}
      />
    </div>
  );
}
