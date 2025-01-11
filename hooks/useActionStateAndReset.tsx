'use client';
import { State } from '@/lib';
import { startTransition, useActionState } from 'react';

type useActionStateAndResetProps<T> = {
  onResetAction?: () => void;
  fnAction: (prevState: unknown, formData: FormData) => Promise<State<T>>;
};

const initialState = {
  message: '',
  success: false,
};

export const useActionStateAndReset = <T,>({
  onResetAction,
  fnAction,
}: useActionStateAndResetProps<T>) => {
  const [state, formAction, isPending] = useActionState(
    async (state: unknown, payload: FormData | null) => {
      if (payload === null) {
        return {
          message: '',
          success: false,
        } as State<T>;
      }

      try {
        const response = await fnAction(state, payload);
        return response;
      } catch {
        return { message: 'An error occurred', success: false } as State<T>;
      }
    },
    initialState as State<T>
  );

  const resetStateAction = (formData?: FormData) => {
    startTransition(() => {
      formAction(formData || null);
      if (onResetAction) onResetAction();
    });
  };

  return {
    action: { state, formAction, isPending },
    resetStateAction,
  };
};
