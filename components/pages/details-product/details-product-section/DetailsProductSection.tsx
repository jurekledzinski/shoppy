import stylesLoader from '@/components/shared/loader/Loader.module.css';
import { DetailsProductSectionProps } from './types';
import { Loader, Section } from '@/components/shared';
import { ProductDetails } from '../product-details';
import { Suspense } from 'react';

export const DetailsProductSection = ({
  children,
  dataProduct,
  dataReviews,
  dataUser,
  errorReviews,
}: DetailsProductSectionProps) => {
  return (
    <Section>
      {children}
      <Suspense fallback={<Loader className={stylesLoader.loaderCenter} />}>
        <ProductDetails
          dataProduct={dataProduct}
          dataReviews={dataReviews}
          dataUser={dataUser}
          errorReviews={errorReviews}
        />
      </Suspense>
    </Section>
  );
};
