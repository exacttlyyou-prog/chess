export default function DuckKing({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg viewBox="0 0 45 45" className={className} fill="none">
      <g stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
        {/* Crown base - cross on top */}
        <line x1="22.5" y1="6" x2="22.5" y2="11" />
        <line x1="20" y1="8.5" x2="25" y2="8.5" />

        {/* Crown with 5 points */}
        <path d="M 11,13 L 14,10 L 17,13 L 22.5,9 L 28,13 L 31,10 L 34,13 L 34,16 L 11,16 Z" />

        {/* Duck head - rounded */}
        <ellipse cx="22.5" cy="22" rx="8" ry="7" />

        {/* Beak - simple triangle pointing left */}
        <path d="M 14.5,22 L 10,21 L 10,23 L 14.5,22 Z" />

        {/* Eye - small circle */}
        <circle cx="19" cy="20" r="1.5" />

        {/* Duck body - larger ellipse */}
        <ellipse cx="22.5" cy="31" rx="9" ry="8" />

        {/* Base platform */}
        <path d="M 10,39 C 10,40 10.5,40.5 10.5,40.5 L 34.5,40.5 C 34.5,40.5 35,40 35,39" />
        <rect x="9" y="40.5" width="27" height="2.5" rx="1.25" />
      </g>

      {/* Red branded dot on beak tip */}
      <circle cx="10" cy="22" r="1.5" fill="#EF3124" />
    </svg>
  );
}
