import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { OrderTermsProps } from './types';

export const OrderTerms = ({ className, ordersData }: OrderTermsProps) => {
  return (
    <>
      <h4 className={className.title}>Terms and conditions:</h4>
      <ul className={className.list}>
        <li className={className.element}>
          <span className={className.subTitle}> Accepted:</span>
          {ordersData.termsConditions ? (
            <span className={className.check}>
              <FontAwesomeIcon icon={faCheck} />
            </span>
          ) : (
            <span className={className.unCheck}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          )}
        </li>
      </ul>
    </>
  );
};
