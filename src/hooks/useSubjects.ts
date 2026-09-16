import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { subjectsRepository } from '@/db/subjects.repository';
import type { LoadState, SubjectWithStats } from '@/types';

/** Liste des matières avec leurs compteurs. Rechargée à chaque retour sur l'écran. */
export function useSubjects() {
  const [subjects, setSubjects] = useState<SubjectWithStats[]>([]);
  const [state, setState] = useState<LoadState>('idle');

  const refresh = useCallback(async () => {
    setState((previous) => (previous === 'success' ? previous : 'loading'));
    try {
      setSubjects(await subjectsRepository.listWithStats());
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

  return { subjects, state, refresh };
}
