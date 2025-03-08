import { AsidePanelsProps } from './types';
import { CartPanel } from '../cart-panel';
import { ContactPanel } from '../contact-panel';
import { ForgetPasswordPanel } from '../forget-password-panel';
import { LoginPanel } from '../login-panel';
import { MenuPanel } from '../menu-panel';
import { ProccedCheckoutPanel } from '../procced-checkout-panel';
import { RegisterPanel } from '../register-panel';
import { ResetPasswordPanel } from '../reset-password-panel';

export const AsidePanels = ({
  cartState,
  context,
  isPending,
  onCancel,
  onContinue,
  onDispatch,
  onSuccess,
  onRedirect,
  user,
}: AsidePanelsProps) => {
  const actionElement = context.type;
  const stateOpen = context.value;
  const optionCheckout = context.checkout;
  const { guestId, userId, userName } = user;

  switch (context.type) {
    case 'menu':
      return (
        <MenuPanel
          actionElement={actionElement}
          context={context}
          stateOpen={stateOpen}
          user={{ userId, userName }}
          onSuccess={() => onSuccess('menu')}
        />
      );
    case 'cart':
      return (
        <CartPanel
          actionElement={actionElement}
          cartState={cartState}
          context={context}
          isPending={isPending}
          stateOpen={stateOpen}
          user={{ userId, userName, guestId }}
          onSuccess={() => onSuccess('cart')}
          onDispatch={onDispatch}
        />
      );
    case 'contact':
      return (
        <ContactPanel onSuccess={(message) => onSuccess('contact', message)} />
      );
    case 'login':
      return (
        <LoginPanel
          onRedirect={onRedirect}
          onSuccess={() => onSuccess('login')}
          optionCheckout={optionCheckout}
        />
      );
    case 'register':
      return (
        <RegisterPanel
          onRedirect={onRedirect}
          onSuccess={() => onSuccess('register')}
        />
      );
    case 'forget-password':
      return (
        <ForgetPasswordPanel
          onSuccess={(message) => onSuccess('forget-password', message)}
        />
      );
    case 'reset_password':
      return (
        <ResetPasswordPanel
          onCancel={(e) => onCancel(e, 'reset_password')}
          onSuccess={(message) => onSuccess('reset_password', message)}
        />
      );
    case 'procced-checkout-options':
      return (
        <ProccedCheckoutPanel
          isPending={isPending}
          onCancel={(e) => onCancel(e, 'procced-checkout')}
          onContinue={onContinue}
        />
      );
    default:
      return null;
  }
};
