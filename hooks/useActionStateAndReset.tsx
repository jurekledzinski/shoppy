'use client';
import { State } from '@/helpers';
import { startTransition, useActionState } from 'react';

type useActionStateAndResetProps = {
  onResetAction?: () => void;
  fnAction: (prevState: unknown, formData: FormData) => Promise<State>;
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

      const response = await fnAction(state, payload);
      return response;
    },
    {
      message: '',
      success: false,
    }
  );

  const resetStateAction = () => {
    startTransition(() => {
      formAction(null);
      if (onResetAction) onResetAction();
    });
  };

  return {
    action: { state, formAction, isPending },
    resetStateAction,
  };
};
