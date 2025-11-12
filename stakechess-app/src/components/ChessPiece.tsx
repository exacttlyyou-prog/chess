import { motion } from 'framer-motion';

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

// Ultra-minimalist geometric chess pieces - modern avant-garde design
const ChessPieceSVG = ({ type, color }: { type: PieceType; color: PieceColor }) => {
  const fillColor = color === 'white' ? '#FFFFFF' : '#1F2937';
  const strokeColor = color === 'white' ? '#E5E7EB' : '#111827';
  const strokeWidth = '2.5';

  const pieces = {
    king: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Cross */}
          <line x1="24" y1="4" x2="24" y2="12" />
          <line x1="20" y1="8" x2="28" y2="8" />
          {/* Crown circle */}
          <circle cx="24" cy="15" r="4" fill="none" />
          {/* Body trapezoid */}
          <path d="M 17 20 L 15 38 L 33 38 L 31 20 Z" />
          {/* Base */}
          <rect x="12" y="38" width="24" height="4" rx="1.5" />
        </g>
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Crown spheres */}
          <circle cx="14" cy="10" r="2.5" />
          <circle cx="24" cy="7" r="2.5" />
          <circle cx="34" cy="10" r="2.5" />
          {/* Body */}
          <path d="M 16 14 L 14 38 L 34 38 L 32 14 Z" />
          {/* Base */}
          <rect x="12" y="38" width="24" height="4" rx="1.5" />
        </g>
      </svg>
    ),
    rook: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Crenellations */}
          <path d="M 14 8 L 14 14 L 19 14 L 19 8 L 23 8 L 23 14 L 25 14 L 25 8 L 29 8 L 29 14 L 34 14 L 34 8 Z" fill="none" />
          {/* Tower body */}
          <rect x="16" y="14" width="16" height="24" />
          {/* Base */}
          <rect x="12" y="38" width="24" height="4" rx="1.5" />
        </g>
      </svg>
    ),
    bishop: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Top circle */}
          <circle cx="24" cy="8" r="3" />
          {/* Cut line */}
          <line x1="21" y1="8" x2="27" y2="8" />
          {/* Diagonal body */}
          <path d="M 18 14 L 16 38 L 32 38 L 30 14 Z" />
          {/* Base */}
          <rect x="12" y="38" width="24" height="4" rx="1.5" />
        </g>
      </svg>
    ),
    knight: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Horse head - simplified geometric */}
          <path d="M 20 8 L 28 8 L 32 16 L 30 24 L 28 24 L 26 20 L 22 24 L 18 20 Z" />
          {/* Neck */}
          <path d="M 22 24 L 20 38 L 28 38 L 26 24" />
          {/* Base */}
          <rect x="14" y="38" width="20" height="4" rx="1.5" />
        </g>
      </svg>
    ),
    pawn: (
      <svg viewBox="0 0 48 48" className="w-full h-full">
        <g fill={fillColor} stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="24" cy="12" r="5" />
          {/* Body */}
          <path d="M 20 18 L 18 36 L 30 36 L 28 18 Z" />
          {/* Base */}
          <rect x="14" y="36" width="20" height="5" rx="1.5" />
        </g>
      </svg>
    ),
  };

  return pieces[type];
};

export default function ChessPiece({ type, color, className = '' }: ChessPieceProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative ${className}`}
      style={{
        filter: color === 'white'
          ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.8)) drop-shadow(0 0 16px rgba(255,255,255,0.3))'
          : 'drop-shadow(0 3px 10px rgba(255,255,255,0.4)) drop-shadow(0 0 12px rgba(0,0,0,0.5))'
      }}
    >
      <ChessPieceSVG type={type} color={color} />
    </motion.div>
  );
}
