import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Globe, BarChart3, Smartphone, Mail, Shield } from "lucide-react";

const features = [
  {
    icon: <Edit className="w-6 h-6" />,
    title: "Drag & Drop Editor",
    description:
      "Build your portfolio in minutes with our intuitive visual editor",
    color: "purple",
    gradient: "from-purple-400 to-purple-600",
    delay: "0s",
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Custom Domains",
    description: "Use your own domain to create a professional presence",
    color: "blue",
    gradient: "from-blue-400 to-blue-600",
    delay: "0.1s",
  },
  {
    icon: <BarChart3 className="w-6 h-6" />,
    title: "Analytics Dashboard",
    description: "Track visitors, views, and contact submissions in real-time",
    color: "green",
    gradient: "from-green-400 to-green-600",
    delay: "0.2s",
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Mobile Responsive",
    description: "Your portfolio looks perfect on all devices automatically",
    color: "pink",
    gradient: "from-pink-400 to-pink-600",
    delay: "0.3s",
  },
  {
    icon: <Mail className="w-6 h-6" />,
    title: "Contact Management",
    description: "Manage inquiries and leads from potential clients",
    color: "indigo",
    gradient: "from-indigo-400 to-indigo-600",
    delay: "0.4s",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "SSL & Security",
    description: "Enterprise-grade security with automatic SSL certificates",
    color: "emerald",
    gradient: "from-emerald-400 to-emerald-600",
    delay: "0.5s",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 mb-4 hover:scale-105 transition-transform duration-300">
            Features
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
            Built for modern professionals
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            onefolio will offer powerful features designed specifically for
            today's creative and technical professionals
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-lg border-white/20 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-3 group relative overflow-hidden"
              style={{ animationDelay: feature.delay }}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
              ></div>

              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
              <div className="absolute bottom-6 left-6 w-1 h-1 bg-gradient-to-r from-pink-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-pulse"></div>

              <CardContent className="p-8 text-center relative z-10">
                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6 mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-lg group-hover:shadow-xl`}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>

                <h3
                  className={`text-xl font-semibold text-slate-900 mb-3 transition-colors duration-300 ${
                    feature.color === "purple"
                      ? "group-hover:text-purple-600"
                      : feature.color === "blue"
                      ? "group-hover:text-blue-600"
                      : feature.color === "green"
                      ? "group-hover:text-green-600"
                      : feature.color === "pink"
                      ? "group-hover:text-pink-600"
                      : feature.color === "indigo"
                      ? "group-hover:text-indigo-600"
                      : feature.color === "emerald"
                      ? "group-hover:text-emerald-600"
                      : "group-hover:text-slate-600"
                  }`}
                >
                  {feature.title}
                </h3>

                <p className="text-slate-600 leading-relaxed transition-colors duration-300 group-hover:text-slate-700">
                  {feature.description}
                </p>

                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Badge
                    className={`bg-gradient-to-r ${feature.gradient} text-white text-xs px-3 py-1`}
                  >
                    Coming Soon
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
