import { ProductDetailsSectionProps } from './types';

export const ProductDetailsSection = ({
  children,
}: ProductDetailsSectionProps) => {
  return (
    <section>
      {children}
      Details section product
    </section>
  );
};
