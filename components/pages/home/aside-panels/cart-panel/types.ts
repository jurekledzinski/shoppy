import { AsideState, AsideType } from '@/store/aside';
import { CartState } from '@/store/cart';
import { Type, User } from '../aside-panels';

type BaseCartPanelTypes = {
  actionElement: AsideType;
  cartState: CartState;
  context: AsideState;
  onDispatch: (type: Type, payload: { id: string }) => void;
  onSuccess: () => void;
  stateOpen: boolean;
  user: User;
};

export interface CartPanelProps extends BaseCartPanelTypes {
  isPending?: boolean;
}

export type UseCartPanelProps = BaseCartPanelTypes;
