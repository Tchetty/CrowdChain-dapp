import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CampaignForm } from '@/components/CampaignForm';
import { useStore } from '@/lib/store';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Users, Target, Calendar } from 'lucide-react';

export default function CreateCampaign() {
  const [, navigate] = useLocation();
  const { isConnected } = useStore();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCampaignSubmit = async (data: any) => {
    if (!isConnected) {
      toast({
        title: 'Wallet Not Connected',
        description: 'Please connect your wallet to create a campaign.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // In real app: call smart contract createCampaign function
      console.log('Creating campaign with data:', data);
      
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      toast({
        title: 'Campaign Created Successfully!',
        description: 'Your campaign has been deployed to the blockchain.',
      });
      
      // Navigate to the new campaign (in real app, use actual campaign ID)
      navigate('/campaigns/new-campaign-id');
    } catch (error) {
      toast({
        title: 'Campaign Creation Failed',
        description: 'There was an error creating your campaign. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              You need to connect your wallet to create a campaign.
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Create Your Campaign
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Launch your Web3 project and connect with the community through transparent, milestone-based funding.
          </p>
        </div>

        {/* Process Steps */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Set Your Goal</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Define your funding target and campaign timeline
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Plan Milestones</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Break down your project into achievable milestones
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Deploy & Launch</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Deploy your campaign smart contract and start fundraising
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Campaign Form */}
        <Card>
          <CardHeader>
            <CardTitle>Campaign Details</CardTitle>
          </CardHeader>
          <CardContent>
            <CampaignForm 
              onSubmit={handleCampaignSubmit}
              isSubmitting={isSubmitting}
            />
          </CardContent>
        </Card>

        {/* Guidelines */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Campaign Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">Do's</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Provide clear, detailed project descriptions</li>
                  <li>• Set realistic funding goals and timelines</li>
                  <li>• Create meaningful, achievable milestones</li>
                  <li>• Include high-quality images and documentation</li>
                  <li>• Be transparent about use of funds</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-red-600">Don'ts</h4>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                  <li>• Don't make unrealistic promises or guarantees</li>
                  <li>• Don't set milestones that are too vague</li>
                  <li>• Don't use copyrighted content without permission</li>
                  <li>• Don't violate platform terms of service</li>
                  <li>• Don't create duplicate campaigns</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
