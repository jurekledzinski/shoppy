'use client';
import styles from './LoginPanel.module.css';
import { login } from '@/actions';
import { LoginForm } from '../../forms';
import { LoginPanelProps } from './types';
import { QuestionRedirect } from '@/components/shared';
import { useActionState } from 'react';
import { useLoginForm } from '@/hooks';

export const LoginPanel = ({
  onRedirectForgetPassword,
  onRedirectRegister,
  optionCheckout,
  onSuccessAction,
}: LoginPanelProps) => {
  const [stateLogin, formActionLogin, isPendingLogin] = useActionState(login, {
    message: '',
    success: false,
  });

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    formAction: formActionLogin,
    isPending: isPendingLogin,
    isSuccess: stateLogin.success,
    onSuccess: onSuccessAction,
    optionCheckout,
  });

  return (
    <>
      <header className={styles.header}>Sign In</header>
      <LoginForm
        methods={methodsLogin}
        onSubmit={onSubmitLogin}
        state={stateLogin}
        isPending={isPendingLogin}
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
