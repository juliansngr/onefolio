"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  Calendar,
  Briefcase,
  GraduationCap,
  Award,
  Heart,
  MessageCircle,
  Folder,
} from "lucide-react";
import WidgetRenderer from "./components/utils/WidgetRenderer";
// import { widgets } from "../dummyData";

// Sample portfolio data
// const portfolioData = {
//   about: {
//     name: "Alex Johnson",
//     title: "Full Stack Developer & UI/UX Designer",
//     bio: "Passionate developer with 5+ years of experience creating beautiful, functional web applications. I specialize in React, Node.js, and modern design principles. When I'm not coding, you'll find me exploring new technologies or contributing to open-source projects.",
//     avatar: "/placeholder.svg?height=120&width=120",
//     location: "San Francisco, CA",
//     email: "alex@example.com",
//     phone: "+1 (555) 123-4567",
//   },
//   projects: [
//     {
//       title: "E-commerce Platform",
//       description:
//         "A full-stack e-commerce solution built with React, Node.js, and PostgreSQL. Features include user authentication, payment processing, and admin dashboard.",
//       technologies: [
//         "React",
//         "Node.js",
//         "PostgreSQL",
//         "Stripe",
//         "Tailwind CSS",
//       ],
//       image: "/placeholder.svg?height=200&width=300",
//       liveUrl: "https://example.com",
//       githubUrl: "https://github.com/example",
//     },
//     {
//       title: "Task Management App",
//       description:
//         "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
//       technologies: ["Vue.js", "Firebase", "Socket.io", "Vuetify"],
//       image: "/placeholder.svg?height=200&width=300",
//       liveUrl: "https://example.com",
//       githubUrl: "https://github.com/example",
//     },
//     {
//       title: "Weather Dashboard",
//       description:
//         "A responsive weather dashboard that displays current conditions and forecasts using multiple weather APIs with beautiful data visualizations.",
//       technologies: ["React", "Chart.js", "Weather API", "CSS Grid"],
//       image: "/placeholder.svg?height=200&width=300",
//       liveUrl: "https://example.com",
//       githubUrl: "https://github.com/example",
//     },
//   ],
//   skills: [
//     "JavaScript",
//     "TypeScript",
//     "React",
//     "Vue.js",
//     "Node.js",
//     "Python",
//     "PostgreSQL",
//     "MongoDB",
//     "AWS",
//     "Docker",
//     "Git",
//     "Figma",
//     "Tailwind CSS",
//     "Next.js",
//     "GraphQL",
//     "REST APIs",
//   ],
//   experience: [
//     {
//       position: "Senior Full Stack Developer",
//       company: "TechCorp Inc.",
//       duration: "2022 - Present",
//       description:
//         "Lead development of customer-facing web applications serving 100k+ users. Mentored junior developers and implemented CI/CD pipelines.",
//       location: "San Francisco, CA",
//     },
//     {
//       position: "Frontend Developer",
//       company: "StartupXYZ",
//       duration: "2020 - 2022",
//       description:
//         "Built responsive web applications using React and Vue.js. Collaborated with design team to implement pixel-perfect UI components.",
//       location: "Remote",
//     },
//     {
//       position: "Junior Developer",
//       company: "WebSolutions",
//       duration: "2019 - 2020",
//       description:
//         "Developed and maintained client websites using modern web technologies. Gained experience in full-stack development.",
//       location: "New York, NY",
//     },
//   ],
//   education: [
//     {
//       degree: "Bachelor of Science in Computer Science",
//       school: "University of California, Berkeley",
//       duration: "2015 - 2019",
//       description:
//         "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Web Development, Database Systems.",
//     },
//   ],
//   testimonials: [
//     {
//       text: "Alex is an exceptional developer who consistently delivers high-quality work. His attention to detail and problem-solving skills are outstanding.",
//       author: "Sarah Chen",
//       position: "Product Manager at TechCorp",
//       avatar: "/placeholder.svg?height=48&width=48",
//     },
//     {
//       text: "Working with Alex was a pleasure. He brought creative solutions to complex problems and always met deadlines.",
//       author: "Mike Rodriguez",
//       position: "CTO at StartupXYZ",
//       avatar: "/placeholder.svg?height=48&width=48",
//     },
//     {
//       text: "Alex's technical expertise and collaborative approach made our project a huge success. Highly recommended!",
//       author: "Emma Wilson",
//       position: "Design Lead at WebSolutions",
//       avatar: "/placeholder.svg?height=48&width=48",
//     },
//   ],
//   social: [
//     {
//       platform: "GitHub",
//       url: "https://github.com/alexjohnson",
//       icon: <Github className="w-5 h-5" />,
//     },
//     {
//       platform: "LinkedIn",
//       url: "https://linkedin.com/in/alexjohnson",
//       icon: <Linkedin className="w-5 h-5" />,
//     },
//     {
//       platform: "Twitter",
//       url: "https://twitter.com/alexjohnson",
//       icon: <Twitter className="w-5 h-5" />,
//     },
//     {
//       platform: "Website",
//       url: "https://alexjohnson.dev",
//       icon: <Globe className="w-5 h-5" />,
//     },
//   ],
// };

export default function LightPortfolioPage({ data }) {
  console.log(data);
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-pink-50 to-purple-50">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8"></div>

      {/* Footer */}
      {/* <footer className="bg-white/80 backdrop-blur-sm border-t border-white/20 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Folder className="h-6 w-6 text-purple-600" />
              <span className="font-bold bg-gradient-to-r from-orange-600 to-purple-600 bg-clip-text text-transparent">
                {portfolioData.about.name}
              </span>
            </div>
            <div className="flex items-center gap-4">
              {portfolioData.social.map((social, index) => (
                <Button key={index} variant="ghost" size="sm" asChild>
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
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Heart className="w-4 h-4 text-red-500" />
              <span>
                Made with{" "}
                <a
                  href="https://onefolio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black hover:text-gray-300"
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
