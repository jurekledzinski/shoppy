import { toast } from 'react-toastify';

export const showToast = (message: string, autoClose?: number) => {
  const theme = JSON.parse(localStorage.getItem('mode')!) || 'light';
  toast.success(message, { theme, ...(autoClose && { autoClose }) });
};
