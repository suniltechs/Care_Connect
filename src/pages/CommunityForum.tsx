import { useState } from "react";
import {
  MessageSquare,
  Heart,
  MessageCircle,
  User,
  EyeOff,
  Plus,
  Filter,
  Search,
  Shield,
  Send,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { mockForumPosts, topicLabels } from "@/data/mockData";
import type { ForumPost, ForumTopic } from "@/types";

const topics: { id: ForumTopic; label: string; description: string }[] = [
  {
    id: "new-caregiver",
    label: "New to Caregiving",
    description: "Just starting your journey",
  },
  {
    id: "daily-challenges",
    label: "Daily Challenges",
    description: "Day-to-day care questions",
  },
  {
    id: "emotional-support",
    label: "Emotional Support",
    description: "Share feelings and find comfort",
  },
  {
    id: "tips",
    label: "Tips & Tricks",
    description: "Helpful advice from experienced caregivers",
  },
  {
    id: "late-stage",
    label: "Late Stage Care",
    description: "Support for advanced care needs",
  },
];

const communityGuidelines = [
  "Be kind and supportive to fellow caregivers",
  "Respect everyone's privacy and boundaries",
  "Avoid giving medical advice - share experiences instead",
  "Report any concerning posts to moderators",
  "Remember: we're all in this together",
];

export function CommunityForum() {
  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | "all">("all");
  const [posts, setPosts] = useState<ForumPost[]>(mockForumPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [selectedPost, setSelectedPost] = useState<ForumPost | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  const filteredPosts = posts.filter((post) => {
    const matchesTopic =
      selectedTopic === "all" || post.topic === selectedTopic;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTopic && matchesSearch;
  });

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) return;

    const newPost: ForumPost = {
      id: Date.now().toString(),
      author: isAnonymous ? "Anonymous" : "Sarah J.",
      isAnonymous,
      title: newPostTitle,
      content: newPostContent,
      topic: selectedTopic === "all" ? "daily-challenges" : selectedTopic,
      createdAt: new Date().toISOString(),
      replies: [],
      reactions: 0,
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setIsAnonymous(false);
    setIsPostDialogOpen(false);
  };

  const handleAddReaction = (postId: string) => {
    setPosts(
      posts.map((post) =>
        post.id === postId ? { ...post, reactions: post.reactions + 1 } : post,
      ),
    );
  };

  const handleReply = (postId: string) => {
    if (!replyContent.trim()) return;

    const newReply = {
      id: Date.now().toString(),
      author: "Sarah J.",
      isAnonymous: false,
      content: replyContent,
      createdAt: new Date().toISOString(),
    };

    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, replies: [...post.replies, newReply] }
          : post,
      ),
    );
    setReplyContent("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <div className="min-h-screen bg-warm-beige pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-semibold text-charcoal mb-2">
              Community Forum
            </h1>
            <p className="text-medium-gray">
              Connect with caregivers who understand your journey
            </p>
          </div>
          <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-lavender hover:bg-deep-lavender">
                <Plus className="w-4 h-4 mr-2" />
                New Post
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Create a New Post</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div>
                  <label className="text-sm font-medium text-charcoal mb-2 block">
                    Topic
                  </label>
                  <select
                    className="w-full p-3 rounded-xl border border-light-gray bg-white"
                    value={
                      selectedTopic === "all"
                        ? "daily-challenges"
                        : selectedTopic
                    }
                    onChange={(e) =>
                      setSelectedTopic(e.target.value as ForumTopic)
                    }
                  >
                    {topics.map((topic) => (
                      <option key={topic.id} value={topic.id}>
                        {topic.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal mb-2 block">
                    Title
                  </label>
                  <Input
                    placeholder="What's on your mind?"
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-charcoal mb-2 block">
                    Content
                  </label>
                  <Textarea
                    placeholder="Share your thoughts, questions, or experiences..."
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="rounded-xl min-h-[120px]"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Switch
                      checked={isAnonymous}
                      onCheckedChange={setIsAnonymous}
                    />
                    <div className="flex items-center gap-2">
                      <EyeOff className="w-4 h-4 text-medium-gray" />
                      <span className="text-sm text-medium-gray">
                        Post anonymously
                      </span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={handleCreatePost}
                  className="w-full bg-lavender hover:bg-deep-lavender"
                  disabled={!newPostTitle.trim() || !newPostContent.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Post to Community
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="flex flex-col gap-6">
            {/* Topics */}
            <Card className="bg-white border-0 shadow-card">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <Filter className="w-5 h-5 text-lavender" />
                  Topics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
                  <button
                    onClick={() => setSelectedTopic("all")}
                    className={`flex-shrink-0 lg:flex-shrink p-3 lg:px-4 lg:py-3 rounded-xl transition-all text-left min-w-[120px] lg:min-w-0 ${
                      selectedTopic === "all"
                        ? "bg-lavender text-white"
                        : "text-charcoal hover:bg-warm-beige"
                    }`}
                  >
                    <p className="font-medium whitespace-nowrap lg:whitespace-normal">
                      All Posts
                    </p>
                    <p
                      className={`text-xs ${selectedTopic === "all" ? "text-white/70" : "text-medium-gray"}`}
                    >
                      {posts.length} discussions
                    </p>
                  </button>
                  {topics.map((topic) => {
                    const count = posts.filter(
                      (p) => p.topic === topic.id,
                    ).length;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id)}
                        className={`flex-shrink-0 lg:flex-shrink p-3 lg:px-4 lg:py-3 rounded-xl transition-all text-left min-w-[120px] lg:min-w-0 ${
                          selectedTopic === topic.id
                            ? "bg-lavender text-white"
                            : "text-charcoal hover:bg-warm-beige"
                        }`}
                      >
                        <p className="font-medium whitespace-nowrap lg:whitespace-normal">
                          {topic.label}
                        </p>
                        <p
                          className={`text-xs ${selectedTopic === topic.id ? "text-white/70" : "text-medium-gray"}`}
                        >
                          {count} posts
                        </p>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card className="bg-mint/10 border-0 shadow-card">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-charcoal flex items-center gap-2">
                  <Shield className="w-5 h-5 text-mint" />
                  Community Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {communityGuidelines.map((guideline, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-charcoal"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-mint flex-shrink-0 mt-1.5" />
                      {guideline}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-medium-gray" />
              <Input
                placeholder="Search discussions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-12 bg-white border-0 shadow-card rounded-xl"
              />
            </div>

            {/* Posts */}
            <div className="space-y-4">
              {filteredPosts.map((post) => (
                <Card
                  key={post.id}
                  className="bg-white border-0 shadow-card card-hover"
                >
                  <CardContent className="p-6">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            post.isAnonymous
                              ? "bg-warm-beige"
                              : "bg-lavender/20"
                          }`}
                        >
                          {post.isAnonymous ? (
                            <EyeOff className="w-5 h-5 text-medium-gray" />
                          ) : (
                            <User className="w-5 h-5 text-lavender" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-charcoal">
                            {post.isAnonymous ? "Anonymous" : post.author}
                          </p>
                          <p className="text-sm text-medium-gray">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-warm-beige text-charcoal border-0">
                        {topicLabels[post.topic]}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <h3 className="text-lg font-semibold text-charcoal mb-2">
                      {post.title}
                    </h3>
                    <p className="text-medium-gray mb-4 line-clamp-3">
                      {post.content}
                    </p>

                    {/* Post Actions */}
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => handleAddReaction(post.id)}
                        className="flex items-center gap-2 text-medium-gray hover:text-lavender transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                        <span className="text-sm">{post.reactions}</span>
                      </button>
                      <button
                        onClick={() =>
                          setSelectedPost(
                            selectedPost?.id === post.id ? null : post,
                          )
                        }
                        className="flex items-center gap-2 text-medium-gray hover:text-lavender transition-colors"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span className="text-sm">
                          {post.replies.length} replies
                        </span>
                      </button>
                    </div>

                    {/* Replies */}
                    {selectedPost?.id === post.id && (
                      <div className="mt-6 pt-6 border-t border-light-gray">
                        <div className="space-y-4 mb-4">
                          {post.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                  reply.isAnonymous
                                    ? "bg-warm-beige"
                                    : "bg-soft-blue/20"
                                }`}
                              >
                                {reply.isAnonymous ? (
                                  <EyeOff className="w-4 h-4 text-medium-gray" />
                                ) : (
                                  <User className="w-4 h-4 text-soft-blue" />
                                )}
                              </div>
                              <div className="flex-1 bg-warm-beige rounded-xl p-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-medium text-charcoal text-sm">
                                    {reply.isAnonymous
                                      ? "Anonymous"
                                      : reply.author}
                                  </span>
                                  <span className="text-xs text-medium-gray">
                                    {formatDate(reply.createdAt)}
                                  </span>
                                </div>
                                <p className="text-charcoal text-sm">
                                  {reply.content}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Reply Input */}
                        <div className="flex gap-3">
                          <div className="w-8 h-8 rounded-full bg-lavender/20 flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-lavender" />
                          </div>
                          <div className="flex-1 flex gap-2">
                            <Input
                              placeholder="Write a supportive reply..."
                              value={replyContent}
                              onChange={(e) => setReplyContent(e.target.value)}
                              className="flex-1 rounded-xl"
                            />
                            <Button
                              onClick={() => handleReply(post.id)}
                              className="bg-lavender hover:bg-deep-lavender"
                              disabled={!replyContent.trim()}
                            >
                              <Send className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Empty State */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-16 bg-white rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-warm-beige flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-10 h-10 text-medium-gray" />
                </div>
                <h3 className="text-xl font-semibold text-charcoal mb-2">
                  No posts found
                </h3>
                <p className="text-medium-gray mb-4">
                  Be the first to start a discussion in this topic
                </p>
                <Button
                  onClick={() => setIsPostDialogOpen(true)}
                  className="bg-lavender hover:bg-deep-lavender"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
