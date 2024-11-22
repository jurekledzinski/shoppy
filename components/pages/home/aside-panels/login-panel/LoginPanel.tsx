'use client';
import { QuestionRedirect } from '@/components/shared';
import { LoginForm } from '../../forms';
import { LoginPanelProps } from './types';
import styles from './LoginPanel.module.css';

export const LoginPanel = ({
  context,
  isPending,
  methods,
  onSubmitAction,
  state,
  onRedirectForgetPassword,
  onRedirectRegister,
}: LoginPanelProps) => {
  return (
    <>
      <header className={styles.header}>Sign In</header>
      <LoginForm
        context={context}
        methods={methods}
        onSubmitAction={onSubmitAction}
        state={state}
        isPending={isPending}
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
