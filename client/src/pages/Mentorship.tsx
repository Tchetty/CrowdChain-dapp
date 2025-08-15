import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { 
  Users, 
  Star, 
  Calendar, 
  BookOpen, 
  Video, 
  MessageCircle,
  Award,
  Check,
  ArrowRight
} from 'lucide-react';

// Mock mentors data
const mockMentors = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'DeFi Protocol Architect',
    company: 'Aave',
    rating: 4.9,
    sessions: 127,
    expertise: ['DeFi', 'Smart Contracts', 'Tokenomics'],
    image: 'https://images.unsplash.com/photo-1494790108755-2616b9ad2b55?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    bio: 'Former Ethereum Foundation researcher with 8+ years in DeFi protocol development.'
  },
  {
    id: '2',
    name: 'Marcus Rodriguez',
    role: 'Blockchain Entrepreneur',
    company: 'Chainlink Labs',
    rating: 4.8,
    sessions: 89,
    expertise: ['NFTs', 'Gaming', 'Community Building'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    bio: 'Serial entrepreneur who has launched 3 successful Web3 startups.'
  },
  {
    id: '3',
    name: 'Dr. Elena Kowalski',
    role: 'Blockchain Security Expert',
    company: 'ConsenSys',
    rating: 5.0,
    sessions: 156,
    expertise: ['Security', 'Auditing', 'Risk Management'],
    image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200',
    bio: 'Lead security researcher specializing in smart contract audits and protocol security.'
  }
];

const resources = [
  {
    id: '1',
    title: 'Web3 Startup Fundamentals',
    type: 'Course',
    duration: '4 hours',
    level: 'Beginner',
    description: 'Learn the basics of launching a Web3 startup, from ideation to token economics.'
  },
  {
    id: '2',
    title: 'Smart Contract Security Best Practices',
    type: 'Workshop',
    duration: '2 hours',
    level: 'Intermediate',
    description: 'Deep dive into security patterns and common vulnerabilities in smart contracts.'
  },
  {
    id: '3',
    title: 'Building Sustainable Token Economics',
    type: 'Masterclass',
    duration: '3 hours',
    level: 'Advanced',
    description: 'Design sustainable tokenomics that align incentives and drive long-term growth.'
  },
  {
    id: '4',
    title: 'Community-Driven Growth Strategies',
    type: 'Webinar',
    duration: '1 hour',
    level: 'Beginner',
    description: 'Learn how to build and engage a community around your Web3 project.'
  }
];

export default function Mentorship() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'mentors' | 'resources' | 'apply'>('mentors');
  const [menteeForm, setMenteeForm] = useState({
    name: '',
    email: '',
    projectStage: '',
    goals: '',
    expertise: ''
  });
  const [mentorForm, setMentorForm] = useState({
    name: '',
    email: '',
    experience: '',
    expertise: '',
    motivation: ''
  });

  const handleMenteeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Application Submitted',
      description: 'Your mentee application has been submitted. We will review it and get back to you soon.',
    });
    setMenteeForm({ name: '', email: '', projectStage: '', goals: '', expertise: '' });
  };

  const handleMentorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Application Submitted',
      description: 'Your mentor application has been submitted. We will review it and contact you if selected.',
    });
    setMentorForm({ name: '', email: '', experience: '', expertise: '', motivation: '' });
  };

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mentorship Program
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Connect with experienced Web3 professionals and accelerate your startup journey through expert guidance and community support.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">1-on-1 Guidance</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Get personalized mentorship sessions with industry experts who understand your specific challenges.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Resource Library</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Access exclusive educational content, tools, and resources curated by our expert network.
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community Network</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Connect with fellow entrepreneurs, potential partners, and investors in our community.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-4 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
            <Button
              variant={activeTab === 'mentors' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('mentors')}
              className={activeTab === 'mentors' ? 'bg-primary text-white' : ''}
              data-testid="tab-mentors"
            >
              Find Mentors
            </Button>
            <Button
              variant={activeTab === 'resources' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('resources')}
              className={activeTab === 'resources' ? 'bg-primary text-white' : ''}
              data-testid="tab-resources"
            >
              Resources
            </Button>
            <Button
              variant={activeTab === 'apply' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('apply')}
              className={activeTab === 'apply' ? 'bg-primary text-white' : ''}
              data-testid="tab-apply"
            >
              Apply
            </Button>
          </div>
        </div>

        {/* Mentors Tab */}
        {activeTab === 'mentors' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Featured Mentors
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Connect with experienced professionals who can guide your Web3 journey
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mockMentors.map((mentor) => (
                <Card key={mentor.id} className="overflow-hidden">
                  <CardContent className="p-6 text-center">
                    <img 
                      src={mentor.image}
                      alt={mentor.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold mb-1">{mentor.name}</h3>
                    <p className="text-primary font-medium mb-1">{mentor.role}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">{mentor.company}</p>
                    
                    <div className="flex items-center justify-center space-x-4 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm">{mentor.rating}</span>
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {mentor.sessions} sessions
                      </div>
                    </div>

                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {mentor.bio}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {mentor.expertise.map((skill) => (
                        <Badge key={skill} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>

                    <Button 
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                      data-testid={`button-connect-${mentor.id}`}
                    >
                      Connect
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Resources Tab */}
        {activeTab === 'resources' && (
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Learning Resources
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Comprehensive educational content to help you build successful Web3 projects
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {resources.map((resource) => (
                <Card key={resource.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                          {resource.type === 'Course' && <BookOpen className="w-6 h-6 text-primary" />}
                          {resource.type === 'Workshop' && <Users className="w-6 h-6 text-primary" />}
                          {resource.type === 'Masterclass' && <Award className="w-6 h-6 text-primary" />}
                          {resource.type === 'Webinar' && <Video className="w-6 h-6 text-primary" />}
                        </div>
                        <div>
                          <Badge variant="secondary" className="mb-2">
                            {resource.type}
                          </Badge>
                          <h3 className="text-lg font-semibold">{resource.title}</h3>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {resource.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{resource.duration}</span>
                        </div>
                        <Badge variant={
                          resource.level === 'Beginner' ? 'default' :
                          resource.level === 'Intermediate' ? 'secondary' : 'outline'
                        }>
                          {resource.level}
                        </Badge>
                      </div>
                      <Button 
                        variant="outline"
                        size="sm"
                        data-testid={`button-access-${resource.id}`}
                      >
                        <ArrowRight className="w-4 h-4 mr-1" />
                        Access
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Apply Tab */}
        {activeTab === 'apply' && (
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Mentee Application */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="w-5 h-5" />
                  <span>Apply as Mentee</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMenteeSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="menteeName">Full Name</Label>
                    <Input
                      id="menteeName"
                      value={menteeForm.name}
                      onChange={(e) => setMenteeForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      data-testid="input-mentee-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="menteeEmail">Email</Label>
                    <Input
                      id="menteeEmail"
                      type="email"
                      value={menteeForm.email}
                      onChange={(e) => setMenteeForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-mentee-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectStage">Project Stage</Label>
                    <Input
                      id="projectStage"
                      value={menteeForm.projectStage}
                      onChange={(e) => setMenteeForm(prev => ({ ...prev, projectStage: e.target.value }))}
                      placeholder="e.g., Idea stage, MVP, Launched"
                      required
                      data-testid="input-project-stage"
                    />
                  </div>

                  <div>
                    <Label htmlFor="goals">What are your goals?</Label>
                    <Textarea
                      id="goals"
                      value={menteeForm.goals}
                      onChange={(e) => setMenteeForm(prev => ({ ...prev, goals: e.target.value }))}
                      placeholder="What do you hope to achieve through mentorship?"
                      rows={3}
                      required
                      data-testid="textarea-mentee-goals"
                    />
                  </div>

                  <div>
                    <Label htmlFor="menteeExpertise">Areas of Interest</Label>
                    <Input
                      id="menteeExpertise"
                      value={menteeForm.expertise}
                      onChange={(e) => setMenteeForm(prev => ({ ...prev, expertise: e.target.value }))}
                      placeholder="e.g., DeFi, NFTs, Gaming, Security"
                      required
                      data-testid="input-mentee-expertise"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    data-testid="button-submit-mentee"
                  >
                    Submit Mentee Application
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div className="text-sm text-blue-800 dark:text-blue-300">
                      <p className="font-medium mb-1">What to expect:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Review within 3-5 business days</li>
                        <li>• Mentor matching based on expertise</li>
                        <li>• Initial 30-minute consultation call</li>
                        <li>• Ongoing support and resources</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentor Application */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Award className="w-5 h-5" />
                  <span>Become a Mentor</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleMentorSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="mentorName">Full Name</Label>
                    <Input
                      id="mentorName"
                      value={mentorForm.name}
                      onChange={(e) => setMentorForm(prev => ({ ...prev, name: e.target.value }))}
                      required
                      data-testid="input-mentor-name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="mentorEmail">Email</Label>
                    <Input
                      id="mentorEmail"
                      type="email"
                      value={mentorForm.email}
                      onChange={(e) => setMentorForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                      data-testid="input-mentor-email"
                    />
                  </div>

                  <div>
                    <Label htmlFor="experience">Experience</Label>
                    <Textarea
                      id="experience"
                      value={mentorForm.experience}
                      onChange={(e) => setMentorForm(prev => ({ ...prev, experience: e.target.value }))}
                      placeholder="Describe your background and experience in Web3..."
                      rows={3}
                      required
                      data-testid="textarea-mentor-experience"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mentorExpertise">Areas of Expertise</Label>
                    <Input
                      id="mentorExpertise"
                      value={mentorForm.expertise}
                      onChange={(e) => setMentorForm(prev => ({ ...prev, expertise: e.target.value }))}
                      placeholder="e.g., Smart Contracts, Tokenomics, Security"
                      required
                      data-testid="input-mentor-expertise"
                    />
                  </div>

                  <div>
                    <Label htmlFor="motivation">Why do you want to mentor?</Label>
                    <Textarea
                      id="motivation"
                      value={mentorForm.motivation}
                      onChange={(e) => setMentorForm(prev => ({ ...prev, motivation: e.target.value }))}
                      placeholder="What motivates you to help other entrepreneurs?"
                      rows={3}
                      required
                      data-testid="textarea-mentor-motivation"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-primary hover:bg-primary-dark text-white"
                    data-testid="button-submit-mentor"
                  >
                    Submit Mentor Application
                  </Button>
                </form>

                <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-green-600 mt-0.5" />
                    <div className="text-sm text-green-800 dark:text-green-300">
                      <p className="font-medium mb-1">Mentor benefits:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• Flexible scheduling</li>
                        <li>• Recognition in community</li>
                        <li>• Access to mentor-only events</li>
                        <li>• Network with other experts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
