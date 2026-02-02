import { useState } from "react";
import {
  Shield,
  Lock,
  Eye,
  FileText,
  CheckCircle2,
  Globe,
  Type,
  Contrast,
  Moon,
  Download,
  Trash2,
  ChevronRight,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const privacyFeatures = [
  {
    icon: Lock,
    title: "End-to-End Encryption",
    description:
      "Your data is encrypted both in transit and at rest using industry-standard AES-256 encryption.",
  },
  {
    icon: Eye,
    title: "You Control Your Data",
    description:
      "You decide what information to share and can delete your account and data at any time.",
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description:
      "Our platform meets HIPAA standards for protecting sensitive health information.",
  },
  {
    icon: FileText,
    title: "Transparent Privacy Policy",
    description:
      "We clearly explain how we use your data. No hidden clauses or confusing language.",
  },
];

const accessibilityFeatures = [
  {
    icon: Type,
    title: "Adjustable Text Size",
    description:
      "Increase font size for better readability throughout the app.",
  },
  {
    icon: Contrast,
    title: "High Contrast Mode",
    description:
      "Enhanced contrast for better visibility of all interface elements.",
  },
  {
    icon: Moon,
    title: "Dark Mode",
    description: "Reduce eye strain with our carefully designed dark theme.",
  },
  {
    icon: Globe,
    title: "Multiple Languages",
    description: "Access content in your preferred language.",
  },
];

const dataControls = [
  {
    icon: Download,
    title: "Export Your Data",
    description: "Download a copy of all your data in a portable format.",
    action: "Export Data",
  },
  {
    icon: Trash2,
    title: "Delete Your Account",
    description: "Permanently remove your account and all associated data.",
    action: "Delete Account",
    danger: true,
  },
];

export function PrivacyAccessibility() {
  const [settings, setSettings] = useState({
    fontSize: 16,
    highContrast: false,
    darkMode: false,
    notifications: true,
    dataSharing: false,
    analytics: false,
  });

  const updateSetting = (key: string, value: boolean | number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">
            Privacy & Accessibility
          </h1>
          <p className="text-medium-gray">
            Your data, your control. Customize your experience.
          </p>
        </div>

        <Tabs defaultValue="privacy" className="space-y-8">
          <div className="overflow-x-auto pb-2 scrollbar-none mb-6">
            <TabsList className="bg-white p-1 rounded-xl flex w-max min-w-full justify-start whitespace-nowrap">
              <TabsTrigger
                value="privacy"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Privacy & Security
              </TabsTrigger>
              <TabsTrigger
                value="accessibility"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Accessibility
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Data Controls
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-8">
            {/* Trust Banner */}
            <Card className="bg-lavender text-white border-0">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row md:items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Shield className="w-10 h-10" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold mb-2">
                      Your Privacy is Our Priority
                    </h2>
                    <p className="text-white/80 max-w-2xl">
                      We never sell your data. We use industry-leading security
                      measures to protect your information. You have full
                      control over what you share.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacy Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {privacyFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-lavender/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-lavender" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-medium-gray">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Privacy Settings */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <Lock className="w-5 h-5 text-lavender" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-warm-beige rounded-xl">
                    <div>
                      <p className="font-medium text-charcoal">
                        Push Notifications
                      </p>
                      <p className="text-sm text-medium-gray">
                        Receive reminders and updates
                      </p>
                    </div>
                    <Switch
                      checked={settings.notifications}
                      onCheckedChange={(checked) =>
                        updateSetting("notifications", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-warm-beige rounded-xl">
                    <div>
                      <p className="font-medium text-charcoal">
                        Data Sharing for Research
                      </p>
                      <p className="text-sm text-medium-gray">
                        Anonymously contribute to Alzheimer's research
                      </p>
                    </div>
                    <Switch
                      checked={settings.dataSharing}
                      onCheckedChange={(checked) =>
                        updateSetting("dataSharing", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-warm-beige rounded-xl">
                    <div>
                      <p className="font-medium text-charcoal">
                        Analytics & Improvements
                      </p>
                      <p className="text-sm text-medium-gray">
                        Help us improve by sharing usage data
                      </p>
                    </div>
                    <Switch
                      checked={settings.analytics}
                      onCheckedChange={(checked) =>
                        updateSetting("analytics", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Certifications */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal">
                  Security Certifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  {[
                    "HIPAA Compliant",
                    "SOC 2 Type II",
                    "GDPR Ready",
                    "CCPA Compliant",
                  ].map((cert) => (
                    <div
                      key={cert}
                      className="flex items-center gap-2 px-4 py-2 bg-mint/10 rounded-full"
                    >
                      <CheckCircle2 className="w-4 h-4 text-mint" />
                      <span className="text-sm font-medium text-charcoal">
                        {cert}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Accessibility Tab */}
          <TabsContent value="accessibility" className="space-y-8">
            {/* Accessibility Features */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {accessibilityFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-card">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-mint/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-mint" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-charcoal mb-1">
                            {feature.title}
                          </h3>
                          <p className="text-sm text-medium-gray">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Accessibility Settings */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                  <Type className="w-5 h-5 text-lavender" />
                  Display Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="font-medium text-charcoal">Font Size</p>
                      <p className="text-sm text-medium-gray">
                        Adjust text size throughout the app
                      </p>
                    </div>
                    <span className="text-sm font-medium text-lavender">
                      {settings.fontSize}px
                    </span>
                  </div>
                  <Slider
                    value={[settings.fontSize]}
                    onValueChange={([value]) =>
                      updateSetting("fontSize", value)
                    }
                    min={14}
                    max={24}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-medium-gray">
                    <span>Small</span>
                    <span>Large</span>
                  </div>
                </div>

                {/* Preview */}
                <div className="p-4 bg-warm-beige rounded-xl">
                  <p className="text-xs text-medium-gray mb-2">Preview</p>
                  <p
                    style={{ fontSize: `${settings.fontSize}px` }}
                    className="text-charcoal"
                  >
                    This is how text will appear throughout CareConnect.
                  </p>
                </div>

                {/* Toggles */}
                <div className="space-y-4 pt-4 border-t border-light-gray">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">
                        High Contrast Mode
                      </p>
                      <p className="text-sm text-medium-gray">
                        Enhanced visibility for all elements
                      </p>
                    </div>
                    <Switch
                      checked={settings.highContrast}
                      onCheckedChange={(checked) =>
                        updateSetting("highContrast", checked)
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-charcoal">Dark Mode</p>
                      <p className="text-sm text-medium-gray">
                        Reduce eye strain in low light
                      </p>
                    </div>
                    <Switch
                      checked={settings.darkMode}
                      onCheckedChange={(checked) =>
                        updateSetting("darkMode", checked)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <Globe className="w-5 h-5 text-soft-blue" />
                  Language
                </CardTitle>
              </CardHeader>
              <CardContent>
                <select className="w-full p-3 rounded-xl border border-light-gray bg-white">
                  <option value="en">English</option>
                  <option value="es">Español (Spanish)</option>
                  <option value="fr">Français (French)</option>
                  <option value="zh">中文 (Chinese)</option>
                </select>
                <p className="text-sm text-medium-gray mt-2">
                  More languages coming soon. Contact us to request support for
                  your language.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Data Controls Tab */}
          <TabsContent value="data" className="space-y-8">
            {/* Warning Banner */}
            <Card className="bg-pale-yellow border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="w-6 h-6 text-charcoal flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">
                      Important Information About Your Data
                    </h3>
                    <p className="text-sm text-charcoal/70">
                      You have full control over your personal information.
                      Export your data at any time, or permanently delete your
                      account if you choose to leave.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Data Control Options */}
            <div className="space-y-4">
              {dataControls.map((control, index) => {
                const Icon = control.icon;
                return (
                  <Card key={index} className="bg-white border-0 shadow-card">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              control.danger
                                ? "bg-soft-coral/10"
                                : "bg-lavender/10"
                            }`}
                          >
                            <Icon
                              className={`w-6 h-6 ${control.danger ? "text-soft-coral" : "text-lavender"}`}
                            />
                          </div>
                          <div>
                            <h3 className="font-semibold text-charcoal mb-1">
                              {control.title}
                            </h3>
                            <p className="text-sm text-medium-gray">
                              {control.description}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant={control.danger ? "destructive" : "outline"}
                          className={
                            control.danger
                              ? "bg-soft-coral hover:bg-soft-coral/90 text-white"
                              : "border-lavender text-lavender hover:bg-lavender/10"
                          }
                        >
                          {control.action}
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Data We Collect */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal">
                  What Data We Collect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      type: "Account Information",
                      desc: "Name, email, and profile details you provide",
                      required: true,
                    },
                    {
                      type: "Patient Information",
                      desc: "Medical history, medications, and care preferences you enter",
                      required: true,
                    },
                    {
                      type: "Usage Data",
                      desc: "How you use the app to help us improve (optional)",
                      required: false,
                    },
                    {
                      type: "Community Posts",
                      desc: "Posts and replies you share in the forum",
                      required: true,
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start justify-between p-4 bg-warm-beige rounded-xl"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-charcoal">
                            {item.type}
                          </p>
                          {item.required && (
                            <Badge className="bg-lavender/10 text-lavender border-0 text-xs">
                              Required
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-medium-gray mt-1">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-mint/10 border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-charcoal mb-1">
                      Questions About Your Privacy?
                    </h3>
                    <p className="text-sm text-medium-gray">
                      Our privacy team is here to help with any concerns.
                    </p>
                  </div>
                  <Button className="bg-mint text-charcoal hover:bg-mint/90">
                    Contact Privacy Team
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
