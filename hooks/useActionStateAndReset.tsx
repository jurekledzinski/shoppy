'use client';
import { State } from '@/helpers';
import { startTransition, useActionState } from 'react';

type useActionStateAndResetProps = {
  onResetAction?: () => void;
  fnAction: (prevState: unknown, formData: FormData) => Promise<State>;
};

const initialState: State = {
  message: '',
  success: false,
};

export const useActionStateAndReset = ({
  onResetAction,
  fnAction,
}: useActionStateAndResetProps) => {
  const [state, formAction, isPending] = useActionState(
    async (state: unknown, payload: FormData | null) => {
      if (payload === null) {
        return {
          message: '',
          success: false,
        } as State;
      }

      try {
        const response = await fnAction(state, payload);
        return response;
      } catch {
        return { message: 'An error occurred', success: false } as State;
      }
    },
    initialState
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
