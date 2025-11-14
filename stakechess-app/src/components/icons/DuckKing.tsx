export default function DuckKing({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Crown */}
      <path
        d="M20 18 L22 14 L24 18 L26 14 L28 18 L30 14 L32 18 L34 14 L36 18 L38 14 L40 18 L42 14 L44 18 L42 20 L22 20 Z"
        fill="#EF3124"
        stroke="#C7281970"
        strokeWidth="0.5"
      />
      <circle cx="32" cy="12" r="1.5" fill="#FFD700" />
      <circle cx="26" cy="12" r="1" fill="#FFD700" />
      <circle cx="38" cy="12" r="1" fill="#FFD700" />

      {/* Duck Head */}
      <ellipse cx="32" cy="28" rx="14" ry="12" fill="#FFE066" stroke="#E6A800" strokeWidth="1" />

      {/* Eye */}
      <circle cx="28" cy="26" r="2.5" fill="#000000" />
      <circle cx="27.5" cy="25.5" r="1" fill="#FFFFFF" />

      {/* Beak */}
      <path
        d="M18 28 Q14 28 14 28 Q14 30 18 30 Q20 29 18 28 Z"
        fill="#FF8C00"
        stroke="#CC7000"
        strokeWidth="0.5"
      />

      {/* Duck Body */}
      <ellipse cx="32" cy="46" rx="16" ry="14" fill="#FFE066" stroke="#E6A800" strokeWidth="1" />

      {/* Wing */}
      <path
        d="M18 42 Q14 44 16 48 Q20 46 18 42 Z"
        fill="#FFD700"
        stroke="#E6A800"
        strokeWidth="0.8"
      />

      {/* Feet */}
      <path
        d="M28 58 L26 62 L24 60 M28 58 L28 62 M28 58 L30 62 L32 60"
        stroke="#FF8C00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M36 58 L34 62 L32 60 M36 58 L36 62 M36 58 L38 62 L40 60"
        stroke="#FF8C00"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Crown jewels */}
      <circle cx="28" cy="16" r="1" fill="#EF3124" />
      <circle cx="32" cy="15" r="1.2" fill="#EF3124" />
      <circle cx="36" cy="16" r="1" fill="#EF3124" />

      {/* Glossy highlight */}
      <ellipse cx="26" cy="44" rx="4" ry="6" fill="#FFFFFF" opacity="0.3" />
    </svg>
  );
}
