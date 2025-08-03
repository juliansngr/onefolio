"use client";

import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
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
              { name: "How It Works", href: "#how-it-works" },
              { name: "Features", href: "#features" },
            ].map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-all duration-300 hover:scale-105 relative group cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(item.href)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} onefolio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
