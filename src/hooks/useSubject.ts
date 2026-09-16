import { useCallback, useState } from 'react';
import { useFocusEffect } from 'expo-router';
import { cardsRepository } from '@/db/cards.repository';
import { documentsRepository } from '@/db/documents.repository';
import { subjectsRepository } from '@/db/subjects.repository';
import type { Card, Document, LoadState, Subject } from '@/types';

export type SubjectDetail = {
  subject: Subject | null;
  documents: (Document & { cards: number })[];
  cards: Card[];
  due: number;
  mastered: number;
};

const EMPTY: SubjectDetail = { subject: null, documents: [], cards: [], due: 0, mastered: 0 };

export function useSubject(id: string | undefined) {
  const [detail, setDetail] = useState<SubjectDetail>(EMPTY);
  const [state, setState] = useState<LoadState>('idle');

  const refresh = useCallback(async () => {
    if (!id) return;
    setState((previous) => (previous === 'success' ? previous : 'loading'));
    try {
      const now = Date.now();
      const [subject, documents, cards] = await Promise.all([
        subjectsRepository.find(id),
        documentsRepository.listBySubject(id),
        cardsRepository.listBySubject(id),
      ]);
      setDetail({
        subject,
        documents,
        cards,
        due: cards.filter((card) => card.nextReviewAt <= now).length,
        mastered: cards.filter((card) => card.box >= 3).length,
      });
      setState('success');
    } catch {
      setState('error');
    }
  }, [id]);

  useFocusEffect(
    useCallback(() => {
      void refresh();
    }, [refresh]),
  );

  return { ...detail, state, refresh };
}
