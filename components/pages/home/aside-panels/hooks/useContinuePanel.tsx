import { controlAside } from '@/helpers';
import { startTransition } from 'react';
import { UseContinuePanelProps } from './types';

export const useContinuePanel = ({
  context,
  onFormAction,
}: UseContinuePanelProps) => {
  const actionElement = context.type;
  const stateOpen = context.value;

  const onContinueAction = (name: string) => {
    const options = {
      guest: () => startTransition(() => onFormAction(new FormData())),
      register: () => {
        controlAside(context, 'register', actionElement, stateOpen, 'register');
      },
      login: () => {
        controlAside(context, 'login', actionElement, stateOpen, 'login');
      },
    };

    options[name as keyof typeof options]();
  };

  return onContinueAction;
};
