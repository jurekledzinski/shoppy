'use client';
import styles from './OrdersSection.module.css';
import { OrdersSectionProps } from './types';
import { Section } from '@/components/shared';
import { useEffect, useState } from 'react';

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
  const [open, setOpen] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!ordersData) return;
    const formattedOrders = ordersData.map((order) => order._id);
    const objOrders: Record<string, boolean> = {};
    for (const id of formattedOrders) {
      objOrders[id as string] = false;
    }
    setOpen(objOrders);
  }, [ordersData]);

  return (
    <Section>
      {children}

      {ordersData &&
        ordersData.map((order) => (
          <Accordion key={order._id}>
            <AccordionHeader
              name={order._id!}
              title={`Order id: ${order._id}`}
              onChange={(e) => {
                setOpen((prev) => {
                  const formatPrev = Object.fromEntries(
                    Object.entries(prev).map((i) => [i[0], false])
                  );
                  return {
                    ...formatPrev,
                    [e.target.value]: !formatPrev[e.target.value],
                  };
                });
              }}
            />
            <AccordionContent active={open[order?._id ?? '']}>
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
