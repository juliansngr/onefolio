"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, ArrowRight, Sparkles } from "lucide-react";
import { addToWaitinglist } from "@/components/actions";
import { toast } from "sonner";

export default function HeroSection() {
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
    <>
      <style jsx>{`
        @keyframes tooltipPulse {
          0%,
          100% {
            transform: rotate(-12deg) scale(1);
          }
          50% {
            transform: rotate(-12deg) scale(1.1);
          }
        }
        .minecraft-tooltip {
          animation: tooltipPulse 2s ease-in-out infinite;
        }
      `}</style>
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
                <span
                  className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600"
                  style={{ letterSpacing: "0.01em" }}
                >
                  Professional
                </span>
                <br />
                <span className="relative">
                  Portfolio
                  <span className="inline-block ml-2 sm:ml-4 relative">
                    <span
                      className="minecraft-tooltip absolute -top-8 sm:-top-10 -left-3 sm:-left-5 bg-yellow-300 text-black px-1 sm:px-3 lg:px-4 py-1 sm:py-2 text-xs sm:text-base lg:text-lg font-bold shadow-xl border-2 border-yellow-600"
                      style={{
                        fontFamily: "monospace",
                        letterSpacing: "0.1em",
                        whiteSpace: "nowrap",
                      }}
                    >
                      in minutes
                      <div className="absolute -bottom-2 left-4 sm:left-6 w-3 h-3 sm:w-4 sm:h-4 bg-yellow-300 border-r-2 border-b-2 border-yellow-600 transform rotate-45"></div>
                    </span>
                  </span>
                </span>
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
                        Be among the first to experience the future of portfolio
                        building ✨
                      </p>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
