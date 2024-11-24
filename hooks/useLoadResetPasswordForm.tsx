'use client';
import { AsideState } from '@/store/aside';
import { useEffect } from 'react';

type UseLoadResetPasswordFormProps = {
  context: AsideState;
  paramActionType: string | null;
};

export const useLoadResetPasswordForm = ({
  context,
  paramActionType,
}: UseLoadResetPasswordFormProps) => {
  useEffect(() => {
    if (paramActionType === 'reset_password' && !context.value) {
      console.log('load reset password');
      context.onChange('reset_password', true);
    }
  }, [context, paramActionType]);
};
