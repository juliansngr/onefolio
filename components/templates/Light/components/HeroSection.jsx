import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MapPin, Mail, Phone, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HeroSection({ data, className }) {
  return (
    <div className={className}>
      <section className="text-center">
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-12">
            <Avatar className="w-32 h-32 mx-auto mb-6 ring-4 ring-white/50">
              <AvatarImage src={data.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-orange-400 to-purple-600 text-white">
                {data.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {data.name}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-6">
              {data.title}
            </p>
            <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-8 leading-relaxed">
              {data.bio}
            </p>

            {/* Contact Info */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-gray-600">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{data.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{data.phone}</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-4 mt-8">
              {data.social.map((social, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  className="bg-white/50 hover:bg-white/80"
                  asChild
                >
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                    <span className="ml-2 hidden sm:inline">
                      {social.platform}
                    </span>
                  </a>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
