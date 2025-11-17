import { useState, useCallback } from 'react';

/**
 * Хук для копирования текста в буфер обмена
 */
export function useCopyToClipboard(): [
  string | null,
  (text: string) => Promise<boolean>
] {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const copy = useCallback(async (text: string): Promise<boolean> => {
    if (!navigator?.clipboard) {
      console.warn('Clipboard API not available');
      return false;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      setCopiedText(null);
      return false;
    }
  }, []);

  return [copiedText, copy];
}
