'use client';
import styles from './TabsDetailsContainer.module.css';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReviewForm } from '../review-form';
import { setQueriesWithoutReload, showToast } from '@/helpers';
import { TabsDetailsContainerProps } from './types';
import { useActionStateAndReset, useReviewForm } from '@/hooks';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { review } from '@/actions';

import {
  Tab,
  Tabs,
  TabsList,
  TabsPanel,
  ResponsiveTable,
  Review,
  Alert,
} from '@/components/shared';

const tabs = ['Specification', 'Reviews'];

export const TabsDetailsContainer = ({
  dataProduct,
  dataReviews,
  userId,
  userName,
  errorReviews,
}: TabsDetailsContainerProps) => {
  const searchParams = useSearchParams();
  const idProduct = searchParams.get('id');
  const view = searchParams.get('view') || 'specification';
  const [activeTab, setActiveTab] = useState(view);

  const { action } = useActionStateAndReset({
    fnAction: review,
  });

  const { methodsReview, onSubmitReview } = useReviewForm({
    onSubmitForm: action.formAction,
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
                if (!idProduct) return;
                setQueriesWithoutReload(searchParams, [
                  ['id', idProduct],
                  ['view', tabName],
                ]);
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
                  <span className={styles.icon}>
                    <FontAwesomeIcon icon={faLock} size="1x" />
                  </span>
                  <span> Please log in to add review.</span>
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

              <div className={styles.container}>
                {dataReviews.map((review) => {
                  return <Review key={review._id} data={review} />;
                })}

                {errorReviews && (
                  <Alert marginTop={8} color="negative">
                    {errorReviews}
                  </Alert>
                )}
              </div>
            </>
          )}
        </TabsPanel>
      </Tabs>
    </>
  );
};
