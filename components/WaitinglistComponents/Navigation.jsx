import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navigation() {
  return (
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
          <a
            href="#how-it-works"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
          >
            How It Works
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
          <a
            href="#features"
            className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
          </a>
        </nav>
      </div>
    </header>
  );
}
