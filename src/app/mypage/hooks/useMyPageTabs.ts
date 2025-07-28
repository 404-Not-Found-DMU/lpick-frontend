import { useMyPageStore } from '@/store/myPageStore';

export const useMyPageTabs = () => {
  const { activeTab, setActiveTab } = useMyPageStore();

  return {
    activeTab,
    setActiveTab,
  };
};
