"use client";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import Skills from "./components/Skills";
import FeaturedProjects from "./components/FeaturedProjects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Testimonials from "./components/Testimonials";
import ContactForm from "./components/ContactForm";
import { Button } from "@/components/ui/button";
import WidgetRenderer from "./components/utils/WidgetRenderer";
import { widgets } from "./dummyData";
import {
  Mail,
  Phone,
  MapPin,
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

// Sample portfolio data
const portfolioData = {
  about: {
    name: "Alex Johnson",
    title: "Full Stack Developer & UI/UX Designer",
    bio: "Passionate developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern design principles. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "San Francisco, CA",
    email: "alex@example.com",
    phone: "+1 (555) 123-4567",
  },
  projects: [
    {
      title: "E-commerce Platform",
      description:
        "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
      technologies: [
        "React",
        "Node.js",
        "PostgreSQL",
        "Stripe",
        "Tailwind CSS",
      ],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      color: "from-cyan-400 to-blue-500",
    },
    {
      title: "Task Management App",
      description:
        "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
      technologies: ["Vue.js", "Firebase", "Socket.io", "Vuetify"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      color: "from-pink-400 to-red-500",
    },
    {
      title: "Weather Dashboard",
      description:
        "A responsive weather dashboard that displays current conditions and forecasts using multiple weather APIs with beautiful data visualizations.",
      technologies: ["React", "Chart.js", "Weather API", "CSS Grid"],
      image: "/placeholder.svg?height=200&width=300",
      liveUrl: "https://example.com",
      githubUrl: "https://github.com/example",
      color: "from-yellow-400 to-orange-500",
    },
  ],
  skills: [
    "JavaScript",
    "TypeScript",
    "React",
    "Vue.js",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "AWS",
    "Docker",
    "Git",
    "Figma",
    "Tailwind CSS",
    "Next.js",
    "GraphQL",
    "REST APIs",
  ],
  experience: [
    {
      position: "Senior Full Stack Developer",
      company: "TechCorp Inc.",
      duration: "2022 - Present",
      description:
        "Lead development of customer-facing web applications serving 100k+ users. Mentored junior developers and implemented CI/CD pipelines.",
      location: "San Francisco, CA",
      icon: <Rocket className="w-6 h-6" />,
      color: "bg-gradient-to-br from-cyan-400 to-blue-500",
    },
    {
      position: "Frontend Developer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      description:
        "Built responsive web applications using React and Vue.js. Collaborated with design team to implement pixel-perfect UI components.",
      location: "Remote",
      icon: <Code className="w-6 h-6" />,
      color: "bg-gradient-to-br from-pink-400 to-red-500",
    },
    {
      position: "Junior Developer",
      company: "WebSolutions",
      duration: "2019 - 2020",
      description:
        "Developed and maintained client websites using modern web technologies. Gained experience in full-stack development.",
      location: "New York, NY",
      icon: <Lightbulb className="w-6 h-6" />,
      color: "bg-gradient-to-br from-yellow-400 to-orange-500",
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      duration: "2015 - 2019",
      description:
        "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.",
    },
  ],
  testimonials: [
    {
      text: "Alex is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
      author: "Sarah Chen",
      position: "Product Manager at TechCorp",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      text: "Working with Alex was a pleasure. He brought creative solutions to complex problems and always met deadlines.",
      author: "Mike Rodriguez",
      position: "CTO at StartupXYZ",
      avatar: "/placeholder.svg?height=48&width=48",
    },
    {
      text: "Alex's technical expertise and collaborative approach made our project a huge success. Highly recommended!",
      author: "Emma Wilson",
      position: "Design Lead at WebSolutions",
      avatar: "/placeholder.svg?height=48&width=48",
    },
  ],
  social: [
    {
      platform: "GitHub",
      url: "https://github.com/alexjohnson",
      icon: <Github className="w-5 h-5" />,
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/alexjohnson",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/alexjohnson",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      platform: "Website",
      url: "https://alexjohnson.dev",
      icon: <Globe className="w-5 h-5" />,
    },
  ],
};

export default function CreativePortfolioPage({ data, userId, portfolio }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-white to-yellow-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full opacity-10 animate-pulse"></div>
      <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-pink-400 to-red-500 rounded-full opacity-10 animate-pulse delay-1000"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-10 animate-pulse delay-2000"></div>
      <div className="absolute bottom-20 right-10 w-28 h-28 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-10 animate-pulse delay-500"></div>

      {/* Header */}
      <Header name={portfolioData.about.name} />

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-20 relative z-10">
        {widgets
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

        {/* Hero Section
        <HeroSection portfolioData={portfolioData} />

        Skills Section
        <Skills skills={portfolioData.skills} />
        Projects Section
        <FeaturedProjects projects={portfolioData.projects} />

        Experience Section
        <Experience experience={portfolioData.experience} />
        Education Section
        <Education education={portfolioData.education} />
        Testimonials Section
        <Testimonials testimonials={portfolioData.testimonials} />

        Contact CTA
        <ContactForm /> */}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white relative z-10">
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
              <span>Made with onefolio</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
