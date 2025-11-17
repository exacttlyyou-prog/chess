import { useEffect, useCallback } from 'react';

interface KeyboardShortcutOptions {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  preventDefault?: boolean;
  enabled?: boolean;
}

/**
 * Хук для регистрации keyboard shortcuts
 * Улучшает accessibility и UX для power users
 */
export function useKeyboardShortcut(
  options: KeyboardShortcutOptions,
  callback: () => void
) {
  const {
    key,
    ctrl = false,
    shift = false,
    alt = false,
    meta = false,
    preventDefault = true,
    enabled = true,
  } = options;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return;

      const matchesKey = event.key.toLowerCase() === key.toLowerCase();
      const matchesCtrl = ctrl === event.ctrlKey;
      const matchesShift = shift === event.shiftKey;
      const matchesAlt = alt === event.altKey;
      const matchesMeta = meta === event.metaKey;

      if (matchesKey && matchesCtrl && matchesShift && matchesAlt && matchesMeta) {
        if (preventDefault) {
          event.preventDefault();
        }
        callback();
      }
    },
    [key, ctrl, shift, alt, meta, preventDefault, enabled, callback]
  );

  useEffect(() => {
    if (!enabled) return;

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown, enabled]);
}

/**
 * Хук для множественных shortcuts
 */
export function useKeyboardShortcuts(
  shortcuts: Array<{ options: KeyboardShortcutOptions; callback: () => void }>
) {
  shortcuts.forEach(({ options, callback }) => {
    useKeyboardShortcut(options, callback);
  });
}

/**
 * Популярные shortcuts для приложения
 */
export function useAppKeyboardShortcuts({
  onSearch,
  onHelp,
  onSettings,
  onEscape,
}: {
  onSearch?: () => void;
  onHelp?: () => void;
  onSettings?: () => void;
  onEscape?: () => void;
}) {
  // Ctrl/Cmd + K для поиска
  useKeyboardShortcut(
    { key: 'k', ctrl: true, enabled: !!onSearch },
    () => onSearch?.()
  );

  // ? для помощи
  useKeyboardShortcut(
    { key: '?', shift: true, enabled: !!onHelp },
    () => onHelp?.()
  );

  // Ctrl/Cmd + , для настроек
  useKeyboardShortcut(
    { key: ',', ctrl: true, enabled: !!onSettings },
    () => onSettings?.()
  );

  // Escape для закрытия модалок
  useKeyboardShortcut(
    { key: 'Escape', enabled: !!onEscape, preventDefault: false },
    () => onEscape?.()
  );
}
