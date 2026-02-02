import { useState } from "react";
import {
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Pill,
  Heart,
  Users,
  BookOpen,
  Plus,
  TrendingUp,
  MessageSquare,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  mockTodaysTasks,
  mockAppointments,
  mockForumPosts,
} from "@/data/mockData";
import type { CareTask } from "@/types";

export function Dashboard() {
  const [tasks, setTasks] = useState<CareTask[]>(mockTodaysTasks);

  const toggleTask = (taskId: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  const completedTasks = tasks.filter((t) => t.completed).length;
  const taskProgress = (completedTasks / tasks.length) * 100;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "medication":
        return <Pill className="w-4 h-4" />;
      case "meal":
        return <Heart className="w-4 h-4" />;
      case "activity":
        return <TrendingUp className="w-4 h-4" />;
      case "appointment":
        return <Calendar className="w-4 h-4" />;
      case "hygiene":
        return <Heart className="w-4 h-4" />;
      default:
        return <Circle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medication":
        return "bg-soft-blue text-white";
      case "meal":
        return "bg-mint text-white";
      case "activity":
        return "bg-pale-yellow text-charcoal";
      case "appointment":
        return "bg-lavender text-white";
      case "hygiene":
        return "bg-soft-coral text-white";
      default:
        return "bg-gray-200 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-semibold text-charcoal mb-2">
            Good morning, Sarah
          </h1>
          <p className="text-sm sm:text-base text-medium-gray">
            Here's what's happening with Margaret's care today
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="bg-white border-0 shadow-card card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-medium-gray mb-1">Today's Tasks</p>
                  <p className="text-2xl font-semibold text-charcoal">
                    {completedTasks}/{tasks.length}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full bg-lavender/10 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6 text-lavender" />
                </div>
              </div>
              <Progress value={taskProgress} className="mt-3 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-card card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-medium-gray mb-1">Medications</p>
                  <p className="text-2xl font-semibold text-charcoal">7/7</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-mint/20 flex items-center justify-center">
                  <Pill className="w-6 h-6 text-mint" />
                </div>
              </div>
              <p className="text-xs text-medium-gray mt-3">
                On track this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-card card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-medium-gray mb-1">Mood Tracker</p>
                  <p className="text-2xl font-semibold text-charcoal">Stable</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-pale-yellow/50 flex items-center justify-center">
                  <Heart className="w-6 h-6 text-charcoal" />
                </div>
              </div>
              <p className="text-xs text-medium-gray mt-3">
                Last 7 days average
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-card card-hover">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-medium-gray mb-1">Community</p>
                  <p className="text-2xl font-semibold text-charcoal">3 New</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-soft-blue/20 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-soft-blue" />
                </div>
              </div>
              <p className="text-xs text-medium-gray mt-3">
                Replies to your posts
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Today's Checklist */}
          <div className="lg:col-span-2">
            <Card className="bg-white border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-charcoal flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-lavender" />
                    Today's Care Checklist
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-lavender">
                    <Plus className="w-4 h-4 mr-1" />
                    Add Task
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => toggleTask(task.id)}
                      className={`flex items-start sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl cursor-pointer transition-all ${
                        task.completed
                          ? "bg-mint/10"
                          : "bg-warm-beige hover:bg-warm-beige/80"
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 ${task.completed ? "text-mint" : "text-medium-gray"}`}
                      >
                        {task.completed ? (
                          <CheckCircle2 className="w-6 h-6" />
                        ) : (
                          <Circle className="w-6 h-6" />
                        )}
                      </div>

                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-lg ${getCategoryColor(task.category)} flex items-center justify-center`}
                      >
                        {getCategoryIcon(task.category)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`font-medium ${task.completed ? "line-through text-medium-gray" : "text-charcoal"}`}
                        >
                          {task.title}
                        </p>
                        {task.notes && (
                          <p className="text-sm text-medium-gray truncate">
                            {task.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-1 text-xs sm:text-sm text-medium-gray flex-shrink-0">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
                        {task.time}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Appointments */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-soft-blue" />
                    Upcoming
                  </CardTitle>
                  <Button variant="ghost" size="sm" className="text-lavender">
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAppointments.slice(0, 2).map((apt) => (
                    <div key={apt.id} className="p-4 bg-warm-beige rounded-xl">
                      <p className="font-medium text-charcoal mb-1">
                        {apt.title}
                      </p>
                      <p className="text-sm text-medium-gray mb-2">
                        {new Date(apt.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        at {apt.time}
                      </p>
                      {apt.doctor && (
                        <p className="text-xs text-medium-gray">{apt.doctor}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-charcoal">
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-lavender/30 hover:bg-lavender/10"
                  >
                    <Pill className="w-5 h-5 text-lavender" />
                    <span className="text-sm">Add Med</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-mint/50 hover:bg-mint/10"
                  >
                    <Heart className="w-5 h-5 text-mint" />
                    <span className="text-sm">Log Mood</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-soft-blue/50 hover:bg-soft-blue/10"
                  >
                    <Users className="w-5 h-5 text-soft-blue" />
                    <span className="text-sm">Community</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto py-4 flex flex-col items-center gap-2 border-soft-coral/50 hover:bg-soft-coral/10"
                  >
                    <BookOpen className="w-5 h-5 text-soft-coral" />
                    <span className="text-sm">Resources</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Community Preview */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-lavender" />
                    Community
                  </CardTitle>
                  <ChevronRight className="w-5 h-5 text-medium-gray" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockForumPosts.slice(0, 2).map((post) => (
                    <div key={post.id} className="p-3 bg-warm-beige rounded-lg">
                      <p className="font-medium text-charcoal text-sm mb-1 line-clamp-1">
                        {post.title}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-medium-gray">
                        <span>{post.reactions} reactions</span>
                        <span>{post.replies.length} replies</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
