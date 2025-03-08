import styles from './LoginPanel.module.css';
import { login } from '@/actions';
import { LoginForm } from '../../forms';
import { LoginPanelProps } from './types';
import { QuestionRedirect } from '@/components/shared';
import { useActionStateAndReset, useLoginForm } from '@/hooks';

export const LoginPanel = ({
  optionCheckout,
  onRedirect,
  onSuccess,
}: LoginPanelProps) => {
  const { action } = useActionStateAndReset({
    fnAction: login,
    onResetAction: () => onSuccess(),
    autoReset: true,
  });

  const { methodsLogin, onSubmitLogin } = useLoginForm({
    onSubmitForm: action.formAction,
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
          onClick={(e) => onRedirect(e, 'register')}
        />

        <QuestionRedirect
          buttonText="Click here"
          question="Forget password?"
          onClick={(e) => onRedirect(e, 'forget-password')}
        />
      </div>
    </>
  );
};
