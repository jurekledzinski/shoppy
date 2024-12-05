import { ForgetPasswordForm } from '../../forms';
import stylesAside from '@components/shared/aside/Aside.module.css';
import { ForgetPasswordPanelProps } from './types';

export const ForgetPasswordPanel = ({
  isPending,
  methods,
  onSubmit,
  state,
}: ForgetPasswordPanelProps) => {
  return (
    <>
      <header className={stylesAside.header}>Forget password</header>
      <ForgetPasswordForm
        isPending={isPending}
        methods={methods}
        onSubmit={onSubmit}
        state={state}
      />
    </>
  );
};
