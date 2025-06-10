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
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2">
            <Image
              src="/images/onefolio-main-icon.webp"
              alt="onefolio logo"
              width={32}
              height={32}
            />
            <span className="text-2xl font-semibold">onefolio.</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-rose-400"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-rose-400"
            >
              How it works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:text-rose-400"
            >
              Pricing
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium hover:text-rose-400"
            >
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm font-medium hover:text-rose-400 hidden md:block"
            >
              Sign in
            </Link>
            <Button asChild>
              <Link href="/auth/sign-up">Get started</Link>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="relative overflow-hidden py-24 md:py-32">
          <div
            className="absolute inset-0 bg-gradient-to-br from-orange-300 via-rose-300 via-purple-300 to-blue-300"
            aria-hidden="true"
          />
          <div className="mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-5xl">
            <div className="flex flex-col items-center text-center space-y-8">
              <div className="flex items-center gap-2">
                <Image
                  src="/images/onefolio-main-icon-white.webp"
                  alt="onefolio logo"
                  width={48}
                  height={48}
                />

                <span className="text-4xl font-semibold text-white">
                  onefolio.
                </span>
              </div>
              <h1 className="text-4xl font-semibold tracking-tighter sm:text-5xl md:text-6xl text-white">
                Your portfolios. One place.
              </h1>
              <p className="max-w-[600px] text-lg text-white/90">
                Create, manage, and share your portfolios with the world in
                minutes. Absolutely no code required.
              </p>
              <Link href="/auth/sign-up">
                <Button size="lg" className="rounded-full px-8 cursor-pointer">
                  Get started for free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <div className="mt-12 w-full max-w-3xl overflow-hidden rounded-xl bg-white/90 shadow-xl backdrop-blur">
                <Image
                  src="/images/placeholder-800-600.webp"
                  width={800}
                  height={600}
                  alt="onefolio dashboard preview"
                  className="w-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="py-20 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Everything you need to showcase your work
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                onefolio gives you all the tools to create stunning portfolios
                without any design skills.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <DragDropIcon className="h-10 w-10 text-rose-400 mb-2" />
                  <CardTitle>Easy to use editor</CardTitle>
                  <CardDescription>
                    Build beautiful portfolios with our intuitive easy to use
                    interface. No coding required.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Folder className="h-10 w-10 text-rose-400 mb-2" />
                  <CardTitle>Multiple portfolios</CardTitle>
                  <CardDescription>
                    Create and manage multiple portfolios for different
                    purposes, projects, or clients.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Share2 className="h-10 w-10 text-rose-400 mb-2" />
                  <CardTitle>Easy sharing</CardTitle>
                  <CardDescription>
                    Share your work via public portfolio links or easily
                    integrate your custom domain.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <Shield className="h-10 w-10 text-rose-400 mb-2" />
                  <CardTitle>Work in progress</CardTitle>
                  <CardDescription>XXX</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="py-20 bg-slate-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How it works
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Get started in minutes with these three simple steps
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 mb-4">
                  <UserPlus className="h-8 w-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold">1. Sign up</h3>
                <p className="mt-2 text-muted-foreground">
                  Create your free account in seconds.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 mb-4">
                  <PenTool className="h-8 w-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold">2. Build</h3>
                <p className="mt-2 text-muted-foreground">
                  Build your portfolio.
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 mb-4">
                  <Send className="h-8 w-8 text-rose-400" />
                </div>
                <h3 className="text-xl font-bold">3. Share</h3>
                <p className="mt-2 text-muted-foreground">
                  Share your portfolio with the world.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-white">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What our users say
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Join thousands of professionals who trust onefolio for their
                portfolio needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    "onefolio has completely transformed how I showcase my work.
                    The editor is so intuitive and easy to use!"
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium">Sarah J.</p>
                    <p className="text-sm text-muted-foreground">
                      Graphic Designer
                    </p>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    "I love being able to create different portfolios for
                    different clients. It's saved me so much time."
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium">Michael T.</p>
                    <p className="text-sm text-muted-foreground">
                      Photographer
                    </p>
                  </div>
                </CardFooter>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <p className="text-muted-foreground">
                    "The sharing features are fantastic. My clients are always
                    impressed with how professional my portfolio looks."
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <p className="font-medium">Alex R.</p>
                    <p className="text-sm text-muted-foreground">
                      Web Developer
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        <section id="pricing" className="py-20 bg-slate-50">
          <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, transparent pricing
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-[700px] mx-auto">
                Choose the plan that's right for you
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              <Card>
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $0
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>1 portfolio</span>
                    </li>
                    {/* <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Basic templates</span>
                    </li> */}
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Limited customization</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>onefolio branding & subdomain</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Link href="/auth/sign-up" className="w-full">
                    <Button className="w-full cursor-pointer">
                      Get started
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Pro</CardTitle>
                    <Badge>Popular</Badge>
                  </div>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $4.99
                    <span className="ml-1 text-lg font-medium text-muted-foreground">
                      /month
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Unlimited portfolios</span>
                    </li>
                    {/* <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Premium templates</span>
                    </li> */}
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Custom domain</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Analytics</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Fully customizable</span>
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-rose-400" />
                      <span>Remove onefolio branding</span>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="default" className="w-full">
                    Upgrade to Pro
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
                  Free users can create 1 portfolio. Pro users can create
                  unlimited portfolios, perfect for showcasing different
                  projects to different clients or companies.
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
                Join thousands of professionals who trust onefolio to showcase
                their best work.
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
