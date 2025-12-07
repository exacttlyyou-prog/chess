/**
 * Компонент "Skip to content" для accessibility
 * Позволяет пользователям с screen readers быстро перейти к основному контенту
 * Соответствует WCAG 2.1 Level A
 */
export default function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="
        sr-only
        focus:not-sr-only
        focus:absolute
        focus:top-4
        focus:left-4
        focus:z-[9999]
        focus:px-4
        focus:py-2
        focus:bg-blue-600
        focus:text-white
        focus:rounded-lg
        focus:shadow-lg
        focus:outline-none
        focus:ring-2
        focus:ring-blue-400
        focus:ring-offset-2
        focus:ring-offset-gray-900
      "
    >
      Перейти к основному контенту
    </a>
  );
}
