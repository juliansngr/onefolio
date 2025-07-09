import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Star } from "lucide-react";
import { getIcon } from "@/lib/editorFunctions";

export default function HeroSection({ data, className }) {
  return (
    <div className={className}>
      <section className="py-16 relative">
        <div className="text-center space-y-8">
          <div className="relative inline-block">
            <Avatar className="w-40 h-40 mx-auto ring-8 ring-white shadow-2xl">
              <AvatarImage
                src={data.files[0] || "/images/placeholder-square.webp"}
              />
              <AvatarFallback className="text-4xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white">
                {data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
              {data.name}
            </h1>
            <p className="text-2xl md:text-3xl font-bold text-gray-700">
              {data.title}
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-gray-600 leading-relaxed">{data.bio}</p>
          </div>

          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto pt-8">
            {data.location && (
              <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform">
                <MapPin className="w-8 h-8 mb-3 mx-auto" />
                <p className="font-semibold">{data.location}</p>
              </div>
            )}
            {data.email && (
              <div className="bg-gradient-to-br from-pink-400 to-red-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform">
                <Mail className="w-8 h-8 mb-3 mx-auto" />
                <p className="font-semibold">{data.email}</p>
              </div>
            )}
            {data.phone && (
              <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-6 rounded-2xl text-white transform hover:scale-105 transition-transform">
                <Phone className="w-8 h-8 mb-3 mx-auto" />
                <p className="font-semibold">{data.phone}</p>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 pt-8">
            {data.social.map((social, index) => {
              if (social.url) {
                return (
                  <Button
                    key={index}
                    size="lg"
                    className="bg-white text-gray-700 hover:bg-gray-50 shadow-lg transform hover:scale-110 transition-all rounded-2xl"
                    asChild
                  >
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {getIcon(social.icon)}
                      <span className="ml-2 hidden sm:inline">
                        {social.platform}
                      </span>
                    </a>
                  </Button>
                );
              }
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
