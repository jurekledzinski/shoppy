import { Control, FieldValues, Path } from 'react-hook-form';

export type InputRating = {
  rate: number;
};

export interface FieldRatingProps<T extends FieldValues> {
  className?: string;
  label?: string;
  name: Path<T>;
  control: Control<T>;
  message: string;
}
