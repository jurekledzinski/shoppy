import { MouseEventHandler } from 'react';

export type MenuPanelProps = {
  onRedirectContact?: MouseEventHandler<HTMLLIElement>;
  onRedirectLogin?: MouseEventHandler<HTMLLIElement>;
  onRedirectRegister?: MouseEventHandler<HTMLLIElement>;
  onCloseAside: () => void;
  userId: string;
};
