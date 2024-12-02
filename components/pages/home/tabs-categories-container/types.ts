import { Brand } from '@/models';

export type TabsCategoriesContainerProps = {
  data: Brand[];
  error?: { message: string; success: boolean };
};
