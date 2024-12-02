import { Brand } from '@/models';

export type TabsCategoriesProps = {
  data: Brand[];
  activeTab: string;
  tabs: string[];
  onClickAction: (id: string) => void;
};
