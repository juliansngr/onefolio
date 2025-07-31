import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import { useState } from "react";

// Review Text Component with truncation and expand functionality
const ReviewText = ({ text, maxLength = 150 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return null;

  const shouldTruncate = text.length > maxLength;
  const displayText = isExpanded ? text : text.slice(0, maxLength);

  return (
    <div className="text-gray-700 mb-4 italic leading-relaxed">
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

// Star Display Component for showing ratings with half-star support
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
              className={`w-4 h-4 ${
                fillType === "full"
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200"
              }`}
            />
            {fillType === "half" && (
              <div className="absolute inset-0 overflow-hidden w-1/2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
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
      <section>
        <Card className="bg-white/60 backdrop-blur-sm border-white/20 shadow-xl">
          {(data.title || data.description) && (
            <CardHeader>
              {data.title && (
                <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  {data.title}
                </CardTitle>
              )}
              {data.description && (
                <CardDescription className="text-gray-600">
                  {data.description}
                </CardDescription>
              )}
            </CardHeader>
          )}
          <CardContent>
            <div className="flex flex-wrap gap-6 justify-center max-w-5xl mx-auto">
              {data.reviews.map((review, index) => (
                <Card
                  key={index}
                  className="bg-white/80 shadow-none w-full sm:w-72 md:w-80 lg:w-[300px] max-w-sm flex-shrink-0"
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-1 mb-4">
                      <StarDisplay rating={review.rating} />
                    </div>
                    <ReviewText text={review.review} />
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarImage
                          src={data.files[index] || "/placeholder.svg"}
                        />
                        <AvatarFallback>
                          {review.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-gray-900">
                          {review.name}
                        </p>
                        <p className="text-sm text-gray-600">{review.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
