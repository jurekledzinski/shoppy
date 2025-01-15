import { useEffect, useRef } from 'react';

export const useSetTimeoutController = () => {
  const timeoutIds = useRef<ReturnType<typeof setTimeout>[]>([]);

  const setControlTimeout = (callback: () => void, delay: number) => {
    const id = setTimeout(callback, delay);
    timeoutIds.current.push(id);
  };

  useEffect(() => {
    const arrTimeoutIds = timeoutIds.current;
    return () => {
      arrTimeoutIds.forEach((id) => clearTimeout(id));
      timeoutIds.current = [];
    };
  }, []);

  return setControlTimeout;
};
