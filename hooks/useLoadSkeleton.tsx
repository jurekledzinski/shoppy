import { useEffect, useState } from 'react';

export const useLoadSkeleton = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    setIsLoaded(false);
  }, []);

  return isLoaded;
};
