import { useState, useEffect } from "react";
import {
  Heart,
  Sparkles,
  Phone,
  Wind,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { breathingExercises, mockMoodEntries } from "@/data/mockData";

const burnoutSigns = [
  { sign: "Feeling constantly exhausted", checked: false },
  { sign: "Losing interest in activities you once enjoyed", checked: false },
  { sign: "Feeling irritable or impatient", checked: false },
  { sign: "Having trouble sleeping", checked: false },
  { sign: "Feeling hopeless or helpless", checked: false },
  { sign: "Neglecting your own needs", checked: false },
];

const professionalResources = [
  {
    name: "Alzheimer's Association Helpline",
    phone: "1-800-272-3900",
    description: "24/7 support for caregivers and families",
    available: "24/7",
  },
  {
    name: "Caregiver Support Line",
    phone: "1-855-327-4477",
    description: "Trained counselors for caregiver stress",
    available: "Mon-Fri 8am-8pm",
  },
  {
    name: "Crisis Text Line",
    phone: "Text HOME to 741741",
    description: "Free, confidential crisis support",
    available: "24/7",
  },
];

export function MentalHealth() {
  const [activeTab, setActiveTab] = useState("resources");
  const [isBreathing, setIsBreathing] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">(
    "inhale",
  );
  const [breathProgress, setBreathProgress] = useState(0);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [burnoutChecklist, setBurnoutChecklist] = useState(burnoutSigns);

  // Breathing exercise animation
  useEffect(() => {
    if (!isBreathing) return;

    const interval = setInterval(() => {
      setBreathProgress((prev) => {
        if (prev >= 100) {
          setBreathPhase((current) => {
            if (current === "inhale") return "hold";
            if (current === "hold") return "exhale";
            return "inhale";
          });
          return 0;
        }
        return prev + 2;
      });
    }, 80);

    return () => clearInterval(interval);
  }, [isBreathing]);

  const toggleBurnoutCheck = (index: number) => {
    setBurnoutChecklist((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item,
      ),
    );
  };

  const checkedCount = burnoutChecklist.filter((item) => item.checked).length;
  const burnoutRisk =
    checkedCount >= 4 ? "high" : checkedCount >= 2 ? "moderate" : "low";

  const getMoodLabel = (mood: number) => {
    switch (mood) {
      case 1:
        return "Very Difficult";
      case 2:
        return "Difficult";
      case 3:
        return "Okay";
      case 4:
        return "Good";
      case 5:
        return "Great";
      default:
        return "";
    }
  };

  const getMoodColor = (mood: number) => {
    switch (mood) {
      case 1:
        return "bg-soft-coral";
      case 2:
        return "bg-soft-coral/70";
      case 3:
        return "bg-pale-yellow";
      case 4:
        return "bg-mint";
      case 5:
        return "bg-lavender";
      default:
        return "bg-warm-beige";
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      {/* Hero Section */}
      <div
        className="relative py-16 mb-8"
        style={{
          background:
            "linear-gradient(135deg, hsl(278 14% 62% / 0.1) 0%, hsl(152 28% 78% / 0.2) 100%)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-lavender flex items-center justify-center mx-auto mb-6">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <h1 className="text-4xl font-semibold text-charcoal mb-4">
              Your Wellbeing Matters Too
            </h1>
            <p className="text-lg text-medium-gray">
              Taking care of yourself is essential to providing the best care
              for your loved one. We're here to support you every step of the
              way.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2 scrollbar-none mb-6">
            <TabsList className="bg-white p-1 rounded-xl flex w-max min-w-full justify-start whitespace-nowrap">
              <TabsTrigger
                value="resources"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Resources
              </TabsTrigger>
              <TabsTrigger
                value="exercises"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Breathing Exercises
              </TabsTrigger>
              <TabsTrigger
                value="mood"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Mood Tracker
              </TabsTrigger>
              <TabsTrigger
                value="help"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Professional Help
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Resources Tab */}
          <TabsContent value="resources" className="space-y-8">
            {/* Burnout Awareness */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-soft-coral" />
                    Burnout Self-Check
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-medium-gray mb-4">
                    Check any signs you've experienced in the past two weeks:
                  </p>
                  <div className="space-y-3">
                    {burnoutChecklist.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => toggleBurnoutCheck(index)}
                        className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                          item.checked
                            ? "bg-soft-coral/10"
                            : "bg-warm-beige hover:bg-warm-beige/80"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                            item.checked
                              ? "bg-soft-coral border-soft-coral"
                              : "border-medium-gray"
                          }`}
                        >
                          {item.checked && (
                            <CheckCircle2 className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span
                          className={`text-sm ${item.checked ? "text-charcoal" : "text-medium-gray"}`}
                        >
                          {item.sign}
                        </span>
                      </button>
                    ))}
                  </div>

                  {checkedCount > 0 && (
                    <div
                      className={`mt-6 p-4 rounded-xl ${
                        burnoutRisk === "high"
                          ? "bg-soft-coral/20"
                          : burnoutRisk === "moderate"
                            ? "bg-pale-yellow"
                            : "bg-mint/20"
                      }`}
                    >
                      <p className="font-medium text-charcoal mb-1">
                        Burnout Risk:{" "}
                        {burnoutRisk === "high"
                          ? "High"
                          : burnoutRisk === "moderate"
                            ? "Moderate"
                            : "Low"}
                      </p>
                      <p className="text-sm text-medium-gray">
                        {burnoutRisk === "high"
                          ? "Please consider reaching out to a professional for support. You deserve help."
                          : burnoutRisk === "moderate"
                            ? "Take time for self-care. Small breaks can make a big difference."
                            : "You're doing well! Keep prioritizing your wellbeing."}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="bg-white border-0 shadow-card">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <Sparkles className="w-6 h-6 text-lavender" />
                    Self-Care Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Take micro-breaks",
                        desc: "Even 5 minutes of quiet time helps",
                      },
                      {
                        title: "Ask for help",
                        desc: "You don't have to do this alone",
                      },
                      {
                        title: "Maintain connections",
                        desc: "Stay in touch with friends and family",
                      },
                      {
                        title: "Prioritize sleep",
                        desc: "Rest is essential for caregiving",
                      },
                      {
                        title: "Celebrate small wins",
                        desc: "Acknowledge what you're doing right",
                      },
                    ].map((tip, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-3 p-3 bg-warm-beige rounded-xl"
                      >
                        <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-medium text-lavender">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">
                            {tip.title}
                          </p>
                          <p className="text-sm text-medium-gray">{tip.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="bg-lavender text-white border-0">
                <CardContent className="p-6">
                  <Heart className="w-8 h-8 mb-3 opacity-80" />
                  <p className="text-3xl font-bold mb-1">67%</p>
                  <p className="text-white/80 text-sm">
                    of caregivers report high stress
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-mint text-charcoal border-0">
                <CardContent className="p-6">
                  <TrendingUp className="w-8 h-8 mb-3 opacity-80" />
                  <p className="text-3xl font-bold mb-1">30%</p>
                  <p className="text-charcoal/70 text-sm">
                    decrease in stress with support
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-soft-blue text-charcoal border-0">
                <CardContent className="p-6">
                  <Calendar className="w-8 h-8 mb-3 opacity-80" />
                  <p className="text-3xl font-bold mb-1">10 min</p>
                  <p className="text-charcoal/70 text-sm">
                    daily self-care makes a difference
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Breathing Exercises Tab */}
          <TabsContent value="exercises" className="space-y-6">
            {/* Active Breathing Exercise */}
            <Card className="bg-white border-0 shadow-card">
              <CardContent className="p-8">
                <div className="text-center max-w-md mx-auto">
                  <h3 className="text-2xl font-semibold text-charcoal mb-2">
                    4-7-8 Relaxing Breath
                  </h3>
                  <p className="text-medium-gray mb-8">
                    A calming technique that helps reduce anxiety and promote
                    relaxation
                  </p>

                  {/* Breathing Circle */}
                  <div className="relative w-48 h-48 mx-auto mb-8">
                    <div
                      className={`absolute inset-0 rounded-full bg-lavender/20 transition-transform duration-[4000ms] ${
                        isBreathing && breathPhase === "inhale"
                          ? "scale-110"
                          : isBreathing && breathPhase === "exhale"
                            ? "scale-90"
                            : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-4 rounded-full bg-lavender/30 transition-transform duration-[4000ms] ${
                        isBreathing && breathPhase === "inhale"
                          ? "scale-110"
                          : isBreathing && breathPhase === "exhale"
                            ? "scale-90"
                            : "scale-100"
                      }`}
                    />
                    <div
                      className={`absolute inset-8 rounded-full bg-lavender flex items-center justify-center transition-transform duration-[4000ms] ${
                        isBreathing && breathPhase === "inhale"
                          ? "scale-110"
                          : isBreathing && breathPhase === "exhale"
                            ? "scale-90"
                            : "scale-100"
                      }`}
                    >
                      <Wind className="w-12 h-12 text-white" />
                    </div>
                  </div>

                  {/* Phase Indicator */}
                  {isBreathing && (
                    <div className="mb-6">
                      <p className="text-2xl font-semibold text-lavender mb-2">
                        {breathPhase === "inhale" && "Breathe In..."}
                        {breathPhase === "hold" && "Hold..."}
                        {breathPhase === "exhale" && "Breathe Out..."}
                      </p>
                      <Progress value={breathProgress} className="h-2" />
                    </div>
                  )}

                  {/* Controls */}
                  <div className="flex justify-center gap-4">
                    <Button
                      onClick={() => setIsBreathing(!isBreathing)}
                      className="bg-lavender hover:bg-deep-lavender px-8"
                    >
                      {isBreathing ? (
                        <>
                          <Pause className="w-4 h-4 mr-2" /> Pause
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" /> Start
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsBreathing(false);
                        setBreathPhase("inhale");
                        setBreathProgress(0);
                      }}
                      className="border-lavender text-lavender hover:bg-lavender/10"
                    >
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Reset
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Other Exercises */}
            <div className="grid sm:grid-cols-2 gap-6">
              {breathingExercises.slice(1).map((exercise) => (
                <Card
                  key={exercise.id}
                  className="bg-white border-0 shadow-card card-hover"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-mint/20 flex items-center justify-center">
                        <Wind className="w-6 h-6 text-mint" />
                      </div>
                      <span className="text-sm text-medium-gray">
                        {exercise.duration} min
                      </span>
                    </div>
                    <h4 className="font-semibold text-charcoal mb-2">
                      {exercise.name}
                    </h4>
                    <p className="text-sm text-medium-gray mb-4">
                      {exercise.description}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-medium-gray">
                      <span>Inhale: {exercise.pattern.inhale}s</span>
                      <span>•</span>
                      <span>Hold: {exercise.pattern.hold}s</span>
                      <span>•</span>
                      <span>Exhale: {exercise.pattern.exhale}s</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Mood Tracker Tab */}
          <TabsContent value="mood" className="space-y-6">
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-charcoal">
                  How are you feeling today?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center gap-4 mb-6">
                  {[1, 2, 3, 4, 5].map((mood) => (
                    <button
                      key={mood}
                      onClick={() => setSelectedMood(mood)}
                      className={`w-14 h-14 rounded-full transition-all ${
                        selectedMood === mood
                          ? "scale-110 ring-4 ring-lavender/30 " +
                            getMoodColor(mood)
                          : "bg-warm-beige hover:bg-warm-beige/80"
                      }`}
                    >
                      <span className="text-2xl">
                        {mood === 1 && "😢"}
                        {mood === 2 && "😕"}
                        {mood === 3 && "😐"}
                        {mood === 4 && "🙂"}
                        {mood === 5 && "😊"}
                      </span>
                    </button>
                  ))}
                </div>
                {selectedMood && (
                  <p className="text-center text-lavender font-medium">
                    {getMoodLabel(selectedMood)}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Mood History */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-lavender" />
                  Your Mood History
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockMoodEntries.map((entry) => (
                    <div
                      key={entry.id}
                      className="flex items-center gap-4 p-3 bg-warm-beige rounded-xl"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getMoodColor(entry.mood)}`}
                      >
                        <span className="text-lg">
                          {entry.mood === 1 && "😢"}
                          {entry.mood === 2 && "😕"}
                          {entry.mood === 3 && "😐"}
                          {entry.mood === 4 && "🙂"}
                          {entry.mood === 5 && "😊"}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-charcoal">
                          {getMoodLabel(entry.mood)}
                        </p>
                        {entry.notes && (
                          <p className="text-sm text-medium-gray">
                            {entry.notes}
                          </p>
                        )}
                      </div>
                      <span className="text-sm text-medium-gray">
                        {new Date(entry.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Professional Help Tab */}
          <TabsContent value="help" className="space-y-6">
            {/* Crisis Banner */}
            <Card className="bg-soft-coral text-white border-0">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Need Immediate Support?
                    </h3>
                    <p className="text-white/80 mb-4">
                      If you're in crisis or having thoughts of harming
                      yourself, please reach out for help right away.
                    </p>
                    <a
                      href="tel:988"
                      className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-off-white transition-colors"
                    >
                      <Phone className="w-5 h-5" />
                      Call or Text 988
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resource Cards */}
            <div className="grid md:grid-cols-3 gap-6">
              {professionalResources.map((resource, index) => (
                <Card
                  key={index}
                  className="bg-white border-0 shadow-card card-hover"
                >
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-lavender/20 flex items-center justify-center mb-4">
                      <Phone className="w-6 h-6 text-lavender" />
                    </div>
                    <h4 className="font-semibold text-charcoal mb-2">
                      {resource.name}
                    </h4>
                    <p className="text-sm text-medium-gray mb-4">
                      {resource.description}
                    </p>
                    <a
                      href={`tel:${resource.phone.replace(/\D/g, "")}`}
                      className="text-lavender font-medium hover:underline block mb-1"
                    >
                      {resource.phone}
                    </a>
                    <p className="text-xs text-medium-gray">
                      {resource.available}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Find a Counselor */}
            <Card className="bg-white border-0 shadow-card">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-semibold text-charcoal text-lg mb-1">
                      Find a Counselor Near You
                    </h4>
                    <p className="text-medium-gray">
                      Connect with mental health professionals who specialize in
                      caregiver support
                    </p>
                  </div>
                  <Button className="bg-lavender hover:bg-deep-lavender">
                    Search Directory
                    <ChevronRight className="w-4 h-4 ml-1" />
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
