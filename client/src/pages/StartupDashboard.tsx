import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Stat } from '@/components/Stat';
import { ProgressBar } from '@/components/ProgressBar';
import { useStore } from '@/lib/store';
import { useLocation } from 'wouter';
import { useToast } from '@/hooks/use-toast';
import { formatCurrency, formatTimeLeft } from '@/lib/format';
import { animations } from '@/lib/gsap';
import { 
  Plus, 
  TrendingUp, 
  Users, 
  Calendar, 
  Target,
  Settings,
  FileText,
  Upload,
  BarChart3,
  Clock
} from 'lucide-react';

// Mock startup data
const mockStartupData = {
  campaigns: [
    {
      id: '1',
      title: 'ChainLink DeFi Protocol',
      status: 'active',
      raised: '45.2',
      goal: '60.0',
      backers: 127,
      endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
      milestones: {
        total: 4,
        completed: 1,
        pending: 2,
        voting: 1
      }
    },
    {
      id: '2',
      title: 'Mobile DeFi Wallet',
      status: 'funding',
      raised: '28.7',
      goal: '50.0',
      backers: 89,
      endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000).toISOString(),
      milestones: {
        total: 3,
        completed: 0,
        pending: 3,
        voting: 0
      }
    }
  ],
  totalStats: {
    totalRaised: '73.9',
    totalBackers: 216,
    activeCampaigns: 2,
    successRate: '100'
  },
  recentActivity: [
    { type: 'pledge', amount: '2.5', campaign: 'ChainLink DeFi', date: '2 hours ago' },
    { type: 'milestone', title: 'Smart Contract Audit Complete', campaign: 'ChainLink DeFi', date: '1 day ago' },
    { type: 'pledge', amount: '1.0', campaign: 'Mobile DeFi Wallet', date: '2 days ago' },
    { type: 'update', title: 'Development Progress Update', campaign: 'ChainLink DeFi', date: '3 days ago' }
  ]
};

export default function StartupDashboard() {
  const [, navigate] = useLocation();
  const { isConnected } = useStore();
  const { toast } = useToast();

  useEffect(() => {
    animations.staggerCards('.dashboard-card', 0.1);
  }, []);

  if (!isConnected) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Connect Your Wallet</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You need to connect your wallet to access your startup dashboard.
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
              Startup Dashboard
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Manage your campaigns and track progress
            </p>
          </div>
          <Button 
            onClick={() => navigate('/create-campaign')}
            className="bg-primary hover:bg-primary-dark text-white flex items-center space-x-2"
            data-testid="button-create-campaign"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Stat
            icon={TrendingUp}
            label="Total Raised"
            value={`${formatCurrency(mockStartupData.totalStats.totalRaised)}`}
            className="dashboard-card"
          />
          <Stat
            icon={Users}
            label="Total Backers"
            value={mockStartupData.totalStats.totalBackers.toString()}
            className="dashboard-card"
          />
          <Stat
            icon={Target}
            label="Active Campaigns"
            value={mockStartupData.totalStats.activeCampaigns.toString()}
            className="dashboard-card"
          />
          <Stat
            icon={BarChart3}
            label="Success Rate"
            value={`${mockStartupData.totalStats.successRate}%`}
            className="dashboard-card"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Active Campaigns */}
          <div className="lg:col-span-2">
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Your Campaigns</span>
                  <Badge variant="secondary">{mockStartupData.campaigns.length} Active</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {mockStartupData.campaigns.map((campaign) => (
                  <div 
                    key={campaign.id}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 
                          className="text-lg font-semibold mb-1"
                          data-testid={`text-campaign-title-${campaign.id}`}
                        >
                          {campaign.title}
                        </h3>
                        <Badge className={
                          campaign.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                        }>
                          {campaign.status}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => navigate(`/campaigns/${campaign.id}`)}
                        data-testid={`button-view-campaign-${campaign.id}`}
                      >
                        View Campaign
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {formatCurrency(campaign.raised)}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Raised</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{campaign.backers}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Backers</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                          {formatTimeLeft(campaign.endDate).split(' ')[0]}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">Days Left</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{Math.round((parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100)}%</span>
                      </div>
                      <ProgressBar 
                        progress={(parseFloat(campaign.raised) / parseFloat(campaign.goal)) * 100}
                        animate
                      />
                    </div>

                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-green-600">{campaign.milestones.completed}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Completed</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-600">{campaign.milestones.voting}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Voting</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-yellow-600">{campaign.milestones.pending}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Pending</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-gray-600">{campaign.milestones.total}</div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">Total</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/create-campaign')}
                  data-testid="button-quick-create"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Campaign
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-upload-update"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Project Update
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-manage-milestones"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Milestones
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  data-testid="button-view-analytics"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockStartupData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'pledge' ? 'bg-green-500' :
                        activity.type === 'milestone' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">
                          {activity.type === 'pledge' && `New pledge of ${activity.amount} ETH`}
                          {activity.type === 'milestone' && activity.title}
                          {activity.type === 'update' && activity.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {activity.campaign} • {activity.date}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Resources */}
            <Card className="dashboard-card">
              <CardHeader>
                <CardTitle>Resources</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <FileText className="w-4 h-4 mr-2" />
                  Campaign Guidelines
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Community Support
                </Button>
                <Button variant="ghost" className="w-full justify-start" size="sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Success Tips
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
