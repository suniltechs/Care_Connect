import { useState, useEffect } from 'react';
import { 
  Heart, 
  Menu, 
  LayoutDashboard, 
  User, 
  Calendar, 
  BookOpen, 
  Users, 
  Sparkles,
  Shield,
  Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'Patient Profile', icon: User },
  { id: 'careplan', label: 'Care Plan', icon: Calendar },
  { id: 'resources', label: 'Resources', icon: BookOpen },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'wellness', label: 'Mental Health', icon: Sparkles },
  { id: 'privacy', label: 'Privacy & Accessibility', icon: Shield },
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-md'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center transition-transform group-hover:scale-105">
              <Heart className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="text-xl font-semibold text-charcoal">
              CareConnect
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-lavender text-white'
                      : 'text-charcoal hover:bg-warm-beige'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="relative p-2 rounded-full hover:bg-warm-beige transition-colors">
              <Bell className="w-5 h-5 text-charcoal" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-soft-coral rounded-full" />
            </button>
            
            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-off-white">
                <div className="flex flex-col gap-2 mt-8">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          isActive
                            ? 'bg-lavender text-white'
                            : 'text-charcoal hover:bg-warm-beige'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
