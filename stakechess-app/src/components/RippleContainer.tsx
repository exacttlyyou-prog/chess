interface RippleEffect {
  x: number;
  y: number;
  size: number;
  id: number;
}

/**
 * Компонент для рендера ripple-эффектов
 */
export function RippleContainer({ ripples }: { ripples: RippleEffect[] }) {
  return (
    <span className="absolute inset-0 overflow-hidden pointer-events-none">
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
        />
      ))}
    </span>
  );
}
