'use client';
import Image from 'next/image';
import styles from './ModalControlInventoryCheck.module.css';
import { CartItemCounter } from '@/components/shared';
import { ModalCheckInventory } from '@/components/shared';
import { localProduct, ModalControlInventoryCheckProps } from './types';
import { useEffect, useState } from 'react';

export const ModalControlInventoryCheck = ({
  cancel,
  confirm,
  inventoryData,
  isPending,
  title,
  onConfirm,
}: ModalControlInventoryCheckProps) => {
  const [localProducts, setLocalProducts] = useState<localProduct>({});

  const addLocalQuantity = (id: string) => {
    setLocalProducts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const subtractLocalQuantity = (id: string) => {
    setLocalProducts((prev) => ({ ...prev, [id]: prev[id] - 1 }));
  };

  useEffect(() => {
    if (Object.keys(localProducts).length) return;
    const obj: localProduct = {};
    for (const value of inventoryData) {
      obj[value.productId] = value.onStock;
    }
    setLocalProducts(obj);
  }, [inventoryData, localProducts]);

  return (
    <ModalCheckInventory
      isOpen={isPending ? false : Boolean(inventoryData.length)}
      title={title}
      cancel={cancel}
      confirm={confirm}
      onConfirm={(onClose) => onConfirm(localProducts, onClose)}
    >
      <h4 className={styles.subTitle}>
        Some items are in limited stock or unavailable.
      </h4>
      <p className={styles.text}>
        Please reduce the quantity of items with less stock.
      </p>
      <p className={styles.text}>
        Unavailable items, will be removed automatically after click save in
        cart.
      </p>
      {inventoryData.map((itemInventory) => (
        <div className={styles.wrapper} key={itemInventory.productId}>
          <div>
            <Image
              className={styles.image}
              src={itemInventory.image}
              width={30}
              height={30}
              alt={itemInventory.name}
              priority={true}
            />
          </div>
          <div className={styles.content}>
            <div>
              <p className={styles.text}>{itemInventory.name}</p>
              <p className={styles.text}>OnStock: {itemInventory.onStock}</p>
            </div>

            {itemInventory.onStock ? (
              <CartItemCounter
                addLocalQuantity={() =>
                  addLocalQuantity(itemInventory.productId)
                }
                classNameMinus={styles.minus}
                classNameInput={styles.input}
                classNamePlus={styles.plus}
                subtractLocalQuantity={() =>
                  subtractLocalQuantity(itemInventory.productId)
                }
                quanity={localProducts[itemInventory.productId]}
                disabledButtonMinus={
                  localProducts[itemInventory.productId] === 1
                }
                disabledButtonPlus={
                  itemInventory.onStock -
                    localProducts[itemInventory.productId] ===
                  0
                    ? true
                    : false
                }
              />
            ) : (
              <p className={styles.unavailable}>Product unavailable</p>
            )}
          </div>
        </div>
      ))}
    </ModalCheckInventory>
  );
};