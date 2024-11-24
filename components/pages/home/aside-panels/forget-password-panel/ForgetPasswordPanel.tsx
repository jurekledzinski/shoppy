import { ForgetPasswordForm } from '../../forms';
import stylesAside from '@components/shared/aside/Aside.module.css';
import { ForgetPasswordPanelProps } from './types';

export const ForgetPasswordPanel = ({
  isPending,
  methods,
  onSubmitAction,
  state,
}: ForgetPasswordPanelProps) => {
  return (
    <>
      <header className={stylesAside.header}>Forget password</header>
      <ForgetPasswordForm
        isPending={isPending}
        methods={methods}
        onSubmitAction={onSubmitAction}
        state={state}
      />
    </>
  );
};
