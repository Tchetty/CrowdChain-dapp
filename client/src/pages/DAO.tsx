import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { VoteDialog } from '@/components/VoteDialog';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { animations } from '@/lib/gsap';
import { 
  Vote, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Plus,
  TrendingUp,
  Calendar
} from 'lucide-react';

// Mock proposals data
const mockProposals = [
  {
    id: '1',
    title: 'Reduce Platform Fees from 3% to 2%',
    description: 'Proposal to reduce platform fees to make the platform more competitive and attract more projects.',
    category: 'Economic',
    status: 'passed',
    votes: {
      for: 1247,
      against: 78,
      total: 1325
    },
    endDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    proposer: '0x1234567890123456789012345678901234567890',
    requiredQuorum: 1000,
    executionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    title: 'Allocate Funds for Mobile App Development',
    description: 'Proposal to allocate 50 ETH from the treasury for developing native mobile applications for iOS and Android.',
    category: 'Development',
    status: 'active',
    votes: {
      for: 892,
      against: 234,
      total: 1126
    },
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    proposer: '0x2345678901234567890123456789012345678901',
    requiredQuorum: 1000,
    executionDate: null
  },
  {
    id: '3',
    title: 'Implement Staking Rewards Program',
    description: 'Create a staking program where token holders can stake their tokens to earn rewards and increase their voting power.',
    category: 'Tokenomics',
    status: 'active',
    votes: {
      for: 567,
      against: 123,
      total: 690
    },
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    proposer: '0x3456789012345678901234567890123456789012',
    requiredQuorum: 1000,
    executionDate: null
  },
  {
    id: '4',
    title: 'Partnership with Major DeFi Protocol',
    description: 'Proposal to establish a strategic partnership with a major DeFi protocol to increase platform adoption.',
    category: 'Partnership',
    status: 'failed',
    votes: {
      for: 432,
      against: 876,
      total: 1308
    },
    endDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    proposer: '0x4567890123456789012345678901234567890123',
    requiredQuorum: 1000,
    executionDate: null
  }
];

const daoStats = {
  totalProposals: 47,
  activeProposals: 12,
  totalVoters: 2834,
  treasuryBalance: '1,247.5 ETH',
  votingPower: '2,450 votes'
};

export default function DAO() {
  const { isConnected } = useStore();
  const { toast } = useToast();
  const [selectedProposal, setSelectedProposal] = useState<string | null>(null);
  const [isVoteDialogOpen, setIsVoteDialogOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newProposal, setNewProposal] = useState({
    title: '',
    description: '',
    category: 'General'
  });

  useEffect(() => {
    animations.staggerCards('.proposal-card', 0.1);
  }, []);

  const handleVote = (proposalId: string) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to vote on proposals.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedProposal(proposalId);
    setIsVoteDialogOpen(true);
  };

  const handleCreateProposal = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to create proposals.',
        variant: 'destructive',
      });
      return;
    }

    if (!newProposal.title || !newProposal.description) {
      toast({
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // In real app: call smart contract createProposal function
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: 'Proposal Created',
        description: 'Your proposal has been submitted and is now open for voting.',
      });
      
      setIsCreateModalOpen(false);
      setNewProposal({ title: '', description: '', category: 'General' });
    } catch (error) {
      toast({
        title: 'Creation Failed',
        description: 'Failed to create proposal. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'failed':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'active':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <Vote className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      case 'active':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            DAO Governance
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Participate in decentralized decision-making and help shape the future of Crowdchain.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{daoStats.totalProposals}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Proposals</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{daoStats.activeProposals}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{daoStats.totalVoters}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Total Voters</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{daoStats.treasuryBalance}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Treasury</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{daoStats.votingPower}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Your Power</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Proposals</h2>
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-primary hover:bg-primary-dark text-white flex items-center space-x-2"
            data-testid="button-create-proposal"
          >
            <Plus className="w-4 h-4" />
            <span>Create Proposal</span>
          </Button>
        </div>

        {/* Proposals List */}
        <div className="space-y-6">
          {mockProposals.map((proposal) => (
            <Card key={proposal.id} className="proposal-card">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      {getStatusIcon(proposal.status)}
                      <Badge className={getStatusColor(proposal.status)}>
                        {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                      </Badge>
                      <Badge variant="secondary">{proposal.category}</Badge>
                    </div>
                    <h3 
                      className="text-xl font-semibold mb-2"
                      data-testid={`text-proposal-title-${proposal.id}`}
                    >
                      {proposal.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {proposal.description}
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Voting Results */}
                  <div>
                    <h4 className="font-medium mb-3">Voting Results</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-green-600">For</span>
                        <span className="font-medium">{proposal.votes.for.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: `${(proposal.votes.for / proposal.votes.total) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-red-600">Against</span>
                        <span className="font-medium">{proposal.votes.against.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: `${(proposal.votes.against / proposal.votes.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Proposal Info */}
                  <div>
                    <h4 className="font-medium mb-3">Proposal Info</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Total Votes:</span>
                        <span>{proposal.votes.total.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Quorum:</span>
                        <span>{proposal.requiredQuorum.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">Status:</span>
                        <span className={
                          proposal.votes.total >= proposal.requiredQuorum 
                            ? 'text-green-600' 
                            : 'text-yellow-600'
                        }>
                          {proposal.votes.total >= proposal.requiredQuorum ? 'Quorum Met' : 'Quorum Needed'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h4 className="font-medium mb-3">Actions</h4>
                    {proposal.status === 'active' ? (
                      <Button 
                        onClick={() => handleVote(proposal.id)}
                        className="w-full bg-primary hover:bg-primary-dark text-white"
                        data-testid={`button-vote-${proposal.id}`}
                      >
                        <Vote className="w-4 h-4 mr-2" />
                        Vote
                      </Button>
                    ) : (
                      <div className="text-center">
                        <Badge className={getStatusColor(proposal.status)}>
                          Voting Ended
                        </Badge>
                        {proposal.status === 'passed' && proposal.executionDate && (
                          <div className="text-xs text-gray-500 mt-2">
                            Executes: {new Date(proposal.executionDate).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Create Proposal Modal */}
        {isCreateModalOpen && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-lg">
              <CardHeader>
                <CardTitle>Create New Proposal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="proposalTitle">Title</Label>
                  <Input
                    id="proposalTitle"
                    value={newProposal.title}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter proposal title..."
                    data-testid="input-proposal-title"
                  />
                </div>
                <div>
                  <Label htmlFor="proposalDescription">Description</Label>
                  <Textarea
                    id="proposalDescription"
                    value={newProposal.description}
                    onChange={(e) => setNewProposal(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your proposal in detail..."
                    rows={4}
                    data-testid="textarea-proposal-description"
                  />
                </div>
                <div className="flex space-x-3">
                  <Button 
                    onClick={handleCreateProposal}
                    className="flex-1 bg-primary hover:bg-primary-dark text-white"
                    data-testid="button-submit-proposal"
                  >
                    Create Proposal
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setIsCreateModalOpen(false)}
                    data-testid="button-cancel-proposal"
                  >
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Vote Dialog */}
      <VoteDialog
        isOpen={isVoteDialogOpen}
        onClose={() => setIsVoteDialogOpen(false)}
        proposalId={selectedProposal}
      />
    </div>
  );
}
