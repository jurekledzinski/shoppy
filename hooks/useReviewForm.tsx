'use client';
import { ReviewFormInputs } from '@/components/pages';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useResetForm } from './useResetForm';

type UseReviewFormProps = {
  formAction: (payload: FormData) => void;
  isPending: boolean;
  isSuccess: boolean;
  onSuccessAction: () => void;
  userId: string;
  userName: string;
  productId: string;
};

export const useReviewForm = ({
  formAction,
  isPending,
  isSuccess,
  onSuccessAction,
  userId,
  userName,
  productId,
}: UseReviewFormProps) => {
  const methods = useForm<ReviewFormInputs>({
    defaultValues: {
      rate: 0,
      review: '',
    },
  });

  const onSubmit = (data: ReviewFormInputs) => {
    const formData = new FormData();
    formData.append('rate', data.rate.toString());
    formData.set('review', data.review);
    formData.set('userId', userId);
    formData.set('productId', productId);
    formData.set('userName', userName);

    startTransition(() => {
      formAction(formData);
    });
  };

  useResetForm({
    isPending,
    isSuccess,
    methods,
    defaultValues: { rate: 0, review: '' },
    onSuccessAction,
  });

  return {
    methodsReview: methods,
    onSubmitReview: methods.handleSubmit(onSubmit),
  };
};
