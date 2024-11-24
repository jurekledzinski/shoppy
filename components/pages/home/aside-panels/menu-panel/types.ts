import { MouseEventHandler } from 'react';

export type MenuPanelProps = {
  onRedirectContact?: MouseEventHandler<HTMLLIElement>;
  onRedirectLogin?: MouseEventHandler<HTMLLIElement>;
  onRedirectRegister?: MouseEventHandler<HTMLLIElement>;
  onLogoutAction: () => void;
  onCloseAsideAction: () => void;
  user: { id: string; name: string };
};
