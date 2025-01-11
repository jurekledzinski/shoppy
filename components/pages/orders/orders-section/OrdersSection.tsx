'use client';
import { useEffect, useState } from 'react';
import styles from './OrdersSection.module.css';
import { OrdersSectionProps } from './types';
import {
  Accordion,
  AccordionContent,
  AccordionHeader,
} from '@/components/shared';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderProductsList } from '@/components/shared';

export const OrdersSection = ({ children, ordersData }: OrdersSectionProps) => {
  const [open, setOpen] = useState<Record<string, boolean>>({});

  console.log('open', open);

  useEffect(() => {
    if (!ordersData) return;
    const formattedOrders = ordersData.map((order) => order._id);
    const objOrders: Record<string, boolean> = {};
    for (const id of formattedOrders) {
      objOrders[id as string] = false;
    }
    setOpen(objOrders);
  }, [ordersData]);

  console.log('ordersData OrdersSection', ordersData);
  return (
    <section className={styles.section}>
      {children}

      {ordersData &&
        ordersData?.map((order) => (
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
                    [e.target.value]: true,
                  };
                });
              }}
            />
            <AccordionContent active={open[order?._id ?? '']}>
              <div className={styles.container}>
                <h4 className={styles.title}>Address:</h4>
                <ul className={styles.list}>
                  <li>
                    Name: {order.name} {order.surname}
                  </li>
                  <li>Street: {order.street}</li>
                  <li>Postcode: {order.postCode}</li>
                  <li>City: {order.city}</li>
                  <li>Country: {order.country}</li>
                </ul>
                <h4 className={styles.title}>Date order:</h4>
                <ul className={styles.list}>
                  <li>Date: {new Date(order.createdAt).toLocaleString()}</li>
                </ul>
                <h4 className={styles.title}>Status order:</h4>
                <ul className={styles.list}>
                  <li className={styles.element}>
                    <span className={styles.subTitle}>Payment:</span>
                    {order.isPaid ? (
                      <span className={styles.check}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : (
                      <span className={styles.unCheck}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    )}
                  </li>
                  <li className={styles.element}>
                    <span className={styles.subTitle}>Send:</span>
                    {order.isSent ? (
                      <span className={styles.check}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : (
                      <span className={styles.unCheck}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    )}
                  </li>
                  <li className={styles.element}>
                    <span className={styles.subTitle}>Delivered:</span>
                    {order.isDelivered ? (
                      <span className={styles.check}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : (
                      <span className={styles.unCheck}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    )}
                  </li>
                </ul>
                <h4 className={styles.title}>Delivery:</h4>
                <ul className={styles.list}>
                  <li>Method delivery: {order.methodDelivery}</li>
                  <li>Price delivery: {order.priceDelivery}€</li>
                </ul>
                <h4 className={styles.title}>Payment:</h4>
                <ul className={styles.list}>
                  <li>Method payment: {order.methodPayment}</li>
                </ul>
                <h4 className={styles.title}>Terms and conditions:</h4>
                <ul className={styles.list}>
                  <li className={styles.element}>
                    <span className={styles.subTitle}> Accepted:</span>
                    {order.termsConditions ? (
                      <span className={styles.check}>
                        <FontAwesomeIcon icon={faCheck} />
                      </span>
                    ) : (
                      <span className={styles.unCheck}>
                        <FontAwesomeIcon icon={faXmark} />
                      </span>
                    )}
                  </li>
                </ul>
                <h4 className={styles.title}>Products:</h4>
                <OrderProductsList items={order.cart?.products ?? []} />
                <h4 className={styles.title}>Summary order:</h4>
                <ul className={styles.list}>
                  <li className={styles.element}>
                    <span>Total amount items:</span>
                    {(order.cart?.totalAmountCart ?? 1) > 1
                      ? order.cart?.totalAmountCart + ' items'
                      : order.cart?.totalAmountCart + ' item'}
                  </li>
                  <li className={styles.element}>
                    <span>Total price:</span>
                    {order.cart?.totalPriceCart}€
                  </li>
                  <li className={styles.element}>
                    <span>Total price with delivery:</span>
                    {(order.cart?.totalPriceCart ?? 0) + order.priceDelivery}€
                  </li>
                </ul>
              </div>
            </AccordionContent>
          </Accordion>
        ))}
    </section>
  );
};
