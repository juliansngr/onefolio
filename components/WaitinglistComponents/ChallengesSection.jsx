import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Eye, Users } from "lucide-react";

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

export default function ChallengesSection() {
  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="bg-red-100 text-red-700 border-red-200 mb-4 hover:scale-105 transition-transform duration-300">
            The Problem
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Current portfolio solutions fall short
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Most professionals struggle with outdated, limited, and ineffective
            portfolio platforms
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
  );
}
