import { useState } from "react";
import {
  Search,
  BookOpen,
  Video,
  FileText,
  Clock,
  Bookmark,
  Heart,
  Filter,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { mockResources, categoryLabels } from "@/data/mockData";
import type { Resource, ResourceCategory } from "@/types";

const categories: {
  id: ResourceCategory;
  label: string;
  icon: typeof BookOpen;
}[] = [
  { id: "all", label: "All Resources", icon: BookOpen },
  { id: "understanding", label: "Understanding", icon: BookOpen },
  { id: "daily-care", label: "Daily Care", icon: Heart },
  { id: "safety", label: "Safety", icon: BookOpen },
  { id: "self-care", label: "Self-Care", icon: Heart },
  { id: "legal", label: "Legal & Financial", icon: FileText },
];

export function ResourceLibrary() {
  const [selectedCategory, setSelectedCategory] =
    useState<ResourceCategory>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [bookmarkedOnly, setBookmarkedOnly] = useState(false);

  const toggleBookmark = (resourceId: string) => {
    setResources(
      resources.map((r) =>
        r.id === resourceId ? { ...r, isBookmarked: !r.isBookmarked } : r,
      ),
    );
  };

  const filteredResources = resources.filter((resource) => {
    const matchesCategory =
      selectedCategory === "all" || resource.category === selectedCategory;
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBookmark = !bookmarkedOnly || resource.isBookmarked;
    return matchesCategory && matchesSearch && matchesBookmark;
  });

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4" />;
      case "guide":
        return <FileText className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "understanding":
        return "bg-lavender/10 text-lavender";
      case "daily-care":
        return "bg-mint/20 text-charcoal";
      case "safety":
        return "bg-soft-blue/20 text-charcoal";
      case "self-care":
        return "bg-soft-coral/20 text-charcoal";
      case "legal":
        return "bg-pale-yellow/50 text-charcoal";
      default:
        return "bg-warm-beige text-charcoal";
    }
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-charcoal mb-2">
            Resource Library
          </h1>
          <p className="text-medium-gray">
            Trusted articles, videos, and guides for Alzheimer's caregivers
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
            <Input
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 bg-white border-0 shadow-card rounded-xl"
            />
          </div>
          <Button
            variant={bookmarkedOnly ? "default" : "outline"}
            onClick={() => setBookmarkedOnly(!bookmarkedOnly)}
            className={`h-12 px-6 rounded-xl ${
              bookmarkedOnly
                ? "bg-lavender text-white hover:bg-deep-lavender"
                : "border-lavender text-lavender hover:bg-lavender/10"
            }`}
          >
            <Bookmark
              className={`w-4 h-4 mr-2 ${bookmarkedOnly ? "fill-white" : ""}`}
            />
            Saved ({resources.filter((r) => r.isBookmarked).length})
          </Button>
        </div>

        {/* Category Pills */}
        <div className="overflow-x-auto pb-4 scrollbar-none mb-4">
          <div className="flex w-max gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const isActive = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-lavender text-white"
                      : "bg-white text-charcoal hover:bg-lavender/10"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-medium-gray">
            Showing{" "}
            <span className="font-medium text-charcoal">
              {filteredResources.length}
            </span>{" "}
            resources
          </p>
          <Button variant="ghost" size="sm" className="text-lavender">
            <Filter className="w-4 h-4 mr-1" />
            Sort by: Relevance
          </Button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResources.map((resource) => (
            <Card
              key={resource.id}
              className="bg-white border-0 shadow-card card-hover overflow-hidden group cursor-pointer"
            >
              {/* Thumbnail Placeholder */}
              <div className="aspect-video bg-gradient-to-br from-lavender/20 to-soft-blue/20 flex items-center justify-center relative overflow-hidden">
                <div className="w-16 h-16 rounded-full bg-white/50 flex items-center justify-center">
                  {getTypeIcon(resource.type)}
                </div>
                <div
                  className={`absolute top-3 left-3 px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(resource.category)}`}
                >
                  {categoryLabels[resource.category]}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBookmark(resource.id);
                  }}
                  className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Heart
                    className={`w-4 h-4 ${resource.isBookmarked ? "fill-lavender text-lavender" : "text-charcoal"}`}
                  />
                </button>
              </div>

              <CardContent className="p-5">
                <div className="flex items-center gap-2 text-xs text-medium-gray mb-2">
                  {getTypeIcon(resource.type)}
                  <span className="capitalize">{resource.type}</span>
                  <span>•</span>
                  <Clock className="w-3 h-3" />
                  <span>{resource.readTime}</span>
                </div>

                <h3 className="font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-lavender transition-colors">
                  {resource.title}
                </h3>

                <p className="text-sm text-medium-gray line-clamp-2 mb-4">
                  {resource.description}
                </p>

                <div className="flex items-center justify-between">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-lavender p-0 h-auto"
                  >
                    Read More
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(resource.id);
                    }}
                    className="text-medium-gray hover:text-lavender transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${resource.isBookmarked ? "fill-lavender text-lavender" : ""}`}
                    />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredResources.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-warm-beige flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-medium-gray" />
            </div>
            <h3 className="text-xl font-semibold text-charcoal mb-2">
              No resources found
            </h3>
            <p className="text-medium-gray">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div className="mt-16">
          <h2 className="text-2xl font-semibold text-charcoal mb-6">
            Featured for You
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-lavender text-white border-0 shadow-card overflow-hidden">
              <CardContent className="p-8">
                <Badge className="bg-white/20 text-white border-0 mb-4">
                  New Guide
                </Badge>
                <h3 className="text-2xl font-semibold mb-3">
                  The Complete Caregiver's Handbook
                </h3>
                <p className="text-white/80 mb-6">
                  Everything you need to know about caring for a loved one with
                  Alzheimer's, from early symptoms to late-stage care.
                </p>
                <Button className="bg-white text-lavender hover:bg-off-white">
                  Download Free Guide
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-mint text-charcoal border-0 shadow-card overflow-hidden">
              <CardContent className="p-8">
                <Badge className="bg-white/50 text-charcoal border-0 mb-4">
                  Video Series
                </Badge>
                <h3 className="text-2xl font-semibold mb-3">
                  Understanding Alzheimer's Stages
                </h3>
                <p className="text-charcoal/70 mb-6">
                  A 5-part video series explaining what to expect at each stage
                  of the disease and how to adapt your care approach.
                </p>
                <Button className="bg-charcoal text-white hover:bg-charcoal/90">
                  Watch Now
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
