'use client';
import { Rating } from 'react-simple-star-rating';
import { StarRatingProps } from './types';
import { useEffect, useState } from 'react';

export const StarRating = ({
  initialValue,
  readonly,
  size = 14,
}: StarRatingProps) => {
  const [rating, setRating] = useState<number | null>(null);

  useEffect(() => {
    setRating(initialValue ?? 0);
  }, [initialValue]);

  if (rating === null) {
    return (
      <div
        style={{ width: '100px', height: `${size + 5}px`, background: '#eee' }}
      />
    );
  }

  return (
    <Rating
      allowFraction={true}
      initialValue={rating}
      readonly={readonly}
      size={size}
      style={{ height: 16 }}
    />
  );
};
