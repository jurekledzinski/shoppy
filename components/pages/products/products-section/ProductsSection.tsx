import { Loader, Section } from '@/components/shared';
import { ProdcutsContainer } from '../products-container';
import { ProductsSectionProps } from './types';
import { Suspense } from 'react';

export const ProductsSection = ({ children, data }: ProductsSectionProps) => {
  return (
    <Section>
      {children}
      <Suspense fallback={<Loader position="center" size={30} />}>
        <ProdcutsContainer data={data} />
      </Suspense>
    </Section>
  );
};
