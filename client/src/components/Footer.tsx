import { Link } from 'wouter';
import { Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
  const platformLinks = [
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/create-campaign', label: 'Create Project' },
    { href: '/dao', label: 'DAO Voting' },
    { href: '/mentorship', label: 'Mentorship' },
  ];

  const resourceLinks = [
    { href: '/blog', label: 'Blog' },
    { href: '/docs', label: 'Documentation' },
    { href: '/help', label: 'Help Center' },
    { href: '/community', label: 'Community' },
  ];

  const companyLinks = [
    { href: '/about', label: 'About' },
    { href: '/privacy', label: 'Privacy' },
    { href: '/terms', label: 'Terms' },
    { href: '/contact', label: 'Contact' },
  ];

  const socialLinks = [
    { href: 'https://twitter.com/crowdchain', icon: Twitter, label: 'Twitter' },
    { href: 'https://github.com/crowdchain', icon: Github, label: 'GitHub' },
    { href: 'https://linkedin.com/company/crowdchain', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link href="/">
              <div className="flex items-center space-x-3 mb-4 cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-white fill-current">
                    <path d="M4 8h6L8 4h8l-2 4h6l-4 8H8l2 4H4l2-4H0l4-8z"/>
                  </svg>
                </div>
                <span className="text-lg font-bold text-primary">Crowdchain</span>
              </div>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              The future of Web3 crowdfunding, connecting startups with communities.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  data-testid={`link-${label.toLowerCase()}`}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
          
          {/* Platform Links */}
          <div>
            <h3 className="font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {platformLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {resourceLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              {companyLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="hover:text-primary transition-colors cursor-pointer">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 Crowdchain. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
