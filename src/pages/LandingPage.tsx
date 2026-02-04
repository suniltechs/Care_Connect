import { useEffect, useRef } from "react";
import {
  Heart,
  Calendar,
  BookOpen,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Menu,
  LayoutDashboard,
  Info,
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
import { useState } from "react";
import { AuthModal } from "@/components/auth/AuthModal";

interface LandingPageProps {
  onGetStarted: () => void;
}

const navLinks = [
  { label: "Dashboard", href: "#", icon: LayoutDashboard },
  { label: "Features", href: "#features", icon: Sparkles },
  { label: "About", href: "#about", icon: Info },
  { label: "Support", href: "#support", icon: Heart },
];

const features = [
  {
    icon: Calendar,
    title: "Care Planning",
    description:
      "Organize medications, appointments, and daily routines with easy-to-use tools",
    color: "bg-soft-blue",
  },
  {
    icon: BookOpen,
    title: "Resource Library",
    description:
      "Access trusted articles, videos, and guides written for caregivers",
    color: "bg-pale-yellow",
  },
  {
    icon: Users,
    title: "Support Community",
    description: "Connect with other caregivers who understand your journey",
    color: "bg-mint",
  },
  {
    icon: Heart,
    title: "Patient Profiles",
    description:
      "Keep important medical information and preferences in one secure place",
    color: "bg-soft-coral",
  },
  {
    icon: Sparkles,
    title: "Mental Wellness",
    description:
      "Take care of yourself with stress management tools and resources",
    color: "bg-lavender",
  },
  {
    icon: Shield,
    title: "24/7 Support",
    description: "Access help and resources whenever you need them",
    color: "bg-soft-blue",
  },
];

const stats = [
  { value: "10,000+", label: "Caregivers Supported" },
  { value: "500+", label: "Resources Available" },
  { value: "24/7", label: "Community Access" },
];

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState<"login" | "signup">("signup");

  const handleAuthOpen = (view: "login" | "signup") => {
    setAuthView(view);
    setIsAuthModalOpen(true);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-up");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-off-white">
      {/* Landing Page Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <span className="text-xl font-semibold text-charcoal">
                CareConnect
              </span>
            </div>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    if (link.label === "Dashboard") {
                      e.preventDefault();
                      onGetStarted();
                    }
                  }}
                  className="text-charcoal hover:text-lavender transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => handleAuthOpen("login")}
                className="hidden sm:flex text-charcoal hover:text-white transition-colors rounded-full font-medium"
              >
                Login
              </Button>
              <Button
                onClick={() => handleAuthOpen("signup")}
                className="hidden sm:flex bg-lavender hover:bg-deep-lavender text-white rounded-full px-6"
              >
                Get Started
              </Button>

              {/* Mobile Menu */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Menu className="w-6 h-6" />
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
                      Compassionate Care Support
                    </SheetDescription>
                  </SheetHeader>

                  <div className="flex flex-col gap-2">
                    {navLinks.map((link) => {
                      const Icon = link.icon;
                      return (
                        <button
                          key={link.label}
                          onClick={(e) => {
                            setIsMobileMenuOpen(false);
                            if (link.label === "Dashboard") {
                              e.preventDefault();
                              onGetStarted();
                            } else if (link.href.startsWith("#")) {
                              const id = link.href.replace("#", "");
                              const element = document.getElementById(id);
                              if (element) {
                                element.scrollIntoView({ behavior: "smooth" });
                              }
                            }
                          }}
                          className="flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all text-charcoal hover:bg-warm-beige"
                        >
                          <Icon className="w-5 h-5" />
                          <span className="font-medium text-lg">
                            {link.label}
                          </span>
                        </button>
                      );
                    })}

                    <div className="mt-4 pt-4 border-t border-charcoal/5 flex flex-col gap-3">
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleAuthOpen("login");
                        }}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-left justify-start h-auto font-medium text-charcoal hover:bg-warm-beige"
                      >
                        Login
                      </Button>
                      <Button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          handleAuthOpen("signup");
                        }}
                        className="bg-lavender hover:bg-deep-lavender text-white rounded-full py-6 text-lg"
                      >
                        Get Started
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center pt-[40px]"
        style={{
          background:
            "linear-gradient(135deg, #F5F1ED 0%, #FAF9F7 50%, #F5F1ED 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="space-y-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/10 text-lavender text-sm font-medium animate-fade-in">
                <Heart className="w-4 h-4" />
                <span>Compassionate Care Support</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-charcoal leading-tight">
                You're Not Alone in{" "}
                <span className="text-lavender">This Journey</span>
              </h1>

              <p className="text-lg text-medium-gray leading-relaxed max-w-xl">
                CareConnect provides compassionate support, practical tools, and
                a caring community for Alzheimer's caregivers. Together, we make
                the journey easier.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => handleAuthOpen("signup")}
                  className="bg-lavender hover:bg-deep-lavender text-white px-8 py-6 text-lg rounded-full btn-hover shadow-glow w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() =>
                    document
                      .getElementById("features")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="border-lavender text-lavender hover:bg-lavender/10 px-8 py-6 text-lg rounded-full w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 sm:gap-8 pt-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center sm:items-start"
                  >
                    <div className="text-2xl lg:text-3xl font-bold text-lavender">
                      {stat.value}
                    </div>
                    <div className="text-sm text-medium-gray">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/hero-image.jpg"
                  alt="Caregiver supporting elderly person with compassion"
                  className="w-full h-[550px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-lavender/20 to-transparent" />
              </div>

              {/* Floating Card - hidden on very small screens or adjusted */}
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-white rounded-2xl p-4 shadow-card-hover max-w-[200px] animate-fade-in delay-300">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-mint flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">
                      HIPAA Compliant
                    </p>
                    <p className="text-xs text-medium-gray">
                      Your data is secure
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 right-0 w-64 h-64 bg-lavender/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-48 h-48 bg-mint/10 rounded-full blur-3xl" />
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 reveal-on-scroll opacity-0">
            <h2 className="text-3xl lg:text-4xl font-semibold text-charcoal mb-4">
              Everything You Need to Provide the Best Care
            </h2>
            <p className="text-lg text-medium-gray">
              Our comprehensive platform supports you through every step of your
              caregiving journey
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="reveal-on-scroll opacity-0 group bg-off-white rounded-2xl p-6 lg:p-8 card-hover"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-5 transition-transform group-hover:scale-110`}
                  >
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-charcoal mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-medium-gray leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Empathy Section */}
      <section id="about" className="py-20 lg:py-32 bg-warm-beige">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="reveal-on-scroll opacity-0 order-2 lg:order-1">
              <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-card">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-lavender flex items-center justify-center flex-shrink-0">
                    <Heart className="w-6 h-6 text-white fill-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-charcoal mb-2">
                      Designed with Empathy
                    </h3>
                    <p className="text-medium-gray">
                      Every feature is crafted to reduce stress, not add to it
                    </p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {[
                    "Simple, intuitive interface that works for all skill levels",
                    "Calming color palette to reduce visual stress",
                    "Clear, non-medical language throughout",
                    "Privacy-first approach to protect sensitive information",
                    "24/7 access to support when you need it most",
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-mint flex-shrink-0 mt-0.5" />
                      <span className="text-charcoal">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="reveal-on-scroll opacity-0 order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-semibold text-charcoal mb-6">
                We Understand What You're Going Through
              </h2>
              <p className="text-lg text-medium-gray mb-6 leading-relaxed">
                Caring for someone with Alzheimer's is one of the most
                challenging journeys a person can face. The emotional toll, the
                daily uncertainties, and the feeling of isolation can be
                overwhelming.
              </p>
              <p className="text-lg text-medium-gray mb-8 leading-relaxed">
                CareConnect was built by people who have walked this path. We
                know the 3 AM worries, the moments of joy, and everything in
                between. We're here to support you every step of the way.
              </p>
              <Button
                onClick={() => handleAuthOpen("signup")}
                className="bg-lavender hover:bg-deep-lavender text-white px-8 py-6 text-lg rounded-full btn-hover"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="support" className="py-20 lg:py-32 bg-lavender">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="reveal-on-scroll opacity-0">
            <Heart className="w-16 h-16 text-white/80 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-4xl font-semibold text-white mb-4">
              Ready to Feel Supported?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Join thousands of caregivers who have found comfort, organization,
              and community through CareConnect.
            </p>
            <Button
              onClick={() => handleAuthOpen("signup")}
              className="bg-white text-lavender hover:bg-off-white px-10 py-6 text-lg rounded-full btn-hover shadow-lg"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <p className="text-white/60 mt-4 text-sm">
              No credit card required. Your privacy is our priority.
            </p>
          </div>
        </div>
      </section>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        view={authView}
        onViewChange={setAuthView}
        onAuthSuccess={onGetStarted}
      />
    </div>
  );
}
