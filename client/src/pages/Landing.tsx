import { ParallaxHero } from '@/components/ParallaxHero';
import { CampaignCard } from '@/components/CampaignCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocation } from 'wouter';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  UserPlus, 
  Users, 
  CheckCircle, 
  TrendingUp, 
  PieChart,
  Check
} from 'lucide-react';

export default function Landing() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  // Mock featured campaigns data
  const featuredCampaigns = [
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
    }
  ];

  const heroStats = {
    totalRaised: '$2.4M',
    campaigns: 127,
    backers: '3.2K',
    successRate: '94%'
  };

  const blogPosts = [
    {
      id: '1',
      title: 'The Future of Decentralized Finance',
      excerpt: 'Exploring emerging trends in DeFi protocols and their impact on traditional finance...',
      category: 'DeFi Trends',
      image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      date: 'Dec 15, 2024'
    },
    {
      id: '2',
      title: 'Building Successful Web3 Startups',
      excerpt: 'Essential strategies for launching and scaling your blockchain-based startup...',
      category: 'Startup Guide',
      image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      date: 'Dec 12, 2024'
    },
    {
      id: '3',
      title: 'Effective DAO Governance Models',
      excerpt: 'Best practices for implementing decentralized governance in your organization...',
      category: 'DAO Governance',
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400',
      date: 'Dec 10, 2024'
    }
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast({
        title: 'Subscribed!',
        description: 'You have been successfully subscribed to our newsletter.',
      });
      setEmail('');
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <ParallaxHero
        title="Crowdchain"
        subtitle="The future of Web3 crowdfunding. Connect startups with communities, investors, and mentors through decentralized governance."
        stats={heroStats}
      />

      {/* Featured Campaigns */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Campaigns
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discover innovative Web3 startups seeking funding from our community
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredCampaigns.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          
          <div className="text-center">
            <Button 
              variant="outline"
              size="lg"
              onClick={() => navigate('/campaigns')}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 font-semibold transition-all duration-300"
              data-testid="button-view-all-campaigns"
            >
              View All Campaigns
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              How Crowdchain Works
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A transparent, decentralized approach to crowdfunding
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Create Campaign</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Launch your Web3 startup with detailed milestones, funding goals, and transparent roadmaps.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community Funding</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Receive funding from our global community of investors and Web3 enthusiasts.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">DAO Governance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Community votes on milestone releases, ensuring accountability and project success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DAO Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Decentralized Governance
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Our DAO ensures transparent decision-making for milestone releases, platform improvements, and community initiatives.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-gray-600 dark:text-gray-400">Active Proposals</div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
                  <div className="text-2xl font-bold text-primary">2.8K</div>
                  <div className="text-gray-600 dark:text-gray-400">Active Voters</div>
                </div>
              </div>
              
              <Button 
                onClick={() => navigate('/dao')}
                className="bg-primary hover:bg-primary-dark text-white px-8 py-3 font-semibold"
                data-testid="button-view-dao"
              >
                View DAO Proposals
              </Button>
            </div>
            
            <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl">
              <h3 className="text-xl font-semibold mb-6">Recent Proposals</h3>
              
              <div className="space-y-4">
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Platform Fee Reduction</h4>
                    <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                      Passed
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Reduce platform fees from 3% to 2% for all campaigns
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>1,247 votes</span>
                    <span>94% support</span>
                  </div>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Mobile App Development</h4>
                    <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                      Active
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Allocate funds for native mobile applications
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>892 votes</span>
                    <span>78% support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Powerful Dashboards
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Comprehensive tools for both startups and investors
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <Card className="p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Startup Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400">Manage campaigns and track progress</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Total Raised</span>
                    <span className="font-semibold text-primary">127.5 ETH</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Active Campaigns</span>
                    <span className="font-semibold">3</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Pending Milestones</span>
                    <span className="font-semibold">2</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/dashboard/startup')}
                  className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 font-semibold"
                  data-testid="button-startup-dashboard"
                >
                  View Startup Dashboard
                </Button>
              </CardContent>
            </Card>
            
            <Card className="p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <CardContent className="p-0">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mr-4">
                    <PieChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Investor Dashboard</h3>
                    <p className="text-gray-600 dark:text-gray-400">Track investments and returns</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Portfolio Value</span>
                    <span className="font-semibold text-primary">45.2 ETH</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Backed Projects</span>
                    <span className="font-semibold">12</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <span>Voting Power</span>
                    <span className="font-semibold">2,450 votes</span>
                  </div>
                </div>
                
                <Button 
                  onClick={() => navigate('/dashboard/investor')}
                  className="w-full mt-6 bg-primary hover:bg-primary-dark text-white py-3 font-semibold"
                  data-testid="button-investor-dashboard"
                >
                  View Investor Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentorship Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional mentorship meeting" 
              className="rounded-2xl shadow-lg w-full h-auto"
            />
            
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Expert Mentorship
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Connect with experienced Web3 professionals, blockchain experts, and successful entrepreneurs to accelerate your startup journey.
              </p>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">1-on-1 Guidance</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Personalized mentorship sessions with industry leaders
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Resource Library</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Access to exclusive educational content and tools
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center mt-1">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Community Network</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Connect with fellow entrepreneurs and potential partners
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Button 
                  onClick={() => navigate('/mentorship')}
                  className="bg-primary hover:bg-primary-dark text-white px-6 py-3 font-semibold"
                  data-testid="button-apply-mentee"
                >
                  Apply as Mentee
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => navigate('/mentorship')}
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-3 font-semibold"
                  data-testid="button-become-mentor"
                >
                  Become a Mentor
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter & Blog */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Stay Informed
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Latest insights, trends, and updates from the Web3 ecosystem
            </p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
                <img 
                  src={post.image}
                  alt={post.title} 
                  className="w-full h-48 object-cover"
                />
                <CardContent className="p-6">
                  <div className="text-sm text-primary mb-2">{post.category}</div>
                  <h3 className="text-xl font-semibold mb-3">{post.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{post.date}</span>
                    <Button variant="link" className="text-primary hover:text-primary-dark p-0">
                      Read More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {/* Newsletter Signup */}
          <div className="bg-primary rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
            <p className="mb-6 opacity-90">Get the latest Web3 insights delivered to your inbox</p>
            
            <form 
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto flex gap-4"
              data-testid="form-newsletter"
            >
              <Input 
                type="email" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white text-gray-900 focus:ring-white/50" 
                required 
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="bg-white text-primary px-6 py-3 font-semibold hover:bg-gray-100"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
