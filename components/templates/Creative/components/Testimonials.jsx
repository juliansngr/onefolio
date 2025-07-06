import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

export default function Testimonials({ data }) {
  return (
    <section className="space-y-12">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
          Kind Words 💬
        </h2>
        <p className="text-xl text-gray-600">
          What people say about working with me
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((testimonial, index) => {
          const colors = [
            "from-cyan-400 to-blue-500",
            "from-pink-400 to-red-500",
            "from-yellow-400 to-orange-500",
          ];
          return (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden"
            >
              <div
                className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                  colors[index % colors.length]
                }`}
              ></div>

              <div className="space-y-6 pt-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                <p className="text-gray-700 leading-relaxed italic text-lg">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-4">
                  <Avatar className="w-14 h-14 ring-4 ring-gray-100">
                    <AvatarImage
                      src={testimonial.avatar || "/placeholder.svg"}
                    />
                    <AvatarFallback
                      className={`bg-gradient-to-br ${
                        colors[index % colors.length]
                      } text-white`}
                    >
                      {testimonial.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-bold text-gray-900">
                      {testimonial.author}
                    </p>
                    <p className="text-gray-600">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
