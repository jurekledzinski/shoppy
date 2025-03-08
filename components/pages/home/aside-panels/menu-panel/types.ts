import { AsideState, AsideType } from '@/store/aside';

export type MenuPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  stateOpen: boolean;
  user: { userId: string; userName: string };
  onSuccess: () => void;
};

export type UseMenuPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  stateOpen: boolean;
  onSuccess: () => void;
};
