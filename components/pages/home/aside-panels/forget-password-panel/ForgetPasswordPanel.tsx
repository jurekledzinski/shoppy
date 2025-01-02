'use client';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import { forgetPassword } from '@/actions';
import { ForgetPasswordForm } from '../../forms';
import { ForgetPasswordPanelProps } from './types';
import { useActionState } from 'react';
import { useForgetPasswordForm } from '@/hooks';

export const ForgetPasswordPanel = ({
  onSuccess,
}: ForgetPasswordPanelProps) => {
  const [state, formAction, isPending] = useActionState(forgetPassword, {
    message: '',
    success: false,
  });

  const { methodsForgetPassword, onSubmitForgetPassword } =
    useForgetPasswordForm({
      formAction,
      isPending,
      isSuccess: state.success,
      onSuccess: () => onSuccess(state.message),
    });
  return (
    <>
      <header className={stylesAside.header}>Forget password</header>
      <ForgetPasswordForm
        isPending={isPending}
        methods={methodsForgetPassword}
        onSubmit={onSubmitForgetPassword}
        state={state}
      />
    </>
  );
};
