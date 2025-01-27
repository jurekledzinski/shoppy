import { AsideState, AsideType } from '@/store/aside';

export type MenuPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  stateOpen: boolean;
  user: { id: string; name: string };
  onSuccessAction: () => void;
};

export type UseMenuPanelProps = {
  actionElement: AsideType;
  context: AsideState;
  stateOpen: boolean;
  onSuccess: () => void;
};
