import { Lightbulb, Target, Rocket } from "lucide-react";

export default function Experience({ data, className }) {
  return (
    <div className={className}>
      <section className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-black bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            My Journey 🛤️
          </h2>
          <p className="text-xl text-gray-600">The path that led me here</p>
        </div>

        <div className="space-y-8">
          {data.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                <div
                  className={`w-full h-full ${exp.color} rounded-full transform translate-x-8 -translate-y-8`}
                ></div>
              </div>

              <div className="flex items-start gap-6 relative z-10">
                <div
                  className={`w-16 h-16 ${exp.color} rounded-2xl flex items-center justify-center text-white transform rotate-12 hover:rotate-0 transition-transform`}
                >
                  {exp.icon}
                </div>

                <div className="flex-1 space-y-3">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-xl font-semibold text-cyan-600">
                      {exp.company}
                    </p>
                    <div className="flex items-center gap-4 text-gray-500 mt-2">
                      <span className="font-medium">{exp.duration}</span>
                      <span>•</span>
                      <span>{exp.location}</span>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
