'use client';
import styles from './ProfileSection.module.css';
import stylesButton from '@styles/buttons.module.css';
import { ChangePasswordForm, UpdateProfileForm } from '../forms';
import { ProfileSectionProps } from './types';
import { showToast } from '@/helpers';
import { startTransition, useActionState } from 'react';
import { useChangePasswordForm, useUpdateProfileForm } from '@/hooks';
import { useRouter } from 'next/navigation';

import {
  changeUserPassword,
  updateUserProfile,
  deleteUserAccount,
} from '@/actions';
import {
  AlertError,
  ModalContainer as ModalUserDelete,
} from '@/components/shared';
import { useUser } from '@/store/user';

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const router = useRouter();
  const userStore = useUser();
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

      <ModalUserDelete
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
        onSuccess={() => {
          userStore.onChange && userStore.onChange(null);
          showToast(stateDeleteAccount.message);
          router.replace('/');
        }}
      >
        <p className={styles.modalDeleteText}>
          Are you sure you want delete your account?
        </p>
      </ModalUserDelete>

      {!stateDeleteAccount.success && stateDeleteAccount.message && (
        <AlertError>{stateDeleteAccount.message}</AlertError>
      )}
    </section>
  );
};
