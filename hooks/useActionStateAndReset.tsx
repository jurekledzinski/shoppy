'use client';
import { State } from '@/lib';
import { startTransition, useActionState, useCallback, useEffect } from 'react';

type useActionStateAndResetProps<T> = {
  onResetAction?: () => void;
  fnAction: (prevState: unknown, formData: FormData) => Promise<State<T>>;
  autoReset?: boolean;
};

export const initialState = {
  message: '',
  success: false,
};

export const useActionStateAndReset = <T,>({
  onResetAction,
  fnAction,
  autoReset,
}: useActionStateAndResetProps<T>) => {
  const [state, formAction, isPending] = useActionState(
    async (state: unknown, payload: FormData | null) => {
      if (payload === null) return initialState as State<T>;

      try {
        return await fnAction(state, payload);
      } catch {
        return { message: 'An error occurred', success: false } as State<T>;
      }
    },
    initialState as State<T>
  );

  const resetStateAction = useCallback(
    (formData?: FormData) => {
      startTransition(() => {
        formAction(formData || null);
        if (onResetAction) onResetAction();
      });
    },
    [formAction, onResetAction]
  );

  useEffect(() => {
    if (autoReset && state.success && !isPending) resetStateAction();
  }, [autoReset, state, isPending, resetStateAction]);

  return {
    action: { state, formAction, isPending },
    resetStateAction,
  };
};
