import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { BoardTheme } from '../config/boardThemes';
import { getBoardTheme } from '../config/boardThemes';

interface BoardSettings {
  theme: BoardTheme;
  showCoordinates: boolean;
  highlightLastMove: boolean;
  showLegalMoves: boolean;
  animationSpeed: 'slow' | 'normal' | 'fast' | 'instant';
  soundVolume: number;
  particleIntensity: 'off' | 'low' | 'medium' | 'high';
}

interface BoardSettingsContextType {
  settings: BoardSettings;
  setTheme: (themeId: string) => void;
  toggleCoordinates: () => void;
  toggleHighlightLastMove: () => void;
  toggleShowLegalMoves: () => void;
  setAnimationSpeed: (speed: BoardSettings['animationSpeed']) => void;
  setSoundVolume: (volume: number) => void;
  setParticleIntensity: (intensity: BoardSettings['particleIntensity']) => void;
}

const DEFAULT_SETTINGS: BoardSettings = {
  theme: getBoardTheme('classic'),
  showCoordinates: true,
  highlightLastMove: true,
  showLegalMoves: true,
  animationSpeed: 'normal',
  soundVolume: 0.7,
  particleIntensity: 'medium',
};

const BoardSettingsContext = createContext<BoardSettingsContextType | undefined>(undefined);

export function BoardSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<BoardSettings>(() => {
    const saved = localStorage.getItem('stakechess-board-settings');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          theme: getBoardTheme(parsed.themeId || 'classic'),
        };
      } catch {
        return DEFAULT_SETTINGS;
      }
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('stakechess-board-settings', JSON.stringify({
      ...settings,
      themeId: settings.theme.id,
    }));
  }, [settings]);

  const setTheme = (themeId: string) => {
    setSettings(prev => ({ ...prev, theme: getBoardTheme(themeId) }));
  };

  const toggleCoordinates = () => {
    setSettings(prev => ({ ...prev, showCoordinates: !prev.showCoordinates }));
  };

  const toggleHighlightLastMove = () => {
    setSettings(prev => ({ ...prev, highlightLastMove: !prev.highlightLastMove }));
  };

  const toggleShowLegalMoves = () => {
    setSettings(prev => ({ ...prev, showLegalMoves: !prev.showLegalMoves }));
  };

  const setAnimationSpeed = (speed: BoardSettings['animationSpeed']) => {
    setSettings(prev => ({ ...prev, animationSpeed: speed }));
  };

  const setSoundVolume = (volume: number) => {
    setSettings(prev => ({ ...prev, soundVolume: Math.max(0, Math.min(1, volume)) }));
  };

  const setParticleIntensity = (intensity: BoardSettings['particleIntensity']) => {
    setSettings(prev => ({ ...prev, particleIntensity: intensity }));
  };

  return (
    <BoardSettingsContext.Provider value={{
      settings,
      setTheme,
      toggleCoordinates,
      toggleHighlightLastMove,
      toggleShowLegalMoves,
      setAnimationSpeed,
      setSoundVolume,
      setParticleIntensity,
    }}>
      {children}
    </BoardSettingsContext.Provider>
  );
}

export function useBoardSettings() {
  const context = useContext(BoardSettingsContext);
  if (context === undefined) {
    throw new Error('useBoardSettings must be used within a BoardSettingsProvider');
  }
  return context;
}
