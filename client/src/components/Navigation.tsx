import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { ConnectButton } from './ConnectButton';
import { useTheme } from './ThemeProvider';
import { Menu, X, Sun, Moon } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Navigation() {
  const [location] = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/campaigns', label: 'Campaigns' },
    { href: '/dao', label: 'DAO' },
    { href: '/mentorship', label: 'Mentorship' },
    { href: '/blog', label: 'Blog' },
  ];

  const isActive = (href: string) => location === href;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center space-x-3 cursor-pointer" data-testid="link-home">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white fill-current">
                  <path d="M4 8h6L8 4h8l-2 4h6l-4 8H8l2 4H4l2-4H0l4-8z"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-primary">Crowdchain</span>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className={`cursor-pointer transition-colors ${
                  isActive(link.href) 
                    ? 'text-primary font-semibold' 
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                }`} data-testid={`link-${link.label.toLowerCase()}`}>
                  {link.label}
                </span>
              </Link>
            ))}
          </div>
          
          {/* Right Side Controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
              data-testid="button-theme-toggle"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </Button>
            
            {/* Connect Wallet */}
            <div className="hidden sm:block">
              <ConnectButton />
            </div>
            
            {/* Mobile Menu */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80">
                  <div className="flex flex-col space-y-6 mt-8">
                    {navLinks.map((link) => (
                      <Link key={link.href} href={link.href}>
                        <span className={`block text-lg cursor-pointer transition-colors ${
                          isActive(link.href) 
                            ? 'text-primary font-semibold' 
                            : 'text-gray-600 dark:text-gray-300 hover:text-primary'
                        }`}>
                          {link.label}
                        </span>
                      </Link>
                    ))}
                    <div className="pt-4 border-t">
                      <ConnectButton />
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
