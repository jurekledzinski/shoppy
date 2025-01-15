'use client';
import styles from './ProfileSection.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Alert, ModalDelete, Section } from '@/components/shared';
import { ChangePasswordForm, UpdateProfileForm } from '../forms';
import { logOut } from '@/auth';
import { ProfileSectionProps } from './types';
import { showToast } from '@/helpers';
import { startTransition, useCallback } from 'react';
import { useCart } from '@/store/cart';
import { useRouter } from 'next/navigation';

import {
  useActionStateAndReset,
  useChangePasswordForm,
  useUpdateProfileForm,
} from '@/hooks';

import {
  changeUserPassword,
  deleteUserAccount,
  updateUserProfile,
  clearDataDeleteAccount,
} from '@/actions';

export const ProfileSection = ({ children, userData }: ProfileSectionProps) => {
  const router = useRouter();
  const { dispatch } = useCart();

  const { action: actionDelete, resetStateAction: resetStateActionDelete } =
    useActionStateAndReset({
      fnAction: deleteUserAccount,
    });

  const { action: actionProfile, resetStateAction: resetStateActionProfile } =
    useActionStateAndReset({
      fnAction: updateUserProfile,
    });

  const { action: actionPassword, resetStateAction: resetStateActionPassword } =
    useActionStateAndReset({
      fnAction: changeUserPassword,
    });

  const { methodsUpdateProfile, onSubmitUpdateProfile } = useUpdateProfileForm({
    defaults: userData,
    formAction: actionProfile.formAction,
    isPending: actionProfile.isPending,
    isSuccess: actionProfile.state.success,
    onSuccess: () => {
      resetStateActionProfile();
      showToast(actionProfile.state.message);
    },
  });

  const { methodsChangePassword, onSubmitChangePassword } =
    useChangePasswordForm({
      formAction: actionPassword.formAction,
      isPending: actionPassword.isPending,
      isSuccess: actionPassword.state.success,
      onSuccess: () => {
        resetStateActionPassword();
        showToast(actionPassword.state.message);
      },
    });

  return (
    <Section>
      {children}
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
          dispatch({ type: 'CLEAR_CART' });

          await clearDataDeleteAccount('', new FormData());

          resetStateActionDelete();

          await logOut();

          showToast(actionDelete.state.message);

          router.replace('/');
        }, [
          actionDelete.state.message,
          dispatch,
          router,
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
    </Section>
  );
};
