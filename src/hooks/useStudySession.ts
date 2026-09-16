import { useCallback, useEffect, useRef, useState } from 'react';
import {
  answerCard,
  finishSession,
  startSession,
  type AnswerOutcome,
  type SessionResult,
} from '@/features/study/study.service';
import type { Card, LoadState, StudyMode, StudySession } from '@/types';

export type SessionPhase = 'loading' | 'question' | 'feedback' | 'finished' | 'empty' | 'error';

export type StudySessionState = {
  phase: SessionPhase;
  card: Card | null;
  index: number;
  total: number;
  outcome: AnswerOutcome | null;
  result: SessionResult | null;
};

/**
 * Machine à états d'une session (§49).
 *
 * Toute la logique métier est déléguée aux services : ce hook ne fait que
 * garder la position dans la file et les totaux courants.
 */
export function useStudySession(params: { subjectId: string; mode: StudyMode; size: number }) {
  const { subjectId, mode, size } = params;
  const [queue, setQueue] = useState<Card[]>([]);
  const [session, setSession] = useState<StudySession | null>(null);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<SessionPhase>('loading');
  const [outcome, setOutcome] = useState<AnswerOutcome | null>(null);
  const [result, setResult] = useState<SessionResult | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');

  const totals = useRef({ reviewed: 0, correct: 0, points: 0, quiz: 0, mastered: 0 });
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    let alive = true;
    startSession({ subjectId, mode, size })
      .then((value) => {
        if (!alive) return;
        if (!value) {
          setPhase('empty');
          setLoadState('success');
          return;
        }
        setSession(value.session);
        setQueue(value.queue);
        setPhase('question');
        setLoadState('success');
      })
      .catch(() => {
        if (!alive) return;
        setPhase('error');
        setLoadState('error');
      });
    return () => {
      alive = false;
    };
  }, [mode, size, subjectId]);

  const card = queue[index] ?? null;

  const answer = useCallback(
    async (correct: boolean) => {
      if (!session || !card || phase !== 'question') return;
      const next = await answerCard(session, card, correct);
      totals.current.reviewed += 1;
      totals.current.correct += correct ? 1 : 0;
      totals.current.points += next.points;
      if (card.type === 'mcq' || card.type === 'true_false') totals.current.quiz += 1;
      if (next.masteredNow) totals.current.mastered += 1;
      setOutcome(next);
      setPhase('feedback');
    },
    [card, phase, session],
  );

  const next = useCallback(async () => {
    if (!session) return;
    const isLast = index >= queue.length - 1;
    if (!isLast) {
      setIndex((value) => value + 1);
      setOutcome(null);
      setPhase('question');
      return;
    }
    const summary = await finishSession({
      session,
      cardsReviewed: totals.current.reviewed,
      correctAnswers: totals.current.correct,
      pointsEarned: totals.current.points,
      quizQuestions: totals.current.quiz,
      masteredDelta: totals.current.mastered,
    });
    setResult(summary);
    setPhase('finished');
  }, [index, queue.length, session]);

  /** Quitter en cours de route : ce qui a été répondu est déjà enregistré. */
  const abandon = useCallback(async () => {
    if (!session || totals.current.reviewed === 0) return null;
    return finishSession({
      session,
      cardsReviewed: totals.current.reviewed,
      correctAnswers: totals.current.correct,
      pointsEarned: totals.current.points,
      quizQuestions: totals.current.quiz,
      masteredDelta: totals.current.mastered,
    });
  }, [session]);

  return {
    phase,
    loadState,
    card,
    index,
    total: queue.length,
    outcome,
    result,
    answer,
    next,
    abandon,
  };
}
