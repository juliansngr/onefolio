"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Folder,
  ArrowRight,
  Check,
  Share2,
  DropletsIcon as DragDropIcon,
  Shield,
  UserPlus,
  PenTool,
  Send,
  BarChart3,
  Globe,
  Link as LinkIcon,
  Sparkles,
  Layout,
  Zap,
  Star,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Visibility animation cycle
    const visibilityInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(visibilityInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Mouse-following Gradient Orbs */}
        <div
          className={`absolute w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-30"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x - 10))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y - 10))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.8 + mousePosition.x / 500
            })`,
          }}
        ></div>

        <div
          className={`absolute w-80 h-80 bg-gradient-to-r from-yellow-400/25 to-pink-600/25 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1500 ease-out ${
            isVisible ? "opacity-70" : "opacity-20"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, 100 - mousePosition.x + 10))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y + 20))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.9 + mousePosition.y / 400
            }) rotate(${mousePosition.x / 5}deg)`,
          }}
        ></div>

        <div
          className={`absolute w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-2000 ease-out ${
            isVisible ? "opacity-80" : "opacity-40"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x + 30))}%`,
            top: `${Math.max(0, Math.min(85, 100 - mousePosition.y + 15))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.7 + mousePosition.x / 600
            }) rotate(${-mousePosition.y / 3}deg)`,
          }}
        ></div>

        {/* Additional floating orb that appears on hover */}
        <div
          className={`absolute w-64 h-64 bg-gradient-to-r from-purple-400/15 to-indigo-600/15 rounded-full mix-blend-multiply filter blur-xl transition-all duration-700 ease-out ${
            isVisible ? "opacity-60" : "opacity-10"
          }`}
          style={{
            left: `${Math.max(0, Math.min(85, mousePosition.x / 2 + 25))}%`,
            top: `${Math.max(0, Math.min(85, mousePosition.y / 2 + 35))}%`,
            transform: `translate(-50%, -50%) scale(${
              0.5 + mousePosition.y / 800
            })`,
          }}
        ></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-blue-400/20 rounded-full transition-all duration-1000 ease-out ${
                isVisible ? "opacity-100" : "opacity-20"
              }`}
              style={{
                left: `${(i * 17 + mousePosition.x / 10) % 100}%`,
                top: `${(i * 23 + mousePosition.y / 15) % 100}%`,
                transform: `scale(${
                  0.5 + (mousePosition.x + mousePosition.y) / 400
                })`,
                animationDelay: `${i * 0.2}s`,
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2 group">
            <div className="transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/images/onefolio-main-icon.webp"
                alt="onefolio logo"
                width={32}
                height={32}
              />
            </div>
            <span className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
              onefolio
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Features
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Pricing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link
              href="/blog"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
            >
              Blog
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block transition-all duration-300 hover:scale-105"
            >
              Sign in
            </Link>
            <Button
              asChild
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              <Link href="/auth/sign-up">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32 overflow-hidden">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-blue-600 animate-pulse" />
                Build portfolios in minutes
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
                  Create
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 animate-gradient-x">
                    Professional
                  </span>
                  <br />
                  Portfolios
                </h1>
              </div>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed animate-fade-in-up animation-delay-400">
                Build stunning portfolios with our intuitive drag-and-drop
                editor. Choose from beautiful themes and powerful widgets to
                showcase your work.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in-up animation-delay-600">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group"
                  asChild
                >
                  <Link href="/auth/sign-up">
                    Start Building
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8 py-3 text-lg bg-white/70 backdrop-blur-sm border-slate-200 hover:bg-white transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                  asChild
                >
                  <Link href="#features">
                    See Features
                    <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-y-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Feature Preview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-800 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Layout className="w-6 h-6 text-blue-600 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-blue-600">
                    Beautiful Themes
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Choose from professionally designed themes that make your
                    work shine
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-1000 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Zap className="w-6 h-6 text-green-600 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-green-600">
                    Drag & Drop Builder
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Easily customize your portfolio with our intuitive visual
                    editor
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up animation-delay-1200 group">
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <BarChart3 className="w-6 h-6 text-purple-600 transition-transform duration-300" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-purple-600">
                    Advanced Analytics
                  </h3>
                  <p className="text-slate-600 text-sm">
                    Track visitors and analyze performance with detailed
                    insights
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="features" className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                How it works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Build your portfolio in 3 simple steps
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our streamlined process gets you from idea to published
                portfolio in minutes
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Step 1 */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative group p-0">
                <div className="absolute -top-4 left-6 transition-transform duration-300 group-hover:scale-110 z-10">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    1
                  </div>
                </div>

                <CardContent className="p-8 pt-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Layout className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                    Choose Your Theme
                  </h3>
                  <p className="text-slate-600">
                    Start with one of our professionally designed themes. Each
                    theme is crafted for different industries and personal
                    styles.
                  </p>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative group">
                <div className="absolute -top-4 left-6 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    2
                  </div>
                </div>
                <CardContent className="p-8 pt-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <PenTool className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
                    Add Content
                  </h3>
                  <p className="text-slate-600">
                    Use our drag-and-drop editor to add widgets like project
                    galleries, contact forms, skills charts, and more.
                  </p>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 relative group">
                <div className="absolute -top-4 left-6 transition-transform duration-300 group-hover:scale-110">
                  <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold shadow-lg">
                    3
                  </div>
                </div>
                <CardContent className="p-8 pt-10">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Send className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-purple-600">
                    Publish & Share
                  </h3>
                  <p className="text-slate-600">
                    Publish your portfolio with a custom domain or subdomain and
                    start sharing your work with the world.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-green-100 text-green-700 border-green-200 mb-4 hover:scale-105 transition-transform duration-300">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Everything you need to stand out
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Powerful features designed to help you create professional
                portfolios
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: Globe,
                  title: "Custom Domains",
                  desc: "Connect your own domain to create a professional presence",
                  color: "blue",
                },
                {
                  icon: BarChart3,
                  title: "Analytics Dashboard",
                  desc: "Track visitors, page views, and engagement metrics",
                  color: "green",
                },
                {
                  icon: LinkIcon,
                  title: "Link Tracking",
                  desc: "Monitor clicks and track the performance of your shared links",
                  color: "purple",
                },
                {
                  icon: Share2,
                  title: "Contact Forms",
                  desc: "Receive inquiries directly through your portfolio",
                  color: "orange",
                },
                {
                  icon: Folder,
                  title: "Project Galleries",
                  desc: "Showcase your work with beautiful image galleries",
                  color: "pink",
                },
                {
                  icon: Shield,
                  title: "SSL Security",
                  desc: "Your portfolio is secure with automatic SSL certificates",
                  color: "indigo",
                },
              ].map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 group"
                >
                  <CardContent className="p-6">
                    <div
                      className={`w-12 h-12 bg-gradient-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                    >
                      <feature.icon
                        className={`w-6 h-6 text-${feature.color}-600`}
                      />
                    </div>
                    <h3
                      className={`text-lg font-semibold text-slate-900 mb-2 transition-colors duration-300 group-hover:text-${feature.color}-600`}
                    >
                      {feature.title}
                    </h3>
                    <p className="text-slate-600 text-sm">{feature.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-purple-100 text-purple-700 border-purple-200 mb-4 hover:scale-105 transition-transform duration-300">
                Pricing
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Simple, transparent pricing
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Start for free, upgrade when you need more features
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Free Plan */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 group">
                <CardHeader className="pb-8 pt-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        Starter
                      </CardTitle>
                      <CardDescription className="text-slate-600 mt-2">
                        Perfect for getting started
                      </CardDescription>
                    </div>
                  </div>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      $0
                    </span>
                    <span className="ml-2 text-lg font-medium text-slate-500">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-8">
                  {[
                    "Unlimited portfolios",
                    "Basic themes",
                    "onefol.io subdomain",
                    "Community support",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-slate-700 transition-colors duration-300 group-hover/item:text-slate-900">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200 transition-all duration-300 hover:scale-105 group/btn"
                  >
                    <Link href="/auth/sign-up">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card className="bg-white/70 backdrop-blur-sm border-blue-200/60 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative ring-2 ring-blue-200 group">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 transition-transform duration-300 group-hover:scale-110">
                  <Badge className="bg-blue-600 text-white px-4 py-1 shadow-lg">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="pb-8 pt-8">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                        Professional
                      </CardTitle>
                      <CardDescription className="text-slate-600 mt-2">
                        For serious professionals
                      </CardDescription>
                    </div>
                  </div>
                  <div className="mt-6 flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      $4.99
                    </span>
                    <span className="ml-2 text-lg font-medium text-slate-500">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 pb-8">
                  {[
                    "Everything in Starter",
                    "Custom domain support",
                    "Advanced analytics",
                    "Custom tracking links",
                    "Priority support",
                    "Remove branding",
                  ].map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 group/item"
                    >
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center transition-all duration-300 group-hover/item:scale-110">
                        <Check className="w-3 h-3 text-green-600" />
                      </div>
                      <span className="text-slate-700 transition-colors duration-300 group-hover/item:text-slate-900">
                        {feature}
                      </span>
                    </div>
                  ))}
                </CardContent>
                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white transition-all duration-300 hover:scale-105 shadow-lg group/btn"
                  >
                    <Link href="/auth/sign-up">
                      Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="text-center mb-16">
              <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200 mb-4 hover:scale-105 transition-transform duration-300">
                FAQ
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Frequently asked questions
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Everything you need to know about onefolio
              </p>
            </div>

            <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-300">
              <CardContent className="p-8">
                <Accordion type="single" collapsible className="w-full">
                  {[
                    {
                      q: "Do I need coding skills to use onefolio?",
                      a: "Not at all! onefolio is designed to be completely code-free. Our intuitive drag-and-drop editor makes it possible for anyone to create beautiful portfolios without any technical knowledge.",
                    },
                    {
                      q: "Can I use my own domain name?",
                      a: "Yes, Professional plan users can connect their own custom domain to their onefolio portfolios. Free users get a onefol.io subdomain.",
                    },
                    {
                      q: "How many portfolios can I create?",
                      a: "You can create unlimited portfolios on both the Free and Professional plans. However, only one portfolio can be active at a time.",
                    },
                    {
                      q: "Is there a limit to how many projects I can showcase?",
                      a: "There's no limit to the number of projects you can showcase in your portfolios on either plan. Add as many projects as you need.",
                    },
                    {
                      q: "Can I cancel my subscription anytime?",
                      a: "Yes, you can cancel your Professional subscription at any time. Your Pro features will remain active until the end of your billing period.",
                    },
                  ].map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`item-${index + 1}`}
                      className="border-slate-200/60 hover:bg-slate-50/50 transition-colors duration-300 rounded-lg px-2"
                    >
                      <AccordionTrigger className="text-left hover:no-underline transition-colors duration-300 hover:text-blue-600">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-slate-700 shadow-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 animate-gradient-x"></div>

              <CardContent className="p-12 text-center relative z-10">
                <div className="flex flex-col items-center space-y-8">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">
                    Ready to showcase your work?
                  </h2>
                  <p className="max-w-2xl text-xl text-slate-300">
                    Join thousands of professionals who trust onefolio to
                    showcase their work. Start building your portfolio today.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      size="lg"
                      className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg group/btn"
                      asChild
                    >
                      <Link href="/auth/sign-up">
                        Get Started for Free
                        <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg transition-all duration-300 hover:scale-105"
                    >
                      View Examples
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-12 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-6 md:mb-0 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/onefolio-main-icon.webp"
                  alt="onefolio logo"
                  width={32}
                  height={32}
                />
              </div>
              <span className="text-2xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                onefolio
              </span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-8 gap-y-2 mb-6 md:mb-0">
              {["Features", "Pricing", "Blog", "Sign In"].map((item, index) => (
                <Link
                  key={index}
                  href={
                    item === "Sign In"
                      ? "/auth/login"
                      : `#${item.toLowerCase()}`
                  }
                  className="text-sm text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
            </nav>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} onefolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        @keyframes gradient-x {
          0%,
          100% {
            transform: translateX(0%);
          }
          50% {
            transform: translateX(100%);
          }
        }
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          animation-fill-mode: both;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          animation-fill-mode: both;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          animation-fill-mode: both;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          animation-fill-mode: both;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          animation-fill-mode: both;
        }
        .animation-delay-1200 {
          animation-delay: 1.2s;
          animation-fill-mode: both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
