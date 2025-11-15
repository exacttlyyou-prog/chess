export default function DuckKing({
  className = "w-12 h-12",
  color = "white"
}: {
  className?: string;
  color?: "white" | "black";
}) {
  const strokeColor = color === "white" ? "#FFFFFF" : "#000000";

  return (
    <svg viewBox="0 0 45 45" className={className} fill="none">
      <g stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Duck head - rounded */}
        <ellipse cx="22.5" cy="22" rx="8" ry="7" />

        {/* Beak - simple triangle pointing left */}
        <path d="M 14.5,22 L 10,21 L 10,23 L 14.5,22 Z" />

        {/* Duck body - larger ellipse */}
        <ellipse cx="22.5" cy="31" rx="9" ry="8" />
      </g>

      {/* Red branded dot on beak tip */}
      <circle cx="10" cy="22" r="1.5" fill="#EF3124" />
    </svg>
  );
}
