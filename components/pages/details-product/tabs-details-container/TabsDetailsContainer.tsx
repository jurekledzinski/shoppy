'use client';
import styles from './TabsDetailsContainer.module.css';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { review } from '@/actions';
import { ReviewForm } from '../review-form';
import { showToast } from '@/helpers';
import { TabsDetailsContainerProps } from './types';
import { useActionStateAndReset, useReviewForm } from '@/hooks';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import {
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  ResponsiveTable,
  Review,
} from '@/components/shared';

const tabs = ['Specification', 'Reviews'];

export const TabsDetailsContainer = ({
  dataProduct,
  dataReviews,
  userId,
  userName,
}: TabsDetailsContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idProduct = searchParams.get('id');
  const view = searchParams.get('view') || 'specification';
  const [activeTab, setActiveTab] = useState(view);

  const { action } = useActionStateAndReset({
    fnAction: review,
  });

  const { methodsReview, onSubmitReview } = useReviewForm({
    formAction: action.formAction,
    isPending: action.isPending,
    isSuccess: action.state.success,
    onSuccess: () => {
      showToast(action.state.message);
    },
    userId,
    userName,
    productId: dataProduct._id ?? '',
  });

  useEffect(() => setActiveTab(view), [view]);

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
              onClick={(tabName) => {
                router.push(`?id=${idProduct}&view=${tabName.toLowerCase()}`, {
                  scroll: false,
                });
              }}
            >
              {tab}
            </Tab>
          ))}
        </TabsList>
        <TabsPanel className={styles.tabsPanel}>
          {activeTab === tabs[0].toLowerCase() && (
            <ResponsiveTable data={dataProduct.specification} />
          )}
          {activeTab === tabs[1].toLowerCase() && (
            <>
              {!userId && !userName ? (
                <h5 className={styles.info}>
                  <FontAwesomeIcon icon={faLock} /> Please log in to add review.
                </h5>
              ) : null}

              {!dataReviews.length ? (
                <h5 className={styles.info}>No reviews. Write first review.</h5>
              ) : null}

              {userId && userName ? (
                <ReviewForm
                  isPending={action.isPending}
                  methods={methodsReview}
                  onSubmit={onSubmitReview}
                  state={action.state}
                />
              ) : null}

              <div>
                {dataReviews.map((review) => {
                  return <Review key={review._id} data={review} />;
                })}
              </div>
            </>
          )}
        </TabsPanel>
      </Tabs>
    </>
  );
};
