import { Heart } from "lucide-react";

interface FooterProps {
  onAuthClick?: () => void;
  onPageChange?: (page: string) => void;
}

export function Footer({ onAuthClick, onPageChange }: FooterProps) {
  const handleLinkClick = (id: string) => {
    if (onPageChange) {
      onPageChange(id);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (onAuthClick) {
      onAuthClick();
    }
  };

  return (
    <footer className="bg-charcoal text-lavender py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-lavender flex items-center justify-center">
                <Heart className="w-5 h-5 text-white fill-lavender" />
              </div>
              <span className="text-xl font-semibold">CareConnect</span>
            </div>
            <p className="text-lavender/60 text-sm leading-relaxed">
              Supporting caregivers, one day at a time. We're here to make your
              journey a little easier.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { id: "dashboard", label: "Dashboard" },
                { id: "profile", label: "Patient Profile" },
                { id: "careplan", label: "Care Plan" },
                { id: "resources", label: "Resources" },
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="text-lavender/60 hover:text-lavender transition-colors text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {[
                "Help Center",
                "Privacy Policy",
                "Terms of Service",
                "Contact Us",
              ].map((link) => (
                <li key={link}>
                  <button className="text-lavender/60 hover:text-lavender transition-colors text-sm">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Get Help</h4>
            <p className="text-lavender/60 text-sm mb-2">
              Alzheimer's Association Helpline
            </p>
            <p className="text-lavender font-semibold mb-4">1-800-272-3900</p>
            <p className="text-lavender/60 text-sm">
              Available 24/7 for support
            </p>
          </div>
        </div>

        <div className="border-t border-lavender/10 mt-12 pt-8 text-center">
          <p className="text-lavender/40 text-sm">
            © 2026 CareConnect. All rights reserved. Built with compassion for
            caregivers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
