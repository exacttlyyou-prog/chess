import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ACHIEVEMENTS, getAchievement, type Achievement } from '../config/achievements';

interface UserProgress {
  [achievementId: string]: {
    unlocked: boolean;
    progress: number;
    unlockedAt?: Date;
  };
}

interface AchievementsContextType {
  progress: UserProgress;
  unlockedCount: number;
  totalCount: number;
  checkAndUnlock: (id: string, currentValue: number) => boolean;
  getProgress: (id: string) => number;
  isUnlocked: (id: string) => boolean;
  getUnlockedAchievements: () => Achievement[];
}

const AchievementsContext = createContext<AchievementsContextType | undefined>(undefined);

export function AchievementsProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(() => {
    const saved = localStorage.getItem('stakechess-achievements');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  useEffect(() => {
    localStorage.setItem('stakechess-achievements', JSON.stringify(progress));
  }, [progress]);

  const checkAndUnlock = useCallback((id: string, currentValue: number): boolean => {
    const achievement = getAchievement(id);
    if (!achievement) return false;

    const current = progress[id];
    if (current?.unlocked) return false;

    const newProgress = Math.min(currentValue, achievement.requirement);
    const shouldUnlock = newProgress >= achievement.requirement;

    setProgress(prev => ({
      ...prev,
      [id]: {
        unlocked: shouldUnlock,
        progress: newProgress,
        unlockedAt: shouldUnlock ? new Date() : undefined,
      },
    }));

    return shouldUnlock;
  }, [progress]);

  const getProgress = useCallback((id: string): number => {
    return progress[id]?.progress || 0;
  }, [progress]);

  const isUnlocked = useCallback((id: string): boolean => {
    return progress[id]?.unlocked || false;
  }, [progress]);

  const getUnlockedAchievements = useCallback((): Achievement[] => {
    return ACHIEVEMENTS.filter(a => progress[a.id]?.unlocked);
  }, [progress]);

  const unlockedCount = Object.values(progress).filter(p => p.unlocked).length;
  const totalCount = ACHIEVEMENTS.length;

  return (
    <AchievementsContext.Provider value={{
      progress,
      unlockedCount,
      totalCount,
      checkAndUnlock,
      getProgress,
      isUnlocked,
      getUnlockedAchievements,
    }}>
      {children}
    </AchievementsContext.Provider>
  );
}

export function useAchievements() {
  const context = useContext(AchievementsContext);
  if (context === undefined) {
    throw new Error('useAchievements must be used within an AchievementsProvider');
  }
  return context;
}
