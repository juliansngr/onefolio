"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CheckCircle,
  Star,
  Globe,
  BarChart3,
  Shield,
  Smartphone,
  Edit,
  Mail,
  ArrowRight,
  Sparkles,
  Folder,
} from "lucide-react";
import Image from "next/image";
import { addToWaitinglist } from "@/components/actions";
import { toast } from "sonner";

// Mock data for social proof
const earlyUsers = [
  {
    name: "Mike Rodriguez",
    role: "Developer",
    avatar: "/images/social-proof/1.jpg",
  },
  {
    name: "Sarah Chen",
    role: "UX Designer",
    avatar: "/images/social-proof/2.jpg",
  },
  {
    name: "Emma Wilson",
    role: "Product Manager",
    avatar: "/images/social-proof/3.jpg",
  },
  {
    name: "David Kim",
    role: "Freelancer",
    avatar: "/images/social-proof/4.jpg",
  },
  {
    name: "Lisa Thompson",
    role: "Designer",
    avatar: "/images/social-proof/5.jpg",
  },
];

const features = [
  {
    icon: <Edit className="w-6 h-6" />,
    title: "Drag & Drop Editor",
    description:
      "Build your portfolio in minutes with our intuitive visual editor",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Custom Domains",
    description: "Use your own domain to create a professional presence",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track visitors, views, and contact submissions in real-time",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Responsive",
    description: "Your portfolio looks perfect on all devices automatically",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Contact Management",
    description: "Manage inquiries and leads from potential clients",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "SSL & Security",
    description: "Enterprise-grade security with automatic SSL certificates",
  },
];

const testimonials = [
  {
    text: "Finally, a portfolio builder that doesn't require coding skills but still gives me full control over the design.",
    author: "Alex Johnson",
    role: "Full Stack Developer",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    text: "The analytics feature is incredible. I can see exactly how my portfolio is performing and optimize accordingly.",
    author: "Maria Garcia",
    role: "UX Designer",
    avatar: "/placeholder.svg?height=48&width=48",
  },
  {
    text: "I got my first client within a week of launching my portfolio. The contact management system is so helpful.",
    author: "James Wilson",
    role: "Freelance Developer",
    avatar: "/placeholder.svg?height=48&width=48",
  },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e, scrollToTop = false) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const response = await addToWaitinglist(email);

    if (response.error) {
      toast.error(response.error.message);
      setIsLoading(false);
      return;
    }
    if (scrollToTop) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-pink-400 to-purple-600">
      {/* Header */}
      <div className="relative">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center">
                <Image
                  src="/images/onefolio-main-icon-white.webp"
                  alt="onefolio"
                  width={40}
                  height={40}
                />
              </div>
              <span className="text-2xl font-bold text-white">onefolio.</span>
            </div>
            <Badge className="bg-white/20 text-white border-white/30 backdrop-blur-sm">
              <Sparkles className="w-3 h-3 mr-1" />
              Coming Soon
            </Badge>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h1 className="text-6xl font-bold text-white mb-8 leading-tight">
          Build Your Professional
          <br />
          Portfolio in Minutes
        </h1>
        <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
          The easiest way to create a stunning portfolio that showcases your
          work, attracts clients, and grows your career. No coding required.
        </p>

        {/* Waitlist Form */}
        <Card className="max-w-md mx-auto mb-12 bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="p-8">
            {isSubmitted ? (
              <div className="text-center space-y-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    You're on the list! 🎉
                  </h3>
                  <p className="text-white/80">
                    We'll notify you as soon as onefolio launches. Get ready to
                    build something amazing!
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white text-gray-900 hover:bg-white/90 font-semibold"
                >
                  {isLoading ? (
                    "Joining..."
                  ) : (
                    <>
                      Get Early Access
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
                <p className="text-sm text-white/70">
                  Join <strong>147</strong> others waiting for launch
                </p>
              </form>
            )}
          </CardContent>
        </Card>

        {/* Social Proof */}
        <div className="flex items-center justify-center gap-6 mb-16">
          <div className="flex -space-x-3">
            {earlyUsers.map((user, index) => (
              <Avatar
                key={index}
                className="w-12 h-12 border-2 border-white/30"
              >
                <AvatarImage src={user.avatar} />
                <AvatarFallback className="bg-white/20 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            ))}
          </div>
          <div className="text-left">
            <p className="font-semibold text-white">
              147+ professionals waiting
            </p>
            <p className="text-sm text-white/70">Join the community</p>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything you need to stand out
            </h2>
            <p className="text-xl text-gray-600">
              Professional tools that help you create and grow your online
              presence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-pink-400 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <div className="text-white">{feature.icon}</div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Loved by professionals worldwide
            </h2>
            <p className="text-xl text-gray-600">
              See what early beta users are saying about onefolio
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 text-lg leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage
                        src={testimonial.avatar || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {testimonial.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Preview */}
      {/* <div className="bg-white">
        <div className="max-w-4xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you're ready to go pro
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> */}
      {/* Free Plan */}
      {/* <Card className="border-2 border-gray-200">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Free
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Perfect for getting started
                  </p>
                  <div className="text-4xl font-bold text-gray-900">$0</div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic portfolio widgets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>onefolio subdomain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Basic analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Contact form</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full bg-transparent">
                  Start Free
                </Button>
              </CardContent>
            </Card> */}

      {/* Pro Plan */}
      {/* <Card className="border-2 border-purple-300 relative bg-gradient-to-br from-purple-50 to-pink-50">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-orange-400 to-purple-600 text-white px-4 py-1">
                  Most Popular
                </Badge>
              </div>
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Pro</h3>
                  <p className="text-gray-600 mb-4">
                    For serious professionals
                  </p>
                  <div className="flex items-center justify-center gap-2">
                    <div className="text-4xl font-bold text-gray-900">$9</div>
                    <Badge className="bg-green-100 text-green-800">
                      50% OFF
                    </Badge>
                  </div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Unlimited portfolio widgets</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Custom domain connection</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Priority support</span>
                  </div>
                </div>
                <Button className="w-full bg-gradient-to-r from-orange-400 to-purple-600 text-white hover:opacity-90">
                  Get Early Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div> */}

      {/* Final CTA */}
      <div className="bg-gradient-to-br from-orange-400 via-pink-400 to-purple-600">
        <div className="max-w-4xl mx-auto px-6 py-20 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to build your dream portfolio?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who are already waiting for the
            future of portfolio building.
          </p>
          {!isSubmitted && (
            <div className="max-w-md mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit(e, true);
                }}
                className="flex gap-4"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm"
                  required
                />
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-white text-gray-900 hover:bg-white/90 whitespace-nowrap font-semibold"
                >
                  {isLoading ? "Joining..." : "Get Early Access"}
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-white border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex items-center justify-center">
            <div className="flex items-center gap-3">
              <Image
                src="/images/onefolio-main-icon.webp"
                alt="onefolio"
                width={24}
                height={24}
              />
              <span className="font-bold text-gray-900">onefolio.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
