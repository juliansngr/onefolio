"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  Scale,
  Shield,
  User,
  Mail,
  Phone,
  Building2,
  FileText,
  ExternalLink,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function ImprintPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    // Visibility animation cycle
    const visibilityInterval = setInterval(() => {
      setIsVisible((prev) => !prev);
    }, 8000);

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearInterval(visibilityInterval);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Mouse-following Gradient Orbs */}
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
          className={`absolute w-80 h-80 bg-gradient-to-r from-yellow-400/25 to-pink-600/25 rounded-full mix-blend-multiply filter blur-3xl transition-all duration-1500 ease-out ${
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
          className={`absolute w-72 h-72 bg-gradient-to-r from-green-400/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-2xl transition-all duration-2000 ease-out ${
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

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNlMmU4ZjAiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIvPjwvZz48L2c+PC9zdmc+')] opacity-40"></div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-200/60 transition-all duration-300">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-6">
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hover:bg-slate-100 transition-all duration-300 hover:scale-105"
            >
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Link>
            </Button>
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
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center space-y-6 mb-12">
              <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
                <Scale className="w-4 h-4 mr-2" />
                Legal Information
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900">
                Legal Notice
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Information in accordance with legal requirements and
                responsible for content
              </p>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="grid gap-8">
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors duration-300">
                      Service Provider
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">
                      Julian Dürr c/o Block Services
                    </h3>
                    <p className="text-slate-600">onefol.io</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Building2 className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-slate-700">Stuttgarter Str. 106</p>
                      <p className="text-slate-700">70736 Fellbach</p>
                      <p className="text-slate-700">Germany</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Kontaktdaten */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Mail className="w-5 h-5 text-green-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-green-600 transition-colors duration-300">
                      Contact Information
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <a
                      href="mailto:contact@onefolio.demo"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline"
                    >
                      contact@onefol.io
                    </a>
                  </div>
                  {/* <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <a
                      href="tel:+1234567890"
                      className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline"
                    >
                      +1 (234) 567-890
                    </a>
                  </div> */}
                </CardContent>
              </Card>

              {/* EU-Streitschlichtung */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Shield className="w-5 h-5 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors duration-300">
                      Dispute Resolution
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    The European Commission provides a platform for online
                    dispute resolution (ODR) which you can find at:
                  </p>
                  <a
                    href="https://ec.europa.eu/consumers/odr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:underline"
                  >
                    https://ec.europa.eu/consumers/odr/
                    <ExternalLink className="w-4 h-4" />
                  </a>
                  <p className="text-slate-700 leading-relaxed">
                    We are not willing or obligated to participate in dispute
                    resolution proceedings before a consumer arbitration board.
                  </p>
                </CardContent>
              </Card>

              {/* Haftungsausschluss */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                    Disclaimer
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Liability for Content
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      As a service provider, we are responsible for our own
                      content on these pages according to general laws. However,
                      as a service provider, we are not under the obligation to
                      monitor transmitted or stored third-party information or
                      to investigate circumstances that indicate illegal
                      activity.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-800 mb-2">
                      Liability for Links
                    </h3>
                    <p className="text-slate-700 leading-relaxed">
                      Our offer contains links to external third-party websites,
                      over whose contents we have no influence. Therefore, we
                      cannot accept any liability for these external contents.
                      The respective provider or operator of the pages is always
                      responsible for the contents of the linked pages.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Urheberrecht */}
              <Card className="bg-white/70 backdrop-blur-sm border-slate-200/60 shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-[1.02] group">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl font-bold text-slate-900 group-hover:text-slate-700 transition-colors duration-300">
                    Copyright
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-700 leading-relaxed">
                    The content and works created by the site operators on these
                    pages are subject to copyright law. The reproduction,
                    editing, distribution and any kind of exploitation outside
                    the limits of copyright law require the written consent of
                    the respective author or creator. Downloads and copies of
                    this page are only permitted for private, non-commercial
                    use.
                  </p>
                </CardContent>
              </Card>

              {/* Rechtswirksamkeit */}
              <Card className="bg-gradient-to-br from-slate-100 to-slate-50 border-slate-200/60 shadow-lg">
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Should individual provisions of this legal notice be or
                      become invalid in whole or in part, this shall not affect
                      the validity of the remaining provisions.
                    </p>
                    <p className="text-xs text-slate-500 mt-4">
                      Last updated:{" "}
                      {new Date().toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 py-8 bg-white/50 backdrop-blur-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0 group">
              <div className="transition-transform duration-300 group-hover:scale-110">
                <Image
                  src="/images/onefolio-main-icon.webp"
                  alt="onefolio logo"
                  width={24}
                  height={24}
                />
              </div>
              <span className="text-lg font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
                onefolio
              </span>
            </div>
            <div className="text-sm text-slate-500">
              © {new Date().getFullYear()} onefolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      <style jsx>{`
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
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
