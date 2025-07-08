import { BookOpen, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Education({ data, className }) {
  return (
    <div className={className}>
      <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-6 h-6 text-purple-600" />
            Education
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {data.map((edu, index) => (
            <div key={index} className="flex gap-4">
              <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <GraduationCap className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                <p className="text-purple-600 font-medium">{edu.school}</p>
                <p className="text-sm text-gray-500 mb-2">{edu.duration}</p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {edu.description}
                </p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
