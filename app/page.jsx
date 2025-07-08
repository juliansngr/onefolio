import Link from "next/link";
import Image from "next/image";
import {
  Folder,
  ArrowRight,
  Check,
  Share2,
  DropletsIcon as DragDropIcon,
  Shield,
  UserPlus,
  PenTool,
  Send,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-40 w-full bg-white border-b shadow-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <Image
              src="/images/onefolio-main-icon.webp"
              alt="onefolio logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-bold text-slate-900">onefolio</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Features
            </Link>
            <Link
              href="#showcase"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Showcase
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900 hidden md:block"
            >
              Sign in
            </Link>
            <Button
              asChild
              className="bg-slate-900 hover:bg-slate-800 text-white px-6"
            >
              <Link href="/auth/sign-up">Create Portfolio →</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative py-20 md:py-32 bg-gradient-to-br from-rose-50 via-orange-50 to-purple-50 overflow-hidden">
          {/* Grain Overlay */}
          <div
            className="absolute inset-0 opacity-[0.03] z-0"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #000 2px, transparent 0),
                                  radial-gradient(circle at 75% 75%, #000 1px, transparent 0),
                                  radial-gradient(circle at 85% 15%, #000 1px, transparent 0),
                                  radial-gradient(circle at 15% 85%, #000 2px, transparent 0)`,
              backgroundSize: "50px 50px, 30px 30px, 40px 40px, 35px 35px",
              backgroundPosition: "0 0, 20px 20px, 15px 5px, 30px 35px",
            }}
          ></div>

          {/* Animated Blob Backgrounds */}
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-40 blur-[40px]"
              style={{
                background: `radial-gradient(circle at 20% 80%, rgba(255, 154, 158, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 40% 40%, rgba(255, 183, 77, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 90% 90%, rgba(162, 155, 254, 0.4) 0%, transparent 50%),
                               radial-gradient(circle at 10% 10%, rgba(255, 118, 117, 0.3) 0%, transparent 50%),
                               radial-gradient(circle at 70% 70%, rgba(199, 125, 255, 0.3) 0%, transparent 50%)`,
                animation: "float 20s ease-in-out infinite",
              }}
            ></div>
            <div
              className="absolute inset-0 opacity-25 blur-[60px]"
              style={{
                background: `radial-gradient(circle at 60% 30%, rgba(255, 107, 107, 0.2) 0%, transparent 40%),
                               radial-gradient(circle at 30% 70%, rgba(255, 204, 92, 0.2) 0%, transparent 40%),
                               radial-gradient(circle at 85% 60%, rgba(168, 85, 247, 0.25) 0%, transparent 40%)`,
                animation: "float-reverse 15s ease-in-out infinite",
              }}
            ></div>
          </div>

          <div className="relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center space-y-8">
              {/* <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-sm text-slate-700 px-4 py-2 rounded-full text-sm font-medium shadow-lg border border-white/20">
                🏆 #1 Portfolio Builder
              </div> */}
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900">
                Build <span className="text-blue-600">Exceptional</span>
                <br />
                Portfolios, <span className="text-blue-600">Faster</span>
              </h1>
              <p className="max-w-[700px] mx-auto text-xl text-slate-600 leading-relaxed">
                Create a stunning portfolio in no time with our{" "}
                <strong>modular builder</strong>
                <br />
                choosing from <strong>different themes</strong> and our library
                of <strong>customizable widgets.</strong>
              </p>
              <div className="flex justify-center">
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 text-lg"
                >
                  Start Building →
                </Button>
              </div>
            </div>

            {/* Portfolio Showcase Cards */}
            {/* <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white font-semibold">
                      SJ
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">🇺🇸 United States</p>
                      <p className="text-sm text-slate-500">
                        ⏰ Usually rate on request
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    100% Match
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Sarah Johnson
                </h3>
                <p className="text-slate-600 mb-4">
                  Product Designer from San Francisco
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      Portfolio Features
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        🎨 Creative Theme
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-purple-50 text-purple-700"
                      >
                        ✨ Gallery Widget
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700"
                      >
                        🚀 Modern Layout
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" variant="outline" className="flex-1">
                    👁️ View Portfolio
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    🎨 Use Template
                  </Button>
                </div>
              </Card>

             
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white font-semibold">
                      CM
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        💼 Tech Portfolio
                      </p>
                      <p className="text-sm text-slate-500">
                        ⚡ Built in 2 hours
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-700 border-green-200">
                    Popular
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Chad Manker
                </h3>
                <p className="text-slate-600 mb-4">
                  Fullstack Developer from Johannesburg
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      Portfolio Widgets
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-green-50 text-green-700"
                      >
                        📊 Skills Chart
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-yellow-50 text-yellow-700"
                      >
                        💼 Projects Grid
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        📧 Contact Widget
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" variant="outline" className="flex-1">
                    👁️ View Portfolio
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    🎨 Use Template
                  </Button>
                </div>
              </Card>

              
              <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                      HS
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">
                        🎨 Minimal Design
                      </p>
                      <p className="text-sm text-slate-500">
                        ⚡ Built in 1 hour
                      </p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">
                    Trending
                  </Badge>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Hannah Smith
                </h3>
                <p className="text-slate-600 mb-4">
                  Frontend Developer from New York
                </p>

                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-slate-700 mb-2">
                      Portfolio Components
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-red-50 text-red-700"
                      >
                        📝 About Widget
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-red-50 text-red-700"
                      >
                        🖼️ Image Gallery
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-blue-50 text-blue-700"
                      >
                        🔗 Social Links
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button size="sm" variant="outline" className="flex-1">
                    👁️ View Portfolio
                  </Button>
                  <Button
                    size="sm"
                    className="bg-slate-900 hover:bg-slate-800 text-white"
                  >
                    🎨 Use Template
                  </Button>
                </div>
              </Card>
            </div>*/}
          </div>
        </section>

        <section id="showcase" className="py-20 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
                Portfolio Builder
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Build your perfect portfolio in minutes
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our intuitive builder lets you create professional portfolios
                using pre-styled themes and customizable widgets.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left side - Steps */}
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserPlus className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      1. Choose Theme
                    </h4>
                    <p className="text-slate-600">
                      Start with one of our professional themes designed for
                      different industries and styles.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <PenTool className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      2. Add Widgets
                    </h4>
                    <p className="text-slate-600">
                      Use our drag-and-drop builder to add widgets like
                      galleries, contact forms, skills charts, and more.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Send className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-slate-900 mb-2">
                      3. Publish & Share
                    </h4>
                    <p className="text-slate-600">
                      Publish your portfolio with a custom domain or subdomain
                      and share it with the world.
                    </p>
                  </div>
                </div>
              </div>

              {/* Right side - Builder visualization */}
              <div className="bg-slate-50 rounded-2xl p-8">
                <div className="space-y-4">
                  <div className="p-4 bg-white rounded-lg border border-dashed border-blue-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <DragDropIcon className="w-4 h-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          About Me Widget
                        </p>
                        <p className="text-sm text-slate-500">
                          Drag to add personal info
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-dashed border-green-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Folder className="w-4 h-4 text-green-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          Project Gallery
                        </p>
                        <p className="text-sm text-slate-500">
                          Showcase your work
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-dashed border-purple-300">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <Share2 className="w-4 h-4 text-purple-600" />
                      </div>
                      <div>
                        <p className="font-medium text-slate-900">
                          Contact Form
                        </p>
                        <p className="text-sm text-slate-500">
                          Let clients reach you
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-sm font-semibold text-blue-600 tracking-wide uppercase mb-4">
                Pricing
              </h2>
              <h3 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
                Simple, transparent pricing
              </h3>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Choose the plan that works best for your portfolio needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-2 border-transparent">
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Starter
                  </CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900">
                      $0
                    </span>
                    <span className="ml-2 text-lg font-medium text-slate-500">
                      /month
                    </span>
                  </div>
                  <p className="text-slate-600 mt-2">
                    Perfect for getting started
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Unlimited portfolios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Basic themes</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">onefol.io subdomain</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Community support</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-8">
                  <Button
                    asChild
                    className="w-full bg-slate-100 text-slate-900 hover:bg-slate-200"
                  >
                    <Link href="/auth/sign-up">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              <Card className="bg-white shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200 relative">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
                <CardHeader className="pb-8">
                  <CardTitle className="text-2xl font-bold text-slate-900">
                    Professional
                  </CardTitle>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-5xl font-bold text-slate-900">
                      $4.99
                    </span>
                    <span className="ml-2 text-lg font-medium text-slate-500">
                      /month
                    </span>
                  </div>
                  <p className="text-slate-600 mt-2">
                    For serious professionals
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Unlimited portfolios</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">
                      Custom domain support
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Advanced analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">
                      Custom tracking links
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="w-3 h-3 text-green-600" />
                    </div>
                    <span className="text-slate-700">Remove branding</span>
                  </div>
                </CardContent>
                <CardFooter className="pt-8">
                  <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Start For Free
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="faq" className="py-20 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Frequently asked questions
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Everything you need to know about onefolio
              </p>
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Do I need coding skills to use onefolio?
                </AccordionTrigger>
                <AccordionContent>
                  Not at all! onefolio is designed to be completely code-free.
                  Our easy to use editor makes it possible for anyone to create
                  beautiful portfolios without any technical knowledge.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Can I use my own domain name?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, Pro plan users can connect their own custom domain to
                  their onefolio portfolios. Free users get a onefol.io
                  subdomain.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>
                  How many portfolios can I create?
                </AccordionTrigger>
                <AccordionContent>
                  You can have unlimited portfolios no matter whether you're on
                  the Pro or Free plan. However only one can be active at a
                  time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>
                  Is there a limit to how many projects I can showcase?
                </AccordionTrigger>
                <AccordionContent>
                  There's no limit to the number of projects you can showcase in
                  your portfolios on either plan.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>
                  Can I cancel my subscription anytime?
                </AccordionTrigger>
                <AccordionContent>
                  Yes, you can cancel your Pro subscription at any time. Your
                  Pro features will remain active until the end of your billing
                  period.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="relative overflow-hidden py-24">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-300 via-rose-300 via-purple-300 to-blue-300"
            aria-hidden="true"
          />
          <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
                Ready to showcase your work?
              </h2>
              <p className="max-w-[600px] text-lg text-white/90">
                Start now and create your first portfolio in less than 5
                minutes.
              </p>
              <Link href="/auth/sign-up">
                <Button size="lg" className="rounded-full px-8 cursor-pointer">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-12 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <Image
                src="/images/onefolio-main-icon.webp"
                alt="onefolio logo"
                width={32}
                height={32}
              />
              <span className="text-2xl font-semibold">onefolio.</span>
            </div>
            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-4 md:mb-0">
              <Link
                href="#features"
                className="text-sm text-muted-foreground hover:text-rose-400"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="text-sm text-muted-foreground hover:text-rose-400"
              >
                How it works
              </Link>
              <Link
                href="#pricing"
                className="text-sm text-muted-foreground hover:text-rose-400"
              >
                Pricing
              </Link>
              <Link
                href="#faq"
                className="text-sm text-muted-foreground hover:text-rose-400"
              >
                FAQ
              </Link>
            </nav>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} onefolio. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
