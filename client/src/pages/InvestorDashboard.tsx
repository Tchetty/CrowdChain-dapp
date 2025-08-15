import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stat } from '@/components/Stat';
import { ProgressBar } from '@/components/ProgressBar';
import { useStore } from '@/lib/store';
import { useLocation } from 'wouter';
import { formatCurrency, formatDate } from '@/lib/format';
import { animations } from '@/lib/gsap';
import { 
  TrendingUp, 
  Users, 
  Target,
  PieChart,
  Activity,
  Vote,
  Star,
  Calendar,
  ExternalLink
} from 'lucide-react';

// Mock investor data
const mockInvestorData = {
  portfolio: {
    totalInvested: '45.2',
    currentValue: '52.8',
    totalReturns: '7.6',
    returnPercentage: 16.8,
    activeInvestments: 12,
    completedInvestments: 8,
    votingPower: '2,450'
  },
  investments: [
    {
      id: '1',
      title: 'ChainLink DeFi',
      category: 'DeFi',
      invested: '5.0',
      currentValue: '6.2',
      returns: '1.2',
      status: 'active',
      progress: 75,
      image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200'
    },
    {
      id: '2',
      title: 'ArtChain Gallery',
      category: 'NFT',
      invested: '3.5',
      currentValue: '4.1',
      returns: '0.6',
      status: 'active',
      progress: 47,
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200'
    },
    {
      id: '3',
      title: 'MetaVerse Worlds',
      category: 'GameFi',
      invested: '2.0',
      currentValue: '2.3',
      returns: '0.3',
      status: 'active',
      progress: 25,
      image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200'
    },
    {
      id: '4',
      title: 'DeFi Lending Protocol',
      category: 'DeFi',
      invested: '8.0',
      currentValue: '12.4',
      returns: '4.4',
      status: 'completed',
      progress: 100,
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200'
    }
  ],
  votes: [
    { id: '1', proposal: 'Platform Fee Reduction', campaign: 'ChainLink DeFi', vote: 'for', date: '2024-01-15' },
    { id: '2', proposal: 'Milestone Release #2', campaign: 'ArtChain Gallery', vote: 'for', date: '2024-01-12' },
    { id: '3', proposal: 'Marketing Budget Approval', campaign: 'MetaVerse Worlds', vote: 'against', date: '2024-01-10' }
  ],
  watchlist: [
    { id: '5', title: 'SocialFi Network', category: 'SocialFi', goal: '50.0', raised: '33.8' },
    { id: '6', title: 'Cross-Chain Bridge', category: 'Infrastructure', goal: '75.0', raised: '28.2' }
  ]
};

export default function InvestorDashboard() {
  const [, navigate] = useLocation();
  const { isConnected } = useStore();

  useEffect(() => {
    animations.staggerCards('.dashboard-card', 0.1);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <PieChart className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to connect your wallet to access your investor dashboard.
            </p>
            <Button 
              onClick={() => navigate('/')}
              className="bg-primary hover:bg-primary-dark text-white"
              data-testid="button-go-home"
            >
              Go to Home Page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              Investor Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your investments and portfolio performance
            </p>
          </div>
          <Button 
            onClick={() => navigate('/campaigns')}
            className="bg-primary hover:bg-primary-dark text-white"
            data-testid="button-explore-campaigns"
          >
            Explore Campaigns
          </Button>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Stat
            icon={TrendingUp}
            label="Total Invested"
            value={formatCurrency(mockInvestorData.portfolio.totalInvested)}
            className="dashboard-card"
          />
          <Stat
            icon={PieChart}
            label="Current Value"
            value={formatCurrency(mockInvestorData.portfolio.currentValue)}
            className="dashboard-card"
          />
          <Stat
            icon={Target}
            label="Total Returns"
            value={`${formatCurrency(mockInvestorData.portfolio.totalReturns)} (+${mockInvestorData.portfolio.returnPercentage}%)`}
            className="dashboard-card"
          />
          <Stat
            icon={Vote}
            label="Voting Power"
            value={mockInvestorData.portfolio.votingPower}
            className="dashboard-card"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Investments</span>
                  <Badge variant="secondary">
                    {mockInvestorData.portfolio.activeInvestments} Active
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockInvestorData.investments.map((investment) => (
                  <div 
                    key={investment.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <img 
                          src={investment.image}
                          alt={investment.title}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <h3 
                            className="text-lg font-semibold mb-1"
                            data-testid={`text-investment-title-${investment.id}`}
                          >
                            {investment.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="secondary">{investment.category}</Badge>
                            <Badge className={
                              investment.status === 'active' 
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                            }>
                              {investment.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/campaigns/${investment.id}`)}
                        data-testid={`button-view-investment-${investment.id}`}
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {formatCurrency(investment.invested)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Invested</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">
                          {formatCurrency(investment.currentValue)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Current Value</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-bold ${
                          parseFloat(investment.returns) > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {parseFloat(investment.returns) > 0 ? '+' : ''}{formatCurrency(investment.returns)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Returns</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-primary">{investment.progress}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Progress</div>
                      </div>
                    </div>

                    <ProgressBar progress={investment.progress} animate />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Voting History */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Votes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvestorData.votes.map((vote) => (
                    <div key={vote.id} className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-b-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="text-sm font-medium">{vote.proposal}</div>
                        <Badge className={
                          vote.vote === 'for' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }>
                          {vote.vote}
                        </Badge>
                      </div>
                      <div className="text-xs text-gray-500">
                        {vote.campaign} • {formatDate(vote.date)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Watchlist */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="w-5 h-5" />
                  <span>Watchlist</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockInvestorData.watchlist.map((item) => (
                    <div 
                      key={item.id}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      onClick={() => navigate(`/campaigns/${item.id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium">{item.title}</h4>
                        <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {formatCurrency(item.raised)} / {formatCurrency(item.goal)}
                      </div>
                      <ProgressBar 
                        progress={(parseFloat(item.raised) / parseFloat(item.goal)) * 100}
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Investments:</span>
                  <span className="font-medium">{mockInvestorData.portfolio.activeInvestments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Completed:</span>
                  <span className="font-medium">{mockInvestorData.portfolio.completedInvestments}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Success Rate:</span>
                  <span className="font-medium text-green-600">
                    {Math.round((mockInvestorData.portfolio.completedInvestments / 
                    (mockInvestorData.portfolio.activeInvestments + mockInvestorData.portfolio.completedInvestments)) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Avg. Return:</span>
                  <span className="font-medium text-green-600">+{mockInvestorData.portfolio.returnPercentage}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
