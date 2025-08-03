"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

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
  ChevronDown,
  Zap,
  Users,
  TrendingUp,
  Eye,
  Clock,
  Target,
} from "lucide-react";
import Image from "next/image";
import { addToWaitinglist } from "@/components/actions";
import { toast } from "sonner";
import Link from "next/link";

const portfolioStats = [
  {
    stat: "87%",
    description: "of hiring managers check portfolios before making decisions",
    source: "Industry Research 2024",
    icon: <Eye className="w-8 h-8" />,
    color: "blue",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    stat: "3x",
    description: "more likely to get hired with a professional portfolio",
    source: "Career Study 2024",
    icon: <TrendingUp className="w-8 h-8" />,
    color: "green",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    stat: "67%",
    description: "of professionals struggle to showcase their work effectively",
    source: "Professional Survey 2024",
    icon: <Target className="w-8 h-8" />,
    color: "orange",
    gradient: "from-orange-500 to-red-500",
  },
];

const features = [
  {
    icon: <Edit className="w-6 h-6" />,
    title: "Drag & Drop Editor",
    description:
      "Build your portfolio in minutes with our intuitive visual editor",
    color: "purple",
    gradient: "from-purple-400 to-purple-600",
    delay: "0s",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Custom Domains",
    description: "Use your own domain to create a professional presence",
    color: "blue",
    gradient: "from-blue-400 to-blue-600",
    delay: "0.1s",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track visitors, views, and contact submissions in real-time",
    color: "green",
    gradient: "from-green-400 to-green-600",
    delay: "0.2s",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Responsive",
    description: "Your portfolio looks perfect on all devices automatically",
    color: "pink",
    gradient: "from-pink-400 to-pink-600",
    delay: "0.3s",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Contact Management",
    description: "Manage inquiries and leads from potential clients",
    color: "indigo",
    gradient: "from-indigo-400 to-indigo-600",
    delay: "0.4s",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "SSL & Security",
    description: "Enterprise-grade security with automatic SSL certificates",
    color: "emerald",
    gradient: "from-emerald-400 to-emerald-600",
    delay: "0.5s",
  },
];

const challenges = [
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Outdated Portfolio Platforms",
    description:
      "Most existing solutions are either too complex, outdated, or don't offer the flexibility modern professionals need.",
    gradient: "from-red-400 to-red-600",
    delay: "0s",
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "No Performance Insights",
    description:
      "Traditional portfolio sites don't show you how visitors interact with your work or which projects get the most attention.",
    gradient: "from-orange-400 to-orange-600",
    delay: "0.2s",
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Missed Opportunities",
    description:
      "Without proper contact management, many professionals lose potential clients and collaboration opportunities.",
    gradient: "from-amber-400 to-amber-600",
    delay: "0.4s",
  },
];

export default function WaitlistPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const visibilityInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(visibilityInterval);
    };
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      <div className="fixed inset-0 z-0">
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
          className={`absolute w-80 h-80 bg-gradient-to-r from-pink-400/25 to-purple-600/25 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1500 ease-out ${
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
          className={`absolute w-72 h-72 bg-gradient-to-r from-indigo-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-2000 ease-out ${
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

        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>

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
          <Badge className="bg-orange-100 text-orange-700 border-orange-200 hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-3 h-3 mr-1" />
            Coming Soon
          </Badge>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        <section className="relative pt-12 pb-20 md:pt-16 md:pb-32 overflow-hidden">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
            <div className="text-center space-y-8 mb-16">
              <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-slate-200/60 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-orange-600 animate-pulse" />
                The next generation of portfolio building
              </div>
              <div className="animate-fade-in-up animation-delay-200">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 leading-tight">
                  Build Your
                  <br />
                  <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    Professional
                    <svg
                      className="absolute h-6"
                      style={{ bottom: "-12px", left: "-10px", width: "110%" }}
                      viewBox="0 0 650 24"
                      fill="none"
                    >
                      <defs>
                        <linearGradient
                          id="underlineGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="0%"
                        >
                          <stop offset="0%" stopColor="#60a5fa" />
                          <stop offset="100%" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M2,16 Q35,12 75,15 Q115,18 155,14 Q175,10 195,14 Q215,18 235,12 Q255,8 275,12 Q315,16 355,13 Q395,10 435,12 Q465,15 495,13 Q525,10 555,12 Q580,15 610,13 Q630,11 640,14"
                        stroke="url(#underlineGradient)"
                        strokeWidth="4.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        className="animate-draw-svg"
                      />
                    </svg>
                  </span>
                  <br />
                  <span className="relative">Portfolio</span>
                </h1>
              </div>
              <p className="max-w-2xl mx-auto text-xl text-slate-600 leading-relaxed animate-fade-in-up animation-delay-400">
                A modern portfolio platform designed for today's professionals.
                Showcase your work beautifully, connect with opportunities, and
                build your career - all without touching a line of code.
              </p>

              <div className="max-w-md mx-auto mb-12 animate-fade-in-up animation-delay-600">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                  <CardContent className="p-8 relative z-10">
                    {isSubmitted ? (
                      <div className="text-center space-y-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-float">
                          <CheckCircle className="w-8 h-8 text-white" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            You're on the list! 🎉
                          </h3>
                          <p className="text-slate-600">
                            We'll notify you as soon as onefolio launches. Get
                            ready to build something amazing!
                          </p>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="relative">
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-white/80 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20 transition-all duration-300"
                            required
                          />
                          <div className="absolute inset-0 rounded-md bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 focus-within:opacity-100 transition-opacity duration-300 -z-10"></div>
                        </div>
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="w-full min-w-fit bg-gradient-to-r from-slate-800 to-slate-900 hover:from-slate-900 hover:to-black text-white font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn relative overflow-hidden cursor-pointer"
                        >
                          <span className="relative z-10 flex items-center justify-center whitespace-nowrap">
                            {isLoading ? (
                              <span className="flex items-center justify-center">
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                                Joining...
                              </span>
                            ) : (
                              <>
                                Get Early Access
                                <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                              </>
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        </Button>
                        <p className="text-sm text-slate-600 text-center">
                          Be among the first to experience the future of
                          portfolio building ✨
                        </p>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-3 h-3 mr-1" />
                How It Works
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Build Your Portfolio in{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  3 Simple Steps
                </span>
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                From template selection to going live - we've made it incredibly
                simple
              </p>
            </div>

            <div className="hidden md:flex md:items-center md:justify-center md:space-x-4">
              <div className="flex-1 max-w-sm animate-fade-in-up animation-delay-200">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/palette.png"
                        alt="Choose Template"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                      Choose Template
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Pick from our collection of modern, responsive templates
                      designed by professionals
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex-shrink-0 animate-fade-in-up animation-delay-300">
                <svg
                  className="w-8 h-8 text-blue-400 transition-all duration-300 hover:text-blue-600 hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              <div className="flex-1 max-w-sm animate-fade-in-up animation-delay-400">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/pens.png"
                        alt="Add Your Content"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-purple-600">
                      Add Your Content
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Easily add your projects, experience, and personal
                      information with our intuitive editor
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex-shrink-0 animate-fade-in-up animation-delay-500">
                <svg
                  className="w-8 h-8 text-purple-400 transition-all duration-300 hover:text-purple-600 hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </div>

              <div className="flex-1 max-w-sm animate-fade-in-up animation-delay-600">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/rocket.png"
                        alt="Go Live"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
                      Go Live
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Publish your portfolio instantly and share it with the
                      world. No technical skills required
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:hidden">
              <div className="animate-fade-in-up animation-delay-200">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/palette.png"
                        alt="Choose Template"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-blue-600">
                      Choose Template
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Pick from our collection of modern, responsive templates
                      designed by professionals
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center animate-fade-in-up animation-delay-300">
                <svg
                  className="w-8 h-8 text-blue-400 transition-all duration-300 hover:text-blue-600 hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 17l4 4m0 0l4-4m-4 4V3"
                  />
                </svg>
              </div>

              <div className="animate-fade-in-up animation-delay-400">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/pens.png"
                        alt="Add Your Content"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-purple-600">
                      Add Your Content
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Easily add your projects, experience, and personal
                      information with our intuitive editor
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex items-center justify-center animate-fade-in-up animation-delay-500">
                <svg
                  className="w-8 h-8 text-purple-400 transition-all duration-300 hover:text-purple-600 hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 17l4 4m0 0l4-4m-4 4V3"
                  />
                </svg>
              </div>

              <div className="animate-fade-in-up animation-delay-600">
                <Card className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden text-center">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-8 relative z-10">
                    <div className="w-28 h-28 mb-8 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 flex items-center justify-center">
                      <img
                        src="/images/rocket.png"
                        alt="Go Live"
                        className="w-24 h-24 object-contain"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-green-600">
                      Go Live
                    </h3>
                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      Publish your portfolio instantly and share it with the
                      world. No technical skills required
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="text-center mt-12 animate-fade-in-up animation-delay-800">
              <p className="text-lg text-slate-600 mb-4">
                Ready to build your professional portfolio?
              </p>
              <Badge className="bg-orange-100 text-orange-700 border-orange-200 px-4 py-2 hover:scale-105 transition-transform duration-300">
                <Sparkles className="w-4 h-4 mr-2" />
                Coming Soon - Join the Waitlist Above
              </Badge>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/50 backdrop-blur-sm">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                Features
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Built for modern professionals
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                onefolio will offer powerful features designed specifically for
                today's creative and technical professionals
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden"
                  style={{ animationDelay: feature.delay }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  <div className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

                  <CardContent className="p-8 text-center relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl`}
                    >
                      <div className="text-white">{feature.icon}</div>
                    </div>

                    <h3
                      className={`text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 ${
                        feature.color === "purple"
                          ? "group-hover:text-purple-600"
                          : feature.color === "blue"
                          ? "group-hover:text-blue-600"
                          : feature.color === "green"
                          ? "group-hover:text-green-600"
                          : feature.color === "pink"
                          ? "group-hover:text-pink-600"
                          : feature.color === "indigo"
                          ? "group-hover:text-indigo-600"
                          : feature.color === "emerald"
                          ? "group-hover:text-emerald-600"
                          : "group-hover:text-slate-600"
                      }`}
                    >
                      {feature.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      {feature.description}
                    </p>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge
                        className={`bg-gradient-to-r ${feature.gradient} text-white text-xs px-3 py-1`}
                      >
                        Coming Soon
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <Badge className="bg-red-100 text-red-700 border-red-200 mb-4 hover:scale-105 transition-transform duration-300">
                The Problem
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Current portfolio solutions fall short
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Most professionals struggle with outdated, limited, and
                ineffective portfolio platforms
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {challenges.map((challenge, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden"
                  style={{ animationDelay: challenge.delay }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${challenge.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                  ></div>

                  <div className="absolute top-3 right-3 w-2 h-2 bg-red-400 rounded-full opacity-60 animate-pulse"></div>

                  <CardContent className="p-8 text-center relative z-10">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${challenge.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl`}
                    >
                      <div className="text-white">{challenge.icon}</div>
                    </div>

                    <h3 className="text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 group-hover:text-red-600">
                      {challenge.title}
                    </h3>

                    <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                      {challenge.description}
                    </p>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Badge
                        className={`bg-gradient-to-r ${challenge.gradient} text-white text-xs px-3 py-1`}
                      >
                        Current Issue
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-white/50 backdrop-blur-sm relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 opacity-50"></div>

          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10">
            <Card className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border-none shadow-2xl overflow-hidden relative group hover:shadow-3xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 animate-gradient-x"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-500/5 to-purple-500/5"></div>

              <div className="absolute top-8 left-8 w-3 h-3 bg-blue-400 rounded-full opacity-60 animate-pulse"></div>
              <div
                className="absolute top-16 right-12 w-2 h-2 bg-purple-400 rounded-full opacity-40 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute bottom-12 left-16 w-2 h-2 bg-pink-400 rounded-full opacity-50 animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
              <div
                className="absolute bottom-8 right-8 w-3 h-3 bg-cyan-400 rounded-full opacity-60 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>

              <CardContent className="p-12 text-center relative z-10">
                <div className="flex flex-col items-center space-y-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mb-4 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 border border-white/10">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                      <Star className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                    Ready for a{" "}
                    <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x">
                      better
                    </span>{" "}
                    portfolio solution?
                  </h2>

                  <p className="max-w-2xl text-xl text-slate-300 leading-relaxed">
                    Be notified when onefolio launches and experience the next
                    generation of professional portfolio building.
                  </p>

                  {!isSubmitted && (
                    <div className="max-w-md mx-auto w-full">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSubmit(e, true);
                        }}
                        className="flex flex-col sm:flex-row gap-4"
                      >
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="bg-white/20 border-white/30 text-white placeholder:text-white/60 backdrop-blur-sm focus:bg-white/30 transition-all duration-300 focus:border-white/50"
                          required
                        />
                        <Button
                          type="submit"
                          disabled={isLoading}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none whitespace-nowrap font-semibold transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group/btn cursor-pointer"
                        >
                          {isLoading ? (
                            <span className="flex items-center">
                              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                              Joining...
                            </span>
                          ) : (
                            <>
                              Get Early Access
                              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

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
              {[
                { label: "Features", href: "#features" },
                { label: "Pricing", href: "#pricing" },
                { label: "Blog", href: "/blog" },
                { label: "Imprint", href: "/imprint" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="text-sm text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
                >
                  {item.label}
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
        @keyframes glow {
          0%,
          100% {
            box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
          }
          50% {
            box-shadow: 0 0 40px rgba(147, 51, 234, 0.7);
          }
        }
        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes draw-underline {
          0% {
            width: 0%;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            width: 100%;
            opacity: 1;
          }
        }
        @keyframes draw-svg {
          0% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 1000;
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            stroke-dasharray: 1000;
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 4s ease infinite;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        .animate-draw-svg {
          animation: draw-svg 2s ease-out 0.8s both;
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
        .animation-delay-500 {
          animation-delay: 0.5s;
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
        .card-hover-effect {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .card-hover-effect:hover {
          transform: translateY(-8px) scale(1.02);
        }
        .glassmorphism {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        .hover\\:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  );
}
