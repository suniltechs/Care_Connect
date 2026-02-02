import { useState } from "react";
import {
  Calendar,
  CheckCircle2,
  Circle,
  Clock,
  Pill,
  Utensils,
  Heart,
  Plus,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Coffee,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { mockTodaysTasks, mockAppointments } from "@/data/mockData";

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const medicationSchedule = [
  {
    time: "8:00 AM",
    medications: ["Donepezil 10mg", "Amlodipine 5mg", "Vitamin D 1000 IU"],
    taken: true,
  },
  { time: "12:00 PM", medications: ["Calcium Supplement"], taken: false },
  { time: "6:00 PM", medications: ["Multivitamin"], taken: false },
];

const mealPlan = [
  {
    meal: "Breakfast",
    time: "8:30 AM",
    items: ["Oatmeal with berries", "Whole grain toast", "Herbal tea"],
    icon: Coffee,
    color: "bg-pale-yellow",
  },
  {
    meal: "Lunch",
    time: "12:30 PM",
    items: ["Vegetable soup", "Crackers", "Applesauce"],
    icon: Utensils,
    color: "bg-mint",
  },
  {
    meal: "Dinner",
    time: "5:00 PM",
    items: ["Baked chicken", "Steamed vegetables", "Mashed potatoes"],
    icon: Sun,
    color: "bg-soft-blue",
  },
  {
    meal: "Snacks",
    time: "Throughout day",
    items: ["Yogurt", "Banana", "Crackers"],
    icon: Heart,
    color: "bg-soft-coral",
  },
];

const dailyRoutines = {
  morning: [
    { task: "Wake up and gentle stretching", time: "7:00 AM" },
    { task: "Morning hygiene routine", time: "7:30 AM" },
    { task: "Take morning medications", time: "8:00 AM" },
    { task: "Breakfast", time: "8:30 AM" },
    { task: "Morning walk", time: "9:00 AM" },
    { task: "Calm activity (music/photos)", time: "10:00 AM" },
  ],
  afternoon: [
    { task: "Light lunch", time: "12:30 PM" },
    { task: "Rest/quiet time", time: "1:00 PM" },
    { task: "Afternoon activity", time: "2:30 PM" },
    { task: "Tea time with family", time: "3:00 PM" },
    { task: "Gentle exercise", time: "4:00 PM" },
  ],
  evening: [
    { task: "Early dinner", time: "5:00 PM" },
    { task: "Evening medications", time: "6:00 PM" },
    { task: "Relaxing activity", time: "6:30 PM" },
    { task: "Evening hygiene routine", time: "8:00 PM" },
    { task: "Bedtime routine", time: "8:30 PM" },
    { task: "Lights out", time: "9:00 PM" },
  ],
};

export function CarePlan() {
  const [selectedDate, setSelectedDate] = useState(2); // Wednesday
  const [activeTab, setActiveTab] = useState("schedule");
  const [tasks, setTasks] = useState(mockTodaysTasks);

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-charcoal mb-2">
              Care Planning
            </h1>
            <p className="text-medium-gray">
              Organize medications, routines, and daily care activities
            </p>
          </div>
          <Button className="bg-lavender hover:bg-deep-lavender">
            <Plus className="w-4 h-4 mr-2" />
            Add to Plan
          </Button>
        </div>

        {/* Week Calendar */}
        <Card className="bg-white border-0 shadow-card mb-6">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="font-medium text-charcoal">January 2024</span>
              <Button variant="ghost" size="sm">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
            <div className="grid grid-cols-7 gap-1 sm:gap-2">
              {weekDays.map((day, index) => (
                <button
                  key={day}
                  onClick={() => setSelectedDate(index)}
                  className={`p-2 sm:p-3 rounded-xl text-center transition-all ${
                    selectedDate === index
                      ? "bg-lavender text-white"
                      : "bg-warm-beige text-charcoal hover:bg-lavender/10"
                  }`}
                >
                  <p className="text-[10px] sm:text-xs mb-1 opacity-80">
                    {day}
                  </p>
                  <p className="text-sm sm:text-base font-semibold">
                    {8 + index}
                  </p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="overflow-x-auto pb-2 scrollbar-none mb-6">
            <TabsList className="bg-white p-1 rounded-xl flex w-max min-w-full justify-start whitespace-nowrap">
              <TabsTrigger
                value="schedule"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Medication Schedule
              </TabsTrigger>
              <TabsTrigger
                value="checklist"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Daily Checklist
              </TabsTrigger>
              <TabsTrigger
                value="meals"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Meal Plan
              </TabsTrigger>
              <TabsTrigger
                value="routines"
                className="rounded-lg data-[state=active]:bg-lavender data-[state=active]:text-white"
              >
                Daily Routines
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Medication Schedule */}
          <TabsContent value="schedule" className="space-y-6">
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                    <Pill className="w-5 h-5 text-lavender" />
                    Weekly Medication Schedule
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Medication
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {medicationSchedule.map((slot, index) => (
                    <div
                      key={index}
                      className="border border-light-gray rounded-xl overflow-hidden"
                    >
                      <div className="bg-warm-beige px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-lavender" />
                          <span className="font-medium text-charcoal">
                            {slot.time}
                          </span>
                        </div>
                        <Badge
                          className={
                            slot.taken
                              ? "bg-mint text-white"
                              : "bg-soft-coral text-white"
                          }
                        >
                          {slot.taken ? "Taken" : "Pending"}
                        </Badge>
                      </div>
                      <div className="p-4">
                        <div className="flex flex-wrap gap-2">
                          {slot.medications.map((med, medIndex) => (
                            <div
                              key={medIndex}
                              className="flex items-center gap-2 px-3 py-2 bg-warm-beige rounded-lg"
                            >
                              <Pill className="w-4 h-4 text-lavender" />
                              <span className="text-sm text-charcoal">
                                {med}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Appointments */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-soft-blue" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.map((apt) => (
                    <div key={apt.id} className="p-4 bg-warm-beige rounded-xl">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-medium text-charcoal">
                            {apt.title}
                          </h4>
                          {apt.doctor && (
                            <p className="text-sm text-medium-gray">
                              {apt.doctor}
                            </p>
                          )}
                          {apt.location && (
                            <p className="text-sm text-medium-gray">
                              {apt.location}
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-lavender">
                            {new Date(apt.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </p>
                          <p className="text-sm text-medium-gray">{apt.time}</p>
                        </div>
                      </div>
                      {apt.notes && (
                        <p className="mt-3 text-sm text-medium-gray bg-white p-2 rounded">
                          Note: {apt.notes}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Checklist */}
          <TabsContent value="checklist" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {["morning", "afternoon", "evening"].map((period) => {
                const periodTasks = tasks.filter((t) => {
                  const hour = parseInt(t.time.split(":")[0]);
                  if (period === "morning") return hour < 12;
                  if (period === "afternoon") return hour >= 12 && hour < 17;
                  return hour >= 17;
                });

                const periodIcon =
                  period === "morning"
                    ? Sun
                    : period === "afternoon"
                      ? Coffee
                      : Moon;
                const periodColor =
                  period === "morning"
                    ? "bg-pale-yellow"
                    : period === "afternoon"
                      ? "bg-soft-blue"
                      : "bg-lavender";
                const Icon = periodIcon;

                return (
                  <Card key={period} className="bg-white border-0 shadow-card">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2 capitalize">
                        <div
                          className={`w-8 h-8 rounded-lg ${periodColor} flex items-center justify-center`}
                        >
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        {period} Routine
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {periodTasks.map((task) => (
                          <div
                            key={task.id}
                            onClick={() => toggleTask(task.id)}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                              task.completed
                                ? "bg-mint/10"
                                : "bg-warm-beige hover:bg-warm-beige/80"
                            }`}
                          >
                            {task.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-mint flex-shrink-0" />
                            ) : (
                              <Circle className="w-5 h-5 text-medium-gray flex-shrink-0" />
                            )}
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm ${task.completed ? "line-through text-medium-gray" : "text-charcoal"}`}
                              >
                                {task.title}
                              </p>
                            </div>
                            <span className="text-xs text-medium-gray flex-shrink-0">
                              {task.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Meal Plan */}
          <TabsContent value="meals" className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {mealPlan.map((meal, index) => {
                const Icon = meal.icon;
                return (
                  <Card
                    key={index}
                    className="bg-white border-0 shadow-card card-hover"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                          <div
                            className={`w-10 h-10 rounded-xl ${meal.color} flex items-center justify-center`}
                          >
                            <Icon className="w-5 h-5 text-charcoal" />
                          </div>
                          {meal.meal}
                        </CardTitle>
                        <span className="text-sm text-medium-gray">
                          {meal.time}
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {meal.items.map((item, itemIndex) => (
                          <li
                            key={itemIndex}
                            className="flex items-center gap-2 text-charcoal"
                          >
                            <div className="w-2 h-2 rounded-full bg-lavender" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-white border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal">
                  Weekly Meal Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-light-gray">
                        <th className="text-left py-3 px-4 text-sm font-medium text-medium-gray">
                          Day
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-medium-gray">
                          Breakfast
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-medium-gray">
                          Lunch
                        </th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-medium-gray">
                          Dinner
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        "Monday",
                        "Tuesday",
                        "Wednesday",
                        "Thursday",
                        "Friday",
                        "Saturday",
                        "Sunday",
                      ].map((day, index) => (
                        <tr
                          key={day}
                          className={`border-b border-light-gray/50 ${index === selectedDate ? "bg-lavender/5" : ""}`}
                        >
                          <td className="py-3 px-4 font-medium text-charcoal">
                            {day}
                          </td>
                          <td className="py-3 px-4 text-sm text-medium-gray">
                            Oatmeal & berries
                          </td>
                          <td className="py-3 px-4 text-sm text-medium-gray">
                            Soup & sandwich
                          </td>
                          <td className="py-3 px-4 text-sm text-medium-gray">
                            Chicken & vegetables
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Daily Routines */}
          <TabsContent value="routines" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {Object.entries(dailyRoutines).map(([period, routines]) => {
                const periodIcon =
                  period === "morning"
                    ? Sun
                    : period === "afternoon"
                      ? Coffee
                      : Moon;
                const periodColor =
                  period === "morning"
                    ? "text-pale-yellow"
                    : period === "afternoon"
                      ? "text-soft-blue"
                      : "text-lavender";
                const bgColor =
                  period === "morning"
                    ? "bg-pale-yellow/10"
                    : period === "afternoon"
                      ? "bg-soft-blue/10"
                      : "bg-lavender/10";
                const Icon = periodIcon;

                return (
                  <Card
                    key={period}
                    className={`border-0 shadow-card ${bgColor}`}
                  >
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2 capitalize">
                        <Icon className={`w-5 h-5 ${periodColor}`} />
                        {period} Routine
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative">
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-light-gray" />
                        <div className="space-y-4">
                          {routines.map((routine, index) => (
                            <div key={index} className="relative pl-10">
                              <div className="absolute left-2 w-4 h-4 rounded-full bg-white border-2 border-lavender" />
                              <div className="bg-white rounded-xl p-4">
                                <p className="font-medium text-charcoal text-sm">
                                  {routine.task}
                                </p>
                                <p className="text-xs text-medium-gray mt-1">
                                  {routine.time}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
