'use client';
import styles from './ProfileSection.module.css';
import stylesButton from '@styles/buttons.module.css';
import { Alert, ModalDelete, Section } from '@/components/shared';
import { ChangePasswordForm, UpdateProfileForm } from '../forms';
import { logOut } from '@/auth';
import { ProfileSectionProps } from './types';
import { showToast } from '@/helpers';
import { startTransition, useActionState } from 'react';
import { useChangePasswordForm, useUpdateProfileForm } from '@/hooks';
import { useRouter } from 'next/navigation';

import {
  changeUserPassword,
  deleteUserAccount,
  updateUserProfile,
} from '@/actions';

export const ProfileSection = ({ children, userData }: ProfileSectionProps) => {
  const router = useRouter();

  const [stateDeleteAccount, formActionDeleteAccount, isPendingDeleteAccount] =
    useActionState(deleteUserAccount, {
      message: '',
      success: false,
    });

  const [stateProfile, formActionProfile, isPendingProfile] = useActionState(
    updateUserProfile,
    {
      message: '',
      success: false,
    }
  );

  const [statePassword, formActionPassword, isPendingPassword] = useActionState(
    changeUserPassword,
    {
      message: '',
      success: false,
    }
  );

  const { methodsUpdateProfile, onSubmitUpdateProfile } = useUpdateProfileForm({
    defaults: userData,
    formAction: formActionProfile,
    isPending: isPendingProfile,
    isSuccess: stateProfile.success,
    onSuccess: () => {
      showToast(stateProfile.message);
    },
  });

  const { methodsChangePassword, onSubmitChangePassword } =
    useChangePasswordForm({
      formAction: formActionPassword,
      isPending: isPendingPassword,
      isSuccess: statePassword.success,
      onSuccess: () => {
        showToast(statePassword.message);
      },
    });

  return (
    <Section>
      {children}
      <header className={styles.headerUpdateProfile}>
        Update profile user
      </header>
      <UpdateProfileForm
        isPending={isPendingProfile}
        methods={methodsUpdateProfile}
        onSubmit={onSubmitUpdateProfile}
        state={stateProfile}
      />

      <header className={styles.headerChangePassword}>
        Change password user
      </header>
      <ChangePasswordForm
        isPending={isPendingPassword}
        methods={methodsChangePassword}
        onSubmit={onSubmitChangePassword}
        state={statePassword}
      />

      <header className={styles.headerDeleteAccount}>
        Delete user account
      </header>

      <ModalDelete
        isPending={isPendingDeleteAccount}
        isSuccess={stateDeleteAccount.success}
        classButton={stylesButton.buttonDelete}
        onConfirm={(e) => {
          e.preventDefault();
          const formData = new FormData();
          startTransition(() => {
            formActionDeleteAccount(formData);
          });
        }}
        title="Delete user account"
        onSuccess={async () => {
          await logOut();
          showToast(stateDeleteAccount.message);
          router.replace('/');
        }}
        textButton="Delete account"
      >
        <p className={styles.modalDeleteText}>
          Are you sure you want delete your account?
        </p>
      </ModalDelete>

      {!stateDeleteAccount.success && stateDeleteAccount.message && (
        <Alert>{stateDeleteAccount.message}</Alert>
      )}
    </Section>
  );
};
