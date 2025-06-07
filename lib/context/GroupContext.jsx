import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const GroupContext = createContext();

export function GroupProvider({ children }) {
  const router = useRouter();
  const [currentGroup, setCurrentGroup] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get group from URL or localStorage
    const group = router.query.group || localStorage.getItem('weddingGroup');
    if (group) {
      setCurrentGroup(group.toUpperCase());
      localStorage.setItem('weddingGroup', group);
    }
    setIsLoading(false);
  }, [router.query.group]);

  const value = {
    currentGroup,
    setCurrentGroup,
    isLoading,
  };

  return <GroupContext.Provider value={value}>{children}</GroupContext.Provider>;
}

export function useGroup() {
  const context = useContext(GroupContext);
  if (context === undefined) {
    throw new Error('useGroup must be used within a GroupProvider');
  }
  return context;
}
