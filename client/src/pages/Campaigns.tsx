import { useState, useEffect } from 'react';
import { CampaignCard } from '@/components/CampaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { Search, Filter, Plus } from 'lucide-react';
import { useLocation } from 'wouter';
import { animations } from '@/lib/gsap';

// Mock campaigns data
const mockCampaigns = [
  {
    id: '1',
    title: 'ChainLink DeFi',
    description: 'Next-generation cross-chain asset management protocol with automated yield optimization.',
    category: 'DeFi',
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '45.2',
    goal: '60.0',
    endDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active' as const
  },
  {
    id: '2',
    title: 'ArtChain Gallery',
    description: 'Revolutionary NFT marketplace connecting artists with collectors through immersive virtual galleries.',
    category: 'NFT',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '28.7',
    goal: '60.0',
    endDate: new Date(Date.now() + 24 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'funding' as const
  },
  {
    id: '3',
    title: 'MetaVerse Worlds',
    description: 'Play-to-earn gaming ecosystem with interconnected virtual worlds and tokenized assets.',
    category: 'GameFi',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '15.3',
    goal: '60.0',
    endDate: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'funding' as const
  },
  {
    id: '4',
    title: 'EcoChain Carbon Credits',
    description: 'Blockchain-based carbon credit marketplace for sustainable business practices.',
    category: 'Sustainability',
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '72.1',
    goal: '80.0',
    endDate: new Date(Date.now() + 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active' as const
  },
  {
    id: '5',
    title: 'DecenTrade Exchange',
    description: 'Decentralized trading platform with advanced order types and cross-chain swaps.',
    category: 'Trading',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '91.5',
    goal: '100.0',
    endDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'active' as const
  },
  {
    id: '6',
    title: 'SocialFi Network',
    description: 'Tokenized social media platform where creators earn from their content and engagement.',
    category: 'SocialFi',
    image: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
    raised: '33.8',
    goal: '50.0',
    endDate: new Date(Date.now() + 18 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'funding' as const
  }
];

export default function Campaigns() {
  const [, navigate] = useLocation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [campaigns, setCampaigns] = useState(mockCampaigns);

  useEffect(() => {
    // Animate campaign cards on load
    setTimeout(() => {
      animations.staggerCards('.campaign-card');
    }, 100);
  }, [campaigns]);

  // Filter campaigns based on search and filters
  const filteredCampaigns = campaigns.filter((campaign) => {
    const matchesSearch = campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || campaign.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || campaign.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ['all', ...Array.from(new Set(campaigns.map(c => c.category)))];
  const statuses = ['all', 'active', 'funding', 'completed', 'failed'];

  const handleCreateCampaign = () => {
    navigate('/create-campaign');
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              All Campaigns
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Discover and support innovative Web3 projects
            </p>
          </div>
          <Button 
            onClick={handleCreateCampaign}
            className="bg-primary hover:bg-primary-dark text-white px-6 py-3 font-semibold flex items-center space-x-2"
            data-testid="button-create-campaign"
          >
            <Plus className="w-4 h-4" />
            <span>Create Campaign</span>
          </Button>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search-campaigns"
                />
              </div>

              {/* Category Filter */}
              <div className="md:w-48">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger data-testid="select-category">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === 'all' ? 'All Categories' : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Status Filter */}
              <div className="md:w-48">
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger data-testid="select-status">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{campaigns.length}</div>
              <div className="text-gray-600 dark:text-gray-400">Total Campaigns</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {campaigns.filter(c => c.status === 'active').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {campaigns.filter(c => c.status === 'funding').length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">Funding</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">
                {campaigns.reduce((sum, c) => sum + parseFloat(c.raised), 0).toFixed(1)} ETH
              </div>
              <div className="text-gray-600 dark:text-gray-400">Total Raised</div>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCampaigns.map((campaign) => (
              <CampaignCard 
                key={campaign.id} 
                campaign={campaign}
                className="opacity-0 transform translate-y-4"
              />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <Filter className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No campaigns found</h3>
              <p>Try adjusting your search criteria or filters.</p>
            </div>
            <Button 
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
}
