import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { animations } from '@/lib/gsap';

interface ParallaxHeroProps {
  title: string;
  subtitle: string;
  stats?: {
    totalRaised: string;
    campaigns: number;
    backers: string;
    successRate: string;
  };
}

export function ParallaxHero({ title, subtitle, stats }: ParallaxHeroProps) {
  const [, navigate] = useLocation();
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (heroRef.current) {
      animations.parallaxHero();
    }
  }, []);

  const handleCreateCampaign = () => {
    navigate('/create-campaign');
  };

  const handleExploreCampaigns = () => {
    navigate('/campaigns');
  };

  return (
    <section 
      ref={heroRef}
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      data-testid="section-hero"
    >
      {/* Animated Background Elements */}
      <div className="parallax-bg absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="hero-content relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-slide-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
            {title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            {subtitle}
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg"
              onClick={handleCreateCampaign}
              className="bg-primary hover:bg-primary-dark text-white px-8 py-4 text-lg font-semibold transition-all duration-300 transform hover:scale-105 animate-pulse-glow"
              data-testid="button-create-campaign"
            >
              Create Campaign
            </Button>
            <Button 
              variant="outline"
              size="lg"
              onClick={handleExploreCampaigns}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              data-testid="button-explore-campaigns"
            >
              Explore Campaigns
            </Button>
          </div>
          
          {/* Stats */}
          {stats && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div 
                  className="text-3xl font-bold text-primary"
                  data-testid="text-total-raised"
                >
                  {stats.totalRaised}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Total Raised</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl font-bold text-primary"
                  data-testid="text-campaigns"
                >
                  {stats.campaigns}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Active Campaigns</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl font-bold text-primary"
                  data-testid="text-backers"
                >
                  {stats.backers}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Backers</div>
              </div>
              <div className="text-center">
                <div 
                  className="text-3xl font-bold text-primary"
                  data-testid="text-success-rate"
                >
                  {stats.successRate}
                </div>
                <div className="text-gray-600 dark:text-gray-400">Success Rate</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
