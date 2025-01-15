export type TabsProps = {
  children: React.ReactNode;
};

export type TabsPanelProps = {
  className?: string;
  children: React.ReactNode;
};

export type TabsListProps = {
  children: React.ReactNode;
};

export type TabProps = {
  activeTab: string;
  className?: string;
  children?: React.ReactNode;
  id: string;
  onClick: (id: string) => void;
  title: string;
};
