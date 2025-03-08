import { EventButton, Redirect } from '../aside-panels';

export type RegisterPanelProps = {
  onRedirect: (e: EventButton, panel: Redirect) => void;
  onSuccess: () => void;
};
