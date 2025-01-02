'use client';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import { resetPassword } from '@/actions';
import { ResetPasswordForm } from '../../forms';
import { ResetPasswordPanelProps } from './types';
import { useActionState } from 'react';
import { useResetPasswordForm } from '@/hooks';

export const ResetPasswordPanel = ({
  onCancel,
  onSuccess,
}: ResetPasswordPanelProps) => {
  const [state, formAction, isPending] = useActionState(resetPassword, {
    message: '',
    success: false,
  });

  const { methods, onSubmit } = useResetPasswordForm({
    formAction,
    isPending,
    isSuccess: state.success,
    onSuccess: () => onSuccess(state.message),
  });
  return (
    <>
      <header className={stylesAside.header}>Reset password</header>
      <ResetPasswordForm
        isPending={isPending}
        methods={methods}
        onSubmit={onSubmit}
        state={state}
        onCancel={onCancel}
      />
    </>
  );
};
