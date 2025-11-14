import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { getTournament, getAvailableTournaments } from '../config/tournaments';
import type { Tournament, TournamentRound } from '../config/tournaments';

interface TournamentProgress {
  tournamentId: string;
  currentRound: number;
  roundResults: Array<{
    roundNumber: number;
    result: 'win' | 'loss' | 'draw';
    playerScore?: number;
  }>;
  completed: boolean;
  startedAt: Date;
  completedAt?: Date;
}

interface TournamentsContextType {
  completedTournaments: string[];
  activeTournament: TournamentProgress | null;
  availableTournaments: Tournament[];

  startTournament: (tournamentId: string) => boolean;
  recordRoundResult: (roundNumber: number, result: 'win' | 'loss' | 'draw') => void;
  completeTournament: () => void;
  abandonTournament: () => void;

  getTournamentProgress: (tournamentId: string) => TournamentProgress | null;
  isTournamentCompleted: (tournamentId: string) => boolean;
  getNextRound: () => TournamentRound | null;
}

const TournamentsContext = createContext<TournamentsContextType | undefined>(undefined);

export function TournamentsProvider({ children }: { children: ReactNode }) {
  const [completedTournaments, setCompletedTournaments] = useState<string[]>(() => {
    const saved = localStorage.getItem('stakechess-completed-tournaments');
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTournament, setActiveTournament] = useState<TournamentProgress | null>(() => {
    const saved = localStorage.getItem('stakechess-active-tournament');
    return saved ? JSON.parse(saved) : null;
  });

  const [availableTournaments, setAvailableTournaments] = useState<Tournament[]>([]);

  // Update available tournaments when completed list changes
  useEffect(() => {
    // For now, use a default rating. In production, get from user profile
    const userRating = 800;
    const available = getAvailableTournaments(userRating, completedTournaments);
    setAvailableTournaments(available);
  }, [completedTournaments]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('stakechess-completed-tournaments', JSON.stringify(completedTournaments));
  }, [completedTournaments]);

  useEffect(() => {
    if (activeTournament) {
      localStorage.setItem('stakechess-active-tournament', JSON.stringify(activeTournament));
    } else {
      localStorage.removeItem('stakechess-active-tournament');
    }
  }, [activeTournament]);

  const startTournament = useCallback((tournamentId: string): boolean => {
    if (activeTournament) return false; // Already in a tournament

    const tournament = getTournament(tournamentId);
    if (!tournament) return false;

    setActiveTournament({
      tournamentId,
      currentRound: 1,
      roundResults: [],
      completed: false,
      startedAt: new Date(),
    });

    return true;
  }, [activeTournament]);

  const recordRoundResult = useCallback((roundNumber: number, result: 'win' | 'loss' | 'draw') => {
    if (!activeTournament) return;

    setActiveTournament(prev => {
      if (!prev) return null;

      const newRoundResults = [
        ...prev.roundResults,
        { roundNumber, result },
      ];

      return {
        ...prev,
        currentRound: prev.currentRound + 1,
        roundResults: newRoundResults,
      };
    });
  }, [activeTournament]);

  const completeTournament = useCallback(() => {
    if (!activeTournament) return;

    setCompletedTournaments(prev => [...prev, activeTournament.tournamentId]);
    setActiveTournament(prev => {
      if (!prev) return null;
      return {
        ...prev,
        completed: true,
        completedAt: new Date(),
      };
    });

    // Clear active tournament after a delay
    setTimeout(() => {
      setActiveTournament(null);
    }, 100);
  }, [activeTournament]);

  const abandonTournament = useCallback(() => {
    setActiveTournament(null);
  }, []);

  const getTournamentProgress = useCallback((tournamentId: string): TournamentProgress | null => {
    if (activeTournament?.tournamentId === tournamentId) {
      return activeTournament;
    }
    return null;
  }, [activeTournament]);

  const isTournamentCompleted = useCallback((tournamentId: string): boolean => {
    return completedTournaments.includes(tournamentId);
  }, [completedTournaments]);

  const getNextRound = useCallback((): TournamentRound | null => {
    if (!activeTournament) return null;

    const tournament = getTournament(activeTournament.tournamentId);
    if (!tournament) return null;

    const nextRound = tournament.rounds.find(r => r.roundNumber === activeTournament.currentRound);
    return nextRound || null;
  }, [activeTournament]);

  return (
    <TournamentsContext.Provider
      value={{
        completedTournaments,
        activeTournament,
        availableTournaments,
        startTournament,
        recordRoundResult,
        completeTournament,
        abandonTournament,
        getTournamentProgress,
        isTournamentCompleted,
        getNextRound,
      }}
    >
      {children}
    </TournamentsContext.Provider>
  );
}

export function useTournaments() {
  const context = useContext(TournamentsContext);
  if (!context) {
    throw new Error('useTournaments must be used within TournamentsProvider');
  }
  return context;
}
