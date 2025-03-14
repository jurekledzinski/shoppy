'use client';
import { Alert } from '@/components/shared';
import { CardBrand, Tab, Tabs, TabsList, TabsPanel } from '@/components/shared';
import { setQueriesWithoutReload } from '@/helpers';
import { TabsCategoriesContainerProps } from './types';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';

const tabs = ['Phones', 'Tablets', 'Watches'];

export const TabsCategoriesContainer = ({
  data,
  error,
}: TabsCategoriesContainerProps) => {
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
                setQueriesWithoutReload(searchParams, [['category', id]]);
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabsList>
        <TabsPanel>
          {data
            .filter((item) => item.category === category)
            .map((item, index) => (
              <CardBrand
                src={item.image}
                title={item.brand}
                key={index}
                url={`/${item.category}/${item.brand}`}
              />
            ))}
        </TabsPanel>
      </Tabs>

      {error && !error.success && error.message && (
        <Alert marginTop={8} color="negative">
          {error.message}
        </Alert>
      )}
    </>
  );
};
