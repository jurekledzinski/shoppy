import { UserTypes } from '@/store/user';
import { useEffect } from 'react';

type UseLoadUserProps = {
  body?: UserTypes;
  onChange?: ((user: UserTypes) => void) | undefined;
};

export const useLoadUser = ({ body, onChange }: UseLoadUserProps) => {
  useEffect(() => {
    if (body && onChange) {
      onChange(body ?? null);
    }
  }, [body, onChange]);
};
