import { BookOpen, GraduationCap } from "lucide-react";

export default function Education({ data }) {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Education 🎓
        </h2>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-500 opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>

        {data.map((edu, index) => {
          return (
            <div key={index} className="relative z-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {edu.degree}
              </h3>
              <p className="text-xl font-semibold text-purple-600 mb-2">
                {edu.school}
              </p>
              <p className="text-gray-500 font-medium mb-4">{edu.duration}</p>
              <p className="text-gray-700 leading-relaxed">{edu.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
