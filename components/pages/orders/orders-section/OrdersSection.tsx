'use client';
import styles from './OrdersSection.module.css';
import stylesAccordionContent from '@/components/shared/accordion/Accordion.module.css';
import { OrdersSectionProps } from './types';
import { Section } from '@/components/shared';
import { useState } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionHeader,
} from '@/components/shared';
import {
  OrderAddress,
  OrderDate,
  OrderStatus,
  OrderDelivery,
  OrderPayment,
  OrderTerms,
  OrderProducts,
  OrderSummary,
} from '@/components/pages';

export const OrdersSection = ({ children, ordersData }: OrdersSectionProps) => {
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  return (
    <Section>
      {children}
      {ordersData &&
        ordersData.map((order) => (
          <Accordion key={order._id}>
            <AccordionHeader
              checked={selectedValue === order._id}
              name={order._id!}
              title={`Order id: ${order._id}`}
              onClick={(id) => {
                setSelectedValue(selectedValue === id ? null : id);
              }}
            />
            <AccordionContent
              active={selectedValue === order._id}
              className={stylesAccordionContent.contentOrders}
            >
              <div className={styles.container}>
                <OrderAddress className={styles} ordersData={order} />
                <OrderDate className={styles} ordersData={order} />
                <OrderStatus className={styles} ordersData={order} />
                <OrderDelivery className={styles} ordersData={order} />
                <OrderPayment className={styles} ordersData={order} />
                <OrderTerms className={styles} ordersData={order} />
                <OrderProducts className={styles} ordersData={order} />
                <OrderSummary className={styles} ordersData={order} />
              </div>
            </AccordionContent>
          </Accordion>
        ))}
    </Section>
  );
};
