'use client';
import { TabsCategories } from '../tabs-categories/TabsCategories';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { TabsCategoriesContainerProps } from './types';
import { AlertError } from '@/components/shared';

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
      <TabsCategories
        activeTab={activeTab}
        data={data}
        onClickAction={(id) =>
          router.push(`?category=${id.toLowerCase()}`, {
            scroll: false,
          })
        }
        tabs={tabs}
      />

      {error && !error.success && error.message && (
        <AlertError>{error.message}</AlertError>
      )}
    </>
  );
};
