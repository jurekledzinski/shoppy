import { Session } from 'next-auth';

export type AsideProps = {
  userData: Session | null;
};
