/**
 * Утилиты для работы с CSS классами
 */

type ClassValue = string | number | boolean | undefined | null | ClassValue[];

/**
 * Объединение CSS классов (альтернатива clsx)
 */
export function cn(...classes: ClassValue[]): string {
  return classes
    .flat()
    .filter((x) => typeof x === 'string' && x.length > 0)
    .join(' ')
    .trim();
}

/**
 * Условные классы
 */
export function classNames(
  ...args: (string | Record<string, boolean> | undefined | null | false)[]
): string {
  const classes: string[] = [];

  for (const arg of args) {
    if (!arg) continue;

    if (typeof arg === 'string') {
      classes.push(arg);
    } else if (typeof arg === 'object') {
      for (const [key, value] of Object.entries(arg)) {
        if (value) {
          classes.push(key);
        }
      }
    }
  }

  return classes.join(' ');
}
