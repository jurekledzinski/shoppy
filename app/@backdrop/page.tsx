'use client';
import { Backdrop as MainBackdrop } from '@/components/shared';
import { useAside } from '@/store/aside';

const Backdrop = () => {
  const context = useAside();

  return (
    <MainBackdrop
      onClick={() => {
        const actionElement = context.type;
        context.onChange(actionElement, false);
      }}
      show={context.value}
    />
  );
};

export default Backdrop;
