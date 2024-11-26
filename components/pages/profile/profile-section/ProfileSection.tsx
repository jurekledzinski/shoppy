'use client';
import { startTransition, useActionState } from 'react';
import { ChangePasswordForm, UpdateProfileForm } from '../forms';
import { showToast } from '@/helpers';
import { useChangePasswordForm, useUpdateProfileForm } from '@/hooks';
import {
  changeUserPassword,
  updateUserProfile,
  deleteUserAccount,
} from '@/actions';
import styles from './ProfileSection.module.css';
import { AlertError, Button, Loader } from '@/components/shared';
import { ProfileSectionProps } from './types';

export const ProfileSection = ({ user }: ProfileSectionProps) => {
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
    defaults: user,
    formAction: formActionProfile,
    isPending: isPendingProfile,
    isSuccess: stateProfile.success,
    onSuccessAction: () => {
      showToast(stateProfile.message);
    },
  });

  const { methodsChangePassword, onSubmitChangePassword } =
    useChangePasswordForm({
      formAction: formActionPassword,
      isPending: isPendingPassword,
      isSuccess: statePassword.success,
      onSuccessAction: () => {
        showToast(statePassword.message);
      },
    });

  return (
    <section className={styles.section}>
      <header className={styles.headerUpdateProfile}>
        Update profile user
      </header>
      <UpdateProfileForm
        isPending={isPendingProfile}
        methods={methodsUpdateProfile}
        onSubmitAction={onSubmitUpdateProfile}
        state={stateProfile}
      />

      <header className={styles.headerChangePassword}>
        Change password user
      </header>
      <ChangePasswordForm
        isPending={isPendingPassword}
        methods={methodsChangePassword}
        onSubmitAction={onSubmitChangePassword}
        state={statePassword}
      />

      <header className={styles.headerDeleteAccount}>
        Delete user account
      </header>

      <Button
        className={styles.button}
        disabled={isPendingDeleteAccount}
        type="button"
        text="Delete account"
        onClick={(e) => {
          e.preventDefault();
          const formData = new FormData();
          startTransition(() => {
            formActionDeleteAccount(formData);
          });
        }}
      >
        {isPendingDeleteAccount && <Loader />}
      </Button>

      {!stateDeleteAccount.success && stateDeleteAccount.message && (
        <AlertError>{stateDeleteAccount.message}</AlertError>
      )}
    </section>
  );
};
