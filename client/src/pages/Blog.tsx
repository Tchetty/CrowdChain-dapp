import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatDate } from '@/lib/format';
import { Search, Calendar, User, ArrowRight, BookOpen } from 'lucide-react';

// Mock blog posts data
const mockPosts = [
  {
    id: '1',
    title: 'The Future of Decentralized Finance: Trends and Innovations',
    excerpt: 'Exploring emerging trends in DeFi protocols and their impact on traditional finance. From yield farming to liquid staking, discover what\'s driving the next wave of financial innovation.',
    content: 'Full article content would go here...',
    category: 'DeFi',
    author: 'Sarah Chen',
    publishDate: '2024-01-15',
    readTime: '5 min read',
    featured: true,
    tags: ['DeFi', 'Yield Farming', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: '2',
    title: 'Building Successful Web3 Startups: A Comprehensive Guide',
    excerpt: 'Essential strategies for launching and scaling your blockchain-based startup. Learn from successful founders about common pitfalls and winning strategies.',
    content: 'Full article content would go here...',
    category: 'Startup Guide',
    author: 'Marcus Rodriguez',
    publishDate: '2024-01-12',
    readTime: '8 min read',
    featured: true,
    tags: ['Startups', 'Web3', 'Entrepreneurship'],
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: '3',
    title: 'DAO Governance: Best Practices for Decentralized Decision Making',
    excerpt: 'Best practices for implementing decentralized governance in your organization. Learn how to structure voting mechanisms and community engagement.',
    content: 'Full article content would go here...',
    category: 'DAO',
    author: 'Dr. Elena Kowalski',
    publishDate: '2024-01-10',
    readTime: '6 min read',
    featured: false,
    tags: ['DAO', 'Governance', 'Community'],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: '4',
    title: 'Smart Contract Security: Common Vulnerabilities and Prevention',
    excerpt: 'A deep dive into smart contract security patterns and how to protect your protocol from common attack vectors and vulnerabilities.',
    content: 'Full article content would go here...',
    category: 'Security',
    author: 'Alex Thompson',
    publishDate: '2024-01-08',
    readTime: '12 min read',
    featured: false,
    tags: ['Security', 'Smart Contracts', 'Auditing'],
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: '5',
    title: 'NFT Marketplaces: The Evolution of Digital Ownership',
    excerpt: 'How NFT marketplaces are evolving beyond art to encompass gaming, music, and real-world assets. Explore the future of digital ownership.',
    content: 'Full article content would go here...',
    category: 'NFT',
    author: 'Jennifer Wu',
    publishDate: '2024-01-05',
    readTime: '7 min read',
    featured: false,
    tags: ['NFT', 'Digital Assets', 'Marketplaces'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  },
  {
    id: '6',
    title: 'Layer 2 Solutions: Scaling Ethereum for Mass Adoption',
    excerpt: 'Understanding Layer 2 scaling solutions and their role in making Ethereum accessible to mainstream users through reduced fees and faster transactions.',
    content: 'Full article content would go here...',
    category: 'Infrastructure',
    author: 'David Kim',
    publishDate: '2024-01-03',
    readTime: '9 min read',
    featured: false,
    tags: ['Layer 2', 'Scaling', 'Ethereum'],
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=400'
  }
];

const categories = ['All', 'DeFi', 'Startup Guide', 'DAO', 'Security', 'NFT', 'Infrastructure'];

export default function Blog() {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [email, setEmail] = useState('');

  const filteredPosts = mockPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPosts = mockPosts.filter(post => post.featured);

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
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Web3 Insights & Updates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Stay informed with the latest trends, best practices, and insights from the Web3 ecosystem.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-articles"
            />
          </div>
          
          <div className="flex space-x-2 overflow-x-auto">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap ${
                  selectedCategory === category 
                    ? 'bg-primary text-white' 
                    : 'hover:bg-primary/10'
                }`}
                data-testid={`button-category-${category.toLowerCase().replace(' ', '-')}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {selectedCategory === 'All' && searchTerm === '' && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Featured Articles</h2>
            <div className="grid lg:grid-cols-2 gap-8">
              {featuredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img 
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary text-white">Featured</Badge>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishDate)}
                      </div>
                      <div className="flex items-center text-sm text-gray-500">
                        <BookOpen className="w-4 h-4 mr-1" />
                        {post.readTime}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary-dark"
                        data-testid={`button-read-${post.id}`}
                      >
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* All Posts */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            {selectedCategory === 'All' ? 'Latest Articles' : `${selectedCategory} Articles`}
            <span className="ml-2 text-lg font-normal text-gray-500">
              ({filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'})
            </span>
          </h2>
          
          {filteredPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4 mb-3">
                      <Badge variant="secondary">{post.category}</Badge>
                      <div className="text-sm text-gray-500">{post.readTime}</div>
                    </div>
                    <h3 className="text-lg font-semibold mb-3 line-clamp-2">{post.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-1 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <User className="w-4 h-4 mr-1" />
                        <span className="mr-2">{post.author}</span>
                        <Calendar className="w-4 h-4 mr-1" />
                        {formatDate(post.publishDate)}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-primary hover:text-primary-dark"
                        data-testid={`button-read-${post.id}`}
                      >
                        Read
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="p-12 text-center">
              <div className="text-gray-500 dark:text-gray-400">
                <BookOpen className="w-12 h-12 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                <p>Try adjusting your search criteria or browse different categories.</p>
              </div>
            </Card>
          )}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-primary text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Stay Updated with Web3 Insights</h3>
            <p className="mb-6 opacity-90 max-w-2xl mx-auto">
              Get the latest articles, analysis, and trends delivered directly to your inbox. 
              Join our community of Web3 enthusiasts and builders.
            </p>
            
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
                className="flex-1 bg-white text-gray-900 border-white focus:ring-white/50" 
                required 
                data-testid="input-newsletter-email"
              />
              <Button 
                type="submit" 
                variant="secondary"
                className="bg-white text-primary px-6 py-2 font-semibold hover:bg-gray-100"
                data-testid="button-newsletter-subscribe"
              >
                Subscribe
              </Button>
            </form>
            
            <div className="mt-4 text-sm opacity-75">
              Join 5,000+ readers • Unsubscribe anytime • No spam, ever
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
