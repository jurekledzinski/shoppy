'use client';
import { CardBrand, Tab, Tabs, TabsList, TabsPanel } from '@/components/shared';
import { TabsCategoriesProps } from './types';

export const TabsCategories = ({
  activeTab,
  data,
  onClickAction,
  tabs,
}: TabsCategoriesProps) => {
  return (
    <Tabs>
      <TabsList>
        {tabs.map((tab) => (
          <Tab
            key={tab}
            activeTab={activeTab}
            id={tab.toLowerCase()}
            title={tab}
            onClick={onClickAction}
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
  );
};
