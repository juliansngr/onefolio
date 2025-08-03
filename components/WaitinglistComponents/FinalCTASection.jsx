"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Star, ArrowRight } from "lucide-react";
import { addToWaitinglist } from "@/components/actions";
import { toast } from "sonner";

export default function FinalCTASection({ isSubmitted: parentIsSubmitted }) {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    const response = await addToWaitinglist(email);

    if (response.error) {
      toast.error(response.error.message);
      setIsLoading(false);
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsSubmitted(true);
    setIsLoading(false);
  };

  return (
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

              {!isSubmitted && !parentIsSubmitted && (
                <div className="max-w-md mx-auto w-full">
                  <form
                    onSubmit={handleSubmit}
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
  );
}
