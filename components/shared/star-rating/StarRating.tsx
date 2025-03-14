'use client';
import { Rating } from 'react-simple-star-rating';
import { StarRatingProps } from './types';
import { useEffect, useState } from 'react';
import stylesSkeleton from '@/styles/Globals.module.css';
import { classNames } from '@/helpers';

export const StarRating = ({
  initialValue,
  size = 14,
  ...props
}: StarRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialValue ?? 0);
  }, [initialValue]);

  if (rating === null) {
    return (
      <div
        className={classNames(
          stylesSkeleton.skeleton,
          stylesSkeleton.skeletonStarsRate
        )}
      />
    );
  }

  return (
    <Rating
      allowFraction={true}
      initialValue={rating}
      size={size}
      style={{ height: 16 }}
      {...props}
    />
  );
};
