import { MouseEventHandler } from 'react';

export type MenuPanelProps = {
  onRedirectContact?: MouseEventHandler<HTMLLIElement>;
  onRedirectLogin?: MouseEventHandler<HTMLLIElement>;
  onRedirectRegister?: MouseEventHandler<HTMLLIElement>;
  onLogout: () => void;
  onCloseAside: () => void;
  user: { id: string; name: string };
};
