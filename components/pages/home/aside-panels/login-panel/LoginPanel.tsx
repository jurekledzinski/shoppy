'use client';
import styles from './LoginPanel.module.css';
import { login } from '@/actions';
import { LoginForm } from '../../forms';
import { LoginPanelProps } from './types';
import { QuestionRedirect } from '@/components/shared';
import { useEffect } from 'react';
import { useActionStateAndReset, useLoginForm } from '@/hooks';

export const LoginPanel = ({
  onRedirectForgetPassword,
  onRedirectRegister,
  optionCheckout,
  onSuccessAction,
}: LoginPanelProps) => {
  const { action, resetStateAction } = useActionStateAndReset({
    fnAction: login,
    onResetAction: () => {
      onSuccessAction();
    },
  });

  useEffect(() => {
    if (action.state.success && !action.isPending) {
      resetStateAction();
    }
  }, [action, resetStateAction]);

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: action.formAction,
    isPending: action.isPending,
    isSuccess: action.state.success,
    onSuccess: () => {},
    optionCheckout,
  });

  return (
    <>
      <header className={styles.header}>Sign In</header>
      <LoginForm
        methods={methodsLogin}
        onSubmit={onSubmitLogin}
        state={action.state}
        isPending={action.isPending}
      />

      <div className={styles.wrapper}>
        <QuestionRedirect
          buttonText="Sign up here"
          question="Not registered?"
          onClick={onRedirectRegister}
        />

        <QuestionRedirect
          buttonText="Click here"
          question="Forget password?"
          onClick={onRedirectForgetPassword}
        />
      </div>
    </>
  );
};
