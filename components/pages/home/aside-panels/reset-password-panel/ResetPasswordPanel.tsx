import { ResetPasswordForm } from '../../forms';
import stylesAside from '@/components/shared/aside/Aside.module.css';
import { ResetPasswordPanelProps } from './types';

export const ResetPasswordPanel = ({
  isPending,
  methods,
  onCancel,
  onSubmit,
  state,
}: ResetPasswordPanelProps) => {
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
