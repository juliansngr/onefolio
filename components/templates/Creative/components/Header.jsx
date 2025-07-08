import { Button } from "@/components/ui/button";
import { Zap, Download, Palette } from "lucide-react";

export default function Header({ data }) {
  return (
    <header className="relative z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform">
              <Palette className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
              {data.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex border-cyan-200 text-cyan-700 hover:bg-cyan-50 bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Resume
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105 transition-all"
            >
              <Zap className="w-4 h-4 mr-2" />
              Let's Chat!
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
