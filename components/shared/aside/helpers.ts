import { toast } from 'react-toastify';
import { AsideState, AsideType } from '@/store/aside';

export const setDefaultCloseAside = (
  context: AsideState,
  message: string,
  actionElement: AsideType
) => {
  const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
  toast.success(message, { theme });
  context.onChange(actionElement, false);
};
