"use client";

import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

export function StarRating({
  rating,
  maxRating = 5,
  size = 20,
  interactive = false,
  onRatingChange,
}: StarRatingProps) {
  const handleClick = (index: number) => {
    if (interactive && onRatingChange) {
      onRatingChange(index + 1);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: maxRating }).map((_, index) => {
        const isFilled = index < rating;
        return (
          <Star
            key={index}
            size={size}
            aria-hidden
            className={`${
              isFilled
                ? "fill-yellow-400 text-yellow-500"
                : "fill-transparent text-gray-400"
            } stroke-[1.5] ${
              interactive ? "cursor-pointer hover:scale-110 transition-transform" : ""
            }`}
            onClick={() => handleClick(index)}
          />
        );
      })}
    </div>
  );
}
