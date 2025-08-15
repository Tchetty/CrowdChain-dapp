import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SettingsDrawer } from "@/components/SettingsDrawer";

// Pages
import Landing from "@/pages/Landing";
import Campaigns from "@/pages/Campaigns";
import CampaignDetail from "@/pages/CampaignDetail";
import CreateCampaign from "@/pages/CreateCampaign";
import DAO from "@/pages/DAO";
import StartupDashboard from "@/pages/StartupDashboard";
import InvestorDashboard from "@/pages/InvestorDashboard";
import Mentorship from "@/pages/Mentorship";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />
      <Route path="/campaigns" component={Campaigns} />
      <Route path="/campaigns/:id" component={CampaignDetail} />
      <Route path="/create-campaign" component={CreateCampaign} />
      <Route path="/dao" component={DAO} />
      <Route path="/dashboard/startup" component={StartupDashboard} />
      <Route path="/dashboard/investor" component={InvestorDashboard} />
      <Route path="/mentorship" component={Mentorship} />
      <Route path="/blog" component={Blog} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Navigation />
            <main>
              <Router />
            </main>
            <Footer />
            <SettingsDrawer />
            <Toaster />
          </div>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
