'use client';
import { AlertError } from '@/components/shared';
import { CardBrand, Tab, Tabs, TabsList, TabsPanel } from '@/components/shared';
import { TabsCategoriesContainerProps } from './types';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const tabs = ['Phones', 'Tablets', 'Watches'];

export const TabsCategoriesContainer = ({
  data,
  error,
}: TabsCategoriesContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || 'phones';
  const [activeTab, setActiveTab] = useState(category);

  useEffect(() => setActiveTab(category), [category]);

  return (
    <>
      <Tabs>
        <TabsList>
          {tabs.map((tab) => (
            <Tab
              key={tab}
              activeTab={activeTab}
              id={tab.toLowerCase()}
              title={tab}
              onClick={(id) => {
                router.push(`?category=${id.toLowerCase()}`, {
                  scroll: false,
                });
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabsList>
        <TabsPanel>
          {data.map((item, index) => (
            <CardBrand
              alt={item.brand}
              src={item.image}
              title={item.brand}
              key={index}
              url={`/${item.category}/${item.brand}`}
            />
          ))}
        </TabsPanel>
      </Tabs>

      {error && !error.success && error.message && (
        <AlertError>{error.message}</AlertError>
      )}
    </>
  );
};
