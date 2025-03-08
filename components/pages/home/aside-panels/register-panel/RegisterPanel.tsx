'use client';
import styles from './RegisterPanel.module.css';
import { QuestionRedirect } from '@/components/shared';
import { RegisterForm } from '../../forms';
import { RegisterPanelProps } from './types';
import { useRegisterForm } from '@/hooks';
import { useActionState } from 'react';
import { register } from '@/actions';

export const RegisterPanel = ({
  onRedirect,
  onSuccess,
}: RegisterPanelProps) => {
  const [stateRegister, formActionRegister, isPendingRegister] = useActionState(
    register,
    {
      message: '',
      success: false,
    }
  );

  const { methodsRegister, onSubmitRegister } = useRegisterForm({
    onSubmitForm: formActionRegister,
    isPending: isPendingRegister,
    isSuccess: stateRegister.success,
    onSuccess,
  });
  return (
    <>
      <header className={styles.header}>Sign Up</header>
      <RegisterForm
        isPending={isPendingRegister}
        methods={methodsRegister}
        onSubmit={onSubmitRegister}
        state={stateRegister}
      />

      <div className={styles.wrapper}>
        <QuestionRedirect
          buttonText="Sign in here"
          question=" Already registered?"
          onClick={(e) => onRedirect(e, 'login')}
        />
      </div>
    </>
  );
};
