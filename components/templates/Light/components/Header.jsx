import { Button } from "@/components/ui/button";
import { Download, Folder, Mail } from "lucide-react";

export default function Header({ data }) {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Folder className="h-8 w-8 text-purple-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
              {data.name}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex bg-transparent"
            >
              <Download className="w-4 h-4 mr-2" />
              Download CV
            </Button>
            <Button
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-purple-600 text-white"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Me
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
