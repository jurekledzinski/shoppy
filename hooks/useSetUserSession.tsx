import { SessionContextType } from '@/store/session';
import { useEffect } from 'react';

type UseSetUserSessionProps = {
  guestId: string | null;
  sessionUser: SessionContextType;
  userId: string;
  onLoggedGuest: (guestId: string) => void;
  onNotLoggedGuest: () => void;
  onLoggedUser: (userId: string) => void;
  onNotLoggedUser: () => void;
};

export const useSetUserSession = ({
  guestId,
  sessionUser,
  userId,
  onLoggedGuest,
  onNotLoggedGuest,
  onLoggedUser,
  onNotLoggedUser,
}: UseSetUserSessionProps) => {
  useEffect(() => {
    if (guestId && !sessionUser.guestUser) onLoggedGuest(guestId);

    if (!guestId && sessionUser.guestUser) onNotLoggedGuest();

    if (userId && !sessionUser.userSession) onLoggedUser(userId);

    if (!userId && sessionUser?.setSessionUser && sessionUser.userSession) {
      onNotLoggedUser();
    }
  }, [
    guestId,
    userId,
    sessionUser,
    onLoggedGuest,
    onNotLoggedGuest,
    onLoggedUser,
    onNotLoggedUser,
  ]);
};
