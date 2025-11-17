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
        {/* Duck head - round, front view */}
        <circle cx="22.5" cy="20" r="8" />

        {/* Two eyes - front view */}
        <circle cx="19" cy="18" r="1.5" fill={strokeColor} />
        <circle cx="26" cy="18" r="1.5" fill={strokeColor} />

        {/* Beak - triangle pointing down, centered */}
        <path d="M 22.5,24 L 20,28 L 25,28 Z" fill="#FFB900" stroke="#FFB900" />

        {/* Duck body - larger circle */}
        <ellipse cx="22.5" cy="33" rx="10" ry="9" />
      </g>

      {/* Red branded dot on beak */}
      <circle cx="22.5" cy="27" r="2" fill="#EF3124" />
    </svg>
  );
}
