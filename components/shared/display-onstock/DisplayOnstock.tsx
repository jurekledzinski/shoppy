'use client';

import { DisplayOnstockProps } from './types';

export const DisplayOnstock = ({ className, onStock }: DisplayOnstockProps) => {
  return (
    <span className={[className].filter(Boolean).join(' ')}>
      On stock: {onStock}{' '}
    </span>
  );
};
