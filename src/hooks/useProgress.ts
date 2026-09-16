import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { sessionsRepository } from '@/db/sessions.repository';
import { statsRepository, EMPTY_STATS } from '@/db/stats.repository';
import { levelForXp, levelProgress } from '@/constants/levels';
import { displayedStreak, goalProgress } from '@/features/progress/gamification.service';
import type { LoadState, StudySession, UserStats } from '@/types';

export function useProgress() {
  const [stats, setStats] = useState<UserStats>(EMPTY_STATS);
  const [recent, setRecent] = useState<StudySession[]>([]);
  const [state, setState] = useState<LoadState>('idle');

  const refresh = useCallback(async () => {
    setState((previous) => (previous === 'success' ? previous : 'loading'));
    try {
      const [loaded, sessions] = await Promise.all([statsRepository.get(), sessionsRepository.recent(5)]);
      setStats(loaded);
      setRecent(sessions);
      setState('success');
    } catch {
      setState('error');
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return {
    stats,
    recent,
    state,
    refresh,
    level: levelForXp(stats.points),
    levelProgress: levelProgress(stats.points),
    streak: displayedStreak(stats),
    goalDone: goalProgress(stats),
  };
}
