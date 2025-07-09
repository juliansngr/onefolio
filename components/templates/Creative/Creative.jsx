"use client";

import { Button } from "@/components/ui/button";
import WidgetRenderer from "./components/utils/WidgetRenderer";
// import { widgets } from "../dummyData";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  ExternalLink,
  Download,
  Star,
  Heart,
  Folder,
  Zap,
  Palette,
  Code,
  Lightbulb,
  Target,
  Rocket,
} from "lucide-react";

export default function CreativePortfolioPage({ data, userId, portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse delay-500"></div>

      {/* Header */}
      {/* <Header name={portfolioData.about.name} /> */}

      {data
        .sort((a, b) => a.position - b.position)
        .map((widget) => {
          return (
            <WidgetRenderer
              widget={widget}
              key={widget.type}
              // userId={userId}
              // portfolioId={portfolio.id}
              // theme={portfolio.theme}
            />
          );
        })}

      {/* Footer */}
      {/* <footer className="bg-gray-900 text-white relative z-10">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">
                {portfolioData.about.name}
              </span>
            </div>

            <div className="flex items-center gap-4">
              {portfolioData.social.map((social, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2 text-gray-400">
              <Heart className="w-4 h-4 text-red-500" />
              <span>
                Made with
                <a
                  href="https://onefolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-gray-300"
                >
                  onefolio
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
