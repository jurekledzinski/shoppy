import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { Loader, Section } from '@/components/shared';
import { ProdcutsContainer } from '../products-container';
import { ProductsSectionProps } from './types';
import { Suspense } from 'react';

export const ProductsSection = ({ children, data }: ProductsSectionProps) => {
  return (
    <Section>
      {children}
      <Suspense fallback={<Loader className={stylesLoader.loaderCenter} />}>
        <ProdcutsContainer data={data} />{' '}
      </Suspense>
    </Section>
  );
};
