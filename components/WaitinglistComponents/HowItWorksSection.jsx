import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function HowItWorksSection() {
  return (
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
                  Easily add your projects, experience, and personal information
                  with our intuitive editor
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
                  Publish your portfolio instantly and share it with the world.
                  No technical skills required
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
                  Easily add your projects, experience, and personal information
                  with our intuitive editor
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
                  Publish your portfolio instantly and share it with the world.
                  No technical skills required
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
  );
}
