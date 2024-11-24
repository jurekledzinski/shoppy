'use client';
import styles from './RegisterPanel.module.css';
import { QuestionRedirect } from '@/components/shared';
import { RegisterForm } from '../../forms';
import { RegisterPanelProps } from './types';

export const RegisterPanel = ({
  onRedirectLogin,
  isPending,
  methods,
  onSubmitAction,
  state,
}: RegisterPanelProps) => {
  return (
    <>
      <header className={styles.header}>Sign Up</header>
      <RegisterForm
        isPending={isPending}
        methods={methods}
        onSubmitAction={onSubmitAction}
        state={state}
      />

      <div className={styles.wrapper}>
        <QuestionRedirect
          buttonText="Sign in here"
          question=" Already registered?"
          onClick={onRedirectLogin}
        />
      </div>
    </>
  );
};
