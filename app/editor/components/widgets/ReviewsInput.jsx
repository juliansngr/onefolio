import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Button } from "@/components/ui/button";
import { Trash2, GripVertical, Plus, Upload, Star } from "lucide-react";

import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";

const StarRating = ({ rating, onRatingChange, maxStars = 5 }) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleMouseMove = (e, starIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    const hoverValue = starIndex + (isLeftHalf ? 0.5 : 1);
    setHoverRating(hoverValue);
  };

  const handleClick = (e, starIndex) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isLeftHalf = x < rect.width / 2;
    const newRating = starIndex + (isLeftHalf ? 0.5 : 1);
    onRatingChange(newRating);
  };

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
        const displayRating = hoverRating || rating;
        const fillType = getStarFill(index, displayRating);
        const isHovering = hoverRating > 0;
        const starValue = index + 1;

        let starColors;
        if (fillType === "full") {
          starColors = "fill-yellow-400 text-yellow-400";
        } else if (isHovering && displayRating >= starValue - 0.5) {
          starColors = "fill-yellow-300 text-yellow-300";
        } else {
          starColors = "fill-gray-200 text-gray-200";
        }

        return (
          <div
            key={index}
            className="relative cursor-pointer"
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={(e) => handleClick(e, index)}
          >
            <Star
              className={cn(
                "w-6 h-6 transition-colors duration-150 pointer-events-none",
                starColors
              )}
            />
            {fillType === "half" && (
              <div className="absolute inset-0 overflow-hidden w-1/2 pointer-events-none">
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              </div>
            )}
          </div>
        );
      })}
      <span className="ml-2 text-sm text-gray-500 min-w-[2rem]">
        {rating ? `${rating}` : "0"}
      </span>
    </div>
  );
};

export default function ReviewsInput({
  data,
  onChange,
  onDelete,
  dragHandle,
  isDragging,
}) {
  const [previewUrls, setPreviewUrls] = useState(data.files || []);
  console.log("previewUrls", previewUrls);
  const addReview = () => {
    onChange({
      ...data,
      reviews: [
        ...data.reviews,
        {
          name: "",
          role: "",
          review: "",
          rating: "",
        },
      ],
    });
  };

  const handleImageChange = (index, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newPreviewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => {
      if (prev[index]) URL.revokeObjectURL(prev[index]);
      const updatedUrls = [...prev];
      updatedUrls[index] = newPreviewUrl;
      return updatedUrls;
    });
  };

  const deleteProject = (index) => {
    const newReviewData = [...(data.reviews || [])];
    newReviewData.splice(index, 1);

    onChange({
      ...data,
      reviews: newReviewData,
    });
  };

  return (
    <Card
      className={cn(
        "overflow-hidden p-0",
        isDragging && "opacity-90 scale-98 transition-all duration-100"
      )}
    >
      <div className="flex flex-col gap-6 p-6 md:p-8">
        <div className="flex flex-row items-center justify-between text-center">
          <h1 className="text-2xl font-bold">Reviews</h1>
          <div className="flex flex-row items-center gap-2">
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={onDelete}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Can't be undone</p>
              </TooltipContent>
            </Tooltip>

            <button {...dragHandle} className="cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sectionTitle">Section Title</Label>
          <Input
            id="sectionTitle"
            type="text"
            name="sectionTitle"
            placeholder={"Kind Words 💬"}
            defaultValue={data.title}
            required
            onChange={(e) => onChange({ ...data, title: e.target.value })}
          />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="sectionDescription">Section Description</Label>
          <Input
            id="sectionDescription"
            type="text"
            name="sectionDescription"
            placeholder={"What people say about working with me"}
            defaultValue={data.description}
            required
            onChange={(e) => onChange({ ...data, description: e.target.value })}
          />
        </div>
        <hr className="my-4" />
        <div className="grid gap-10">
          {data.reviews.map((review, index) => {
            return (
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between text-center">
                  <p className="text-lg font-bold">Review #{index + 1}</p>
                  <Button
                    variant="secondary"
                    className="cursor-pointer hover:bg-red-500 hover:text-white"
                    onClick={() => deleteProject(index)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-row gap-2 w-full">
                    <div className="flex flex-col gap-2 w-1/2">
                      <Label htmlFor="reviewName">Name</Label>
                      <Input
                        id="reviewName"
                        placeholder="John Doe"
                        defaultValue={review.name}
                        onChange={(e) => {
                          const newReviewData = [...(data.reviews || [])];

                          newReviewData[index] = {
                            ...newReviewData[index],
                            name: e.target.value,
                          };

                          onChange({
                            ...data,
                            reviews: newReviewData,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2 w-1/2">
                      <Label htmlFor="reviewRole">Role</Label>
                      <Input
                        id="reviewRole"
                        className="h-full"
                        placeholder="Software Engineer"
                        defaultValue={review.role}
                        onChange={(e) => {
                          const newReviewData = [...(data.reviews || [])];

                          newReviewData[index] = {
                            ...newReviewData[index],
                            role: e.target.value,
                          };

                          onChange({
                            ...data,
                            reviews: newReviewData,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="reviewReview">Review</Label>
                    <Textarea
                      id="reviewReview"
                      className="h-full"
                      placeholder="Software Engineer"
                      defaultValue={review.review}
                      onChange={(e) => {
                        const newReviewData = [...(data.reviews || [])];

                        newReviewData[index] = {
                          ...newReviewData[index],
                          review: e.target.value,
                        };

                        onChange({
                          ...data,
                          reviews: newReviewData,
                        });
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-3">
                    <Label htmlFor="reviewImage">Image</Label>

                    <div className="grid gap-3">
                      {previewUrls[index] ? (
                        <Label
                          htmlFor={`reviewImage-${index}`}
                          className="w-32 h-32 flex items-center justify-center border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-300 rounded-lg cursor-pointer overflow-hidden"
                        >
                          <Image
                            src={previewUrls[index]}
                            alt="Preview"
                            width={100}
                            height={100}
                            className="object-cover w-32 h-32 "
                          />
                        </Label>
                      ) : (
                        <Label
                          htmlFor={`reviewImage-${index}`}
                          className="w-32 h-32 border-1 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-300 rounded-lg cursor-pointer flex items-center justify-center"
                        >
                          <Upload className="w-8 h-8" />
                        </Label>
                      )}

                      <Input
                        id={`reviewImage-${index}`}
                        type="file"
                        name={`reviewImage-${index}`}
                        accept="image/*"
                        style={{ display: "none" }}
                        required
                        onChange={(e) => {
                          handleImageChange(index, e);
                          const newFileData = [...(data.fileData || [])];
                          newFileData[index] = {
                            index: index,
                            file: e.target.files[0],
                          };

                          onChange({ ...data, fileData: newFileData });
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-row gap-3">
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="reviewRating">Rating</Label>
                    <StarRating
                      rating={parseFloat(review.rating) || 0}
                      onRatingChange={(newRating) => {
                        const newReviewData = [...(data.reviews || [])];

                        newReviewData[index] = {
                          ...newReviewData[index],
                          rating: newRating.toString(),
                        };

                        onChange({
                          ...data,
                          reviews: newReviewData,
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
          <Button variant="outline" onClick={addReview}>
            <Plus className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
