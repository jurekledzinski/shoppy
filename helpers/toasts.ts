import toast from 'react-hot-toast';

export const showToast = (message: string, autoClose?: number) => {
  toast.success(message, { ...(autoClose && { duration: autoClose }) });
};
