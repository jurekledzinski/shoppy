import { EventButton, Redirect } from '../aside-panels';

export type LoginPanelProps = {
  onRedirect: (e: EventButton, panel: Redirect) => void;
  onSuccess: () => void;
  optionCheckout?: string | null;
};
