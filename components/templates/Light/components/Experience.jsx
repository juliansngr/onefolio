import { Briefcase, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Experience({ data, className }) {
  return (
    <div className={className}>
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-purple-600" />
            Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.map((exp, index) => (
            <div key={index} className="relative">
              {index !== data.length - 1 && (
                <div className="absolute left-4 top-12 bottom-0 w-px bg-gradient-to-b from-orange-300 to-purple-300" />
              )}
              <div className="flex gap-4">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900">
                    {exp.position}
                  </h3>
                  <p className="text-purple-600 font-medium">{exp.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {exp.location}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
