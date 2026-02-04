import { useState, useEffect } from "react";
import {
  Heart,
  Menu,
  LayoutDashboard,
  User,
  Calendar,
  BookOpen,
  Shield,
  Users,
  Sparkles,
  Bell,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { NotificationTray } from "./NotificationTray";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "profile", label: "Patient Profile", icon: User },
  { id: "careplan", label: "Care Plan", icon: Calendar },
  { id: "resources", label: "Resources", icon: BookOpen },
  { id: "community", label: "Community", icon: Users },
  { id: "wellness", label: "Mental Health", icon: Sparkles },
  { id: "privacy", label: "Privacy & Accessibility", icon: Shield },
];

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (pageId: string) => {
    onPageChange(pageId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16 lg:h-20">
          {/* Logo Container */}
          <div className="flex-1 flex justify-start">
            <button
              onClick={() => handleNavClick("landing")}
              className="flex items-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center transition-transform group-hover:scale-105">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-charcoal">
                CareConnect
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 ml-[12px] xl:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center gap-2 px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? "bg-lavender text-white"
                      : "text-charcoal hover:bg-warm-beige"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Actions Container */}
          <div className="flex-1 flex justify-end items-center gap-2">
            <button
              onClick={() => setIsNotificationsOpen(true)}
              className="relative p-2 rounded-full hover:bg-warm-beige transition-colors"
            >
              <Bell className="w-5 h-5 text-charcoal" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-soft-coral rounded-full" />
            </button>

            <NotificationTray
              isOpen={isNotificationsOpen}
              onClose={() => setIsNotificationsOpen(false)}
            />

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 bg-off-white flex flex-col p-6"
              >
                <SheetHeader className="text-left mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white fill-white" />
                    </div>
                    <SheetTitle className="text-xl font-semibold text-charcoal">
                      CareConnect
                    </SheetTitle>
                  </div>
                  <SheetDescription className="text-sm text-medium-gray mt-1">
                    Margaret's Care Dashboard
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentPage === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => handleNavClick(item.id)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all ${
                          isActive
                            ? "bg-lavender text-white shadow-md"
                            : "text-charcoal hover:bg-warm-beige"
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
