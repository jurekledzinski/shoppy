'use client';
import { OrdersList } from '@/components/pages';
import { OrdersSectionProps } from './types';
import { Loader, Section } from '@/components/shared';
import { Suspense, useState } from 'react';

export const OrdersSection = ({ children, ordersData }: OrdersSectionProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <Section>
      {children}
      <Suspense fallback={<Loader position="center" size={30} />}>
        <OrdersList
          onSelectValue={(id) =>
            setSelectedValue(selectedValue === id ? null : id)
          }
          ordersData={ordersData}
          selectedValue={selectedValue}
        />
      </Suspense>
    </Section>
  );
};
