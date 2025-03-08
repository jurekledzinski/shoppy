import { ModalGuestSessionProps } from './types';
import { ModalWarning } from '@/components/shared';

export const ModalGuestSession = ({
  isPending,
  isOpen,
  isSuccess,
  onConfirm,
}: ModalGuestSessionProps) => {
  return (
    <ModalWarning
      confirm="Extend session"
      isOpen={isOpen}
      isPending={isPending}
      isSuccess={isSuccess}
      title="Session will expire in 10 minutes"
      onConfirm={onConfirm}
    >
      <p>
        Your guest session will expire in 10 minutes. Please click extend
        session button to stay logged in as guest user.
      </p>
    </ModalWarning>
  );
};
