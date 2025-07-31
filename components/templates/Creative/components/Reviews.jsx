import { Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

// Review Text Component with truncation and expand functionality
const ReviewText = ({ text, maxLength = 100 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div className="text-gray-700 leading-relaxed italic text-lg mb-6">
      <p className="whitespace-pre-line">
        "{displayText}
        {!isExpanded && shouldTruncate && "..."}"{" "}
        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm ml-1"
          >
            {isExpanded ? "Show less" : "Show more"}
          </button>
        )}
      </p>
    </div>
  );
};

const StarDisplay = ({ rating, maxStars = 5 }) => {
  const getStarFill = (starIndex, currentRating) => {
    const starValue = starIndex + 1;
    if (currentRating >= starValue) {
      return "full";
    } else if (currentRating >= starValue - 0.5) {
      return "half";
    }
    return "empty";
  };

  return (
    <div className="flex gap-1">
      {[...Array(maxStars)].map((_, index) => {
        const fillType = getStarFill(index, parseFloat(rating) || 0);

        return (
          <div key={index} className="relative">
            <Star
              className={`w-5 h-5 ${
                fillType === "full"
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
            {fillType === "half" && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function Reviews({ data, className }) {
  return (
    <div className={className}>
      <section className="space-y-12">
        {(data.title || data.description) && (
          <div className="text-center space-y-4">
            {data.title && (
              <h2 className="text-4xl font-black bg-gradient-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-xl text-gray-600"> {data.description}</p>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
          {data.reviews.map((review, index) => {
            const colors = [
              "from-cyan-400 to-blue-500",
              "from-pink-400 to-red-500",
              "from-yellow-400 to-orange-500",
            ];
            return (
              <div
                key={index}
                className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300 relative overflow-hidden w-full sm:w-72 md:w-80 lg:w-[300px] max-w-sm flex-shrink-0"
              >
                <div
                  className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r ${
                    colors[index % colors.length]
                  }`}
                ></div>

                <div className="space-y-6 pt-4">
                  <StarDisplay rating={review.rating} />

                  <ReviewText text={review.review} />

                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 ring-4 ring-gray-100">
                      <AvatarImage
                        src={data.files[index] || "/placeholder.svg"}
                      />
                      <AvatarFallback
                        className={`bg-gradient-to-br ${
                          colors[index % colors.length]
                        } text-white`}
                      >
                        {review.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-gray-900">{review.name}</p>
                      <p className="text-gray-600">{review.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
