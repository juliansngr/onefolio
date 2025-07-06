import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Folder, Target, Github } from "lucide-react";

export default function FeaturedProjects({ data }) {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
          Featured Projects 🚀
        </h2>
        <p className="text-xl text-gray-600">Some cool stuff I've built</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {data.map((project, index) => {
          return (
            <div
              key={index}
              className="group bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
            >
              <div
                className={`h-48 bg-gradient-to-br ${project.color} flex items-center justify-center relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-black/10"></div>
                <Folder className="w-16 h-16 text-white/80 relative z-10" />
                <div className="absolute top-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Target className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-6 space-y-4">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-cyan-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 3).map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      className="bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs rounded-full"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge className="bg-gray-100 text-gray-500 text-xs rounded-full">
                      +{project.technologies.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex gap-3 pt-2">
                  <Button
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white hover:shadow-lg transform hover:scale-105 transition-all rounded-xl"
                    asChild
                  >
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 rounded-xl bg-transparent"
                    asChild
                  >
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
