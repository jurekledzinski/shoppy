'use client';
import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { Loader, Section } from '@/components/shared';
import { ProfileControl } from '../profile-control';
import { ProfileSectionProps } from './types';
import { showToast } from '@/helpers';
import { Suspense, useCallback } from 'react';
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
      <Suspense fallback={<Loader className={stylesLoader.loaderCenter} />}>
        <ProfileControl
          actionDelete={actionDelete}
          actionProfile={actionProfile}
          actionPassword={actionPassword}
          methodsChangePassword={methodsChangePassword}
          methodsUpdateProfile={methodsUpdateProfile}
          onClearCart={useCallback(() => {
            dispatch({ type: 'CLEAR_CART' });
          }, [dispatch])}
          onSubmitChangePassword={onSubmitChangePassword}
          onSubmitUpdateProfile={onSubmitUpdateProfile}
          resetStateActionDelete={resetStateActionDelete}
          onRedirectSuccess={useCallback(() => {
            router.replace('/');
          }, [router])}
        />
      </Suspense>
    </Section>
  );
};
