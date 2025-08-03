"use client";

import { useState } from "react";
import {
  Navigation,
  HeroSection,
  DashboardDemo,
  HowItWorksSection,
  FeaturesSection,
  ChallengesSection,
  FinalCTASection,
  Footer,
  WaitinglistStyles,
  AnimatedBackground,
} from "./WaitinglistComponents";

export default function WaitlistPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      <WaitinglistStyles />
      <AnimatedBackground />

      <Navigation />

      <main className="relative z-10">
        <HeroSection />

        <DashboardDemo />

        <div id="how-it-works">
          <HowItWorksSection />
        </div>

        <ChallengesSection />

        <div id="features">
          <FeaturesSection />
        </div>
        <FinalCTASection isSubmitted={isSubmitted} />
      </main>

      <Footer />
    </div>
  );
}
