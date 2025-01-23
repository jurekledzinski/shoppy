import styles from './ProfileSection.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Alert, ModalDelete } from '@/components/shared';
import { ChangePasswordForm, UpdateProfileForm } from '../forms';
import { clearDataDeleteAccount } from '@/actions';
import { logOut } from '@/auth';
import { ProfileControlProps } from './types';
import { showToast } from '@/helpers';
import { startTransition, useCallback } from 'react';

export const ProfileControl = ({
  actionDelete,
  actionPassword,
  actionProfile,
  methodsChangePassword,
  methodsUpdateProfile,
  onClearCart,
  onSubmitChangePassword,
  onSubmitUpdateProfile,
  onRedirectSuccess,
  resetStateActionDelete,
}: ProfileControlProps) => {
  return (
    <>
      <header className={styles.headerUpdateProfile}>
        Update profile user
      </header>
      <UpdateProfileForm
        isPending={actionProfile.isPending}
        methods={methodsUpdateProfile}
        onSubmit={onSubmitUpdateProfile}
        state={actionProfile.state}
      />

      <header className={styles.headerChangePassword}>
        Change password user
      </header>
      <ChangePasswordForm
        isPending={actionPassword.isPending}
        methods={methodsChangePassword}
        onSubmit={onSubmitChangePassword}
        state={actionPassword.state}
      />

      <header className={styles.headerDeleteAccount}>
        Delete user account
      </header>

      <ModalDelete
        isPending={actionDelete.isPending}
        isSuccess={actionDelete.state.success}
        classButton={stylesButton.buttonDelete}
        onConfirm={(e) => {
          e.preventDefault();
          startTransition(() => {
            actionDelete.formAction(new FormData());
          });
        }}
        title="Delete user account"
        onSuccess={useCallback(async () => {
          onClearCart();

          await clearDataDeleteAccount('', new FormData());

          resetStateActionDelete();

          await logOut();

          showToast(actionDelete.state.message);

          onRedirectSuccess();
        }, [
          actionDelete.state.message,
          onClearCart,
          onRedirectSuccess,
          resetStateActionDelete,
        ])}
        textButton="Delete account"
      >
        <p className={styles.modalDeleteText}>
          Are you sure you want delete your account?
        </p>
      </ModalDelete>

      {!actionDelete.state.success && actionDelete.state.message && (
        <Alert>{actionDelete.state.message}</Alert>
      )}
    </>
  );
};
