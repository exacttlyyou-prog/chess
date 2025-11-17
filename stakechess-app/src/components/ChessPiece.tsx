import { motion } from 'framer-motion';

type PieceType = 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
type PieceColor = 'white' | 'black';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
}

// Minimalist recognizable chess pieces - stroke only, no fill
const ChessPieceSVG = ({ type, color }: { type: PieceType; color: PieceColor }) => {
  const strokeColor = color === 'white' ? '#FFFFFF' : '#000000';
  const strokeWidth = '3';

  const pieces = {
    king: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Cross on top */}
          <line x1="22.5" y1="6" x2="22.5" y2="12" />
          <line x1="19.5" y1="9" x2="25.5" y2="9" />
          {/* Crown with 5 points */}
          <path d="M 11,14 L 15,11 L 18,14 L 22.5,10 L 27,14 L 30,11 L 34,14 L 34,17 L 11,17 Z" />
          {/* Body */}
          <path d="M 13,17 L 12,35 L 33,35 L 32,17" />
          <path d="M 13,30 L 32,30" />
          {/* Base */}
          <path d="M 11,35 C 11,36 11.5,37 11.5,37 L 33.5,37 C 33.5,37 34,36 34,35" />
          <rect x="10" y="37" width="25" height="3" rx="1.5" />
        </g>
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Crown with spheres */}
          <circle cx="6" cy="12" r="2" />
          <circle cx="14" cy="9" r="2" />
          <circle cx="22.5" cy="8" r="2" />
          <circle cx="31" cy="9" r="2" />
          <circle cx="39" cy="12" r="2" />
          {/* Crown connection */}
          <path d="M 9,13 L 13,11 L 20,10 L 25,10 L 32,11 L 36,13" />
          {/* Body */}
          <path d="M 9,13 L 9,27 L 36,27 L 36,13" />
          <path d="M 9,27 C 11,29 13,29 13,33 L 32,33 C 32,29 34,29 36,27" />
          {/* Base */}
          <path d="M 10,33 L 10,36 L 35,36 L 35,33" />
          <rect x="9" y="36" width="27" height="3" rx="1.5" />
        </g>
      </svg>
    ),
    rook: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Castle battlements */}
          <path d="M 9,9 L 9,13 L 36,13 L 36,9" />
          <path d="M 12,9 L 12,13 M 20,9 L 20,13 M 25,9 L 25,13 M 33,9 L 33,13" />
          {/* Tower body */}
          <path d="M 11,13 L 11,28 L 34,28 L 34,13" />
          {/* Decorative lines */}
          <path d="M 11,20 L 34,20" />
          {/* Base widening */}
          <path d="M 11,28 L 9,31 L 36,31 L 34,28" />
          {/* Bottom base */}
          <rect x="8" y="31" width="29" height="3" rx="1.5" />
          <rect x="8" y="34" width="29" height="3" rx="1.5" />
        </g>
      </svg>
    ),
    bishop: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Top sphere */}
          <circle cx="22.5" cy="8" r="2.5" />
          {/* Mitre hat */}
          <path d="M 17,12 L 22.5,6 L 28,12" />
          <ellipse cx="22.5" cy="12" rx="5.5" ry="3" />
          {/* Neck */}
          <path d="M 17,15 L 17,18 L 28,18 L 28,15" />
          {/* Body */}
          <path d="M 15,18 L 13,32 L 32,32 L 30,18" />
          {/* Decorative cut */}
          <path d="M 18,25 L 27,25" />
          {/* Base */}
          <path d="M 10,32 L 10,35 L 35,35 L 35,32" />
          <rect x="9" y="35" width="27" height="3" rx="1.5" />
        </g>
      </svg>
    ),
    knight: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Horse head profile */}
          <path d="M 22,10 C 32.5,11 38.5,18 38,39 L 15,39 C 15,30 25,32.5 23,18" />
          <path d="M 24,18 C 24.38,20.91 18.45,25.37 16,27 C 13,29 13.18,31.34 11,31 C 9.958,30.06 12.41,27.96 11,28 C 10,28 11.19,29.23 10,30 C 9,30 5.997,31 6,26 C 6,24 12,14 12,14 C 12,14 13.89,12.1 14,10.5 C 13.27,9.506 13.5,8.5 13.5,7.5 C 14.5,6.5 16.5,10 16.5,10 L 18.5,10 C 18.5,10 19.28,8.008 21,7 C 22,7 22,10 22,10" />
          {/* Eye */}
          <circle cx="9.5" cy="25.5" r="0.5" />
          {/* Neck detail */}
          <path d="M 24.55,10.4 L 24.1,11.85 L 24.6,12 C 27.75,13 30.25,14.49 32.5,18.75 C 34.75,23.01 35.75,29.06 35.25,39 L 35.2,39.5" />
        </g>
      </svg>
    ),
    pawn: (
      <svg viewBox="0 0 45 45" className="w-full h-full">
        <g fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
          {/* Head */}
          <circle cx="22.5" cy="9" r="5" />
          {/* Neck */}
          <path d="M 19,14 L 19,16 L 26,16 L 26,14" />
          {/* Body */}
          <path d="M 17,16 C 17,17 16,18.5 16,22.5 C 16,27 18,29 18,29 L 27,29 C 27,29 29,27 29,22.5 C 29,18.5 28,17 28,16" />
          {/* Waist */}
          <path d="M 18,29 L 18,31 L 27,31 L 27,29" />
          {/* Base */}
          <path d="M 16,31 C 16,33.5 16.5,34.5 16.5,34.5 L 28.5,34.5 C 28.5,34.5 29,33.5 29,31" />
          <rect x="14" y="34.5" width="17" height="3" rx="1.5" />
        </g>
      </svg>
    ),
  };

  return pieces[type];
};

export default function ChessPiece({ type, color, className = '' }: ChessPieceProps) {
  if (type === 'king') {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={`relative ${className}`}
        style={{
          filter: color === 'white'
            ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.9))'
            : 'drop-shadow(0 2px 8px rgba(255,255,255,0.3))'
        }}
      >
        <img
          src={color === 'white' ? '/images/pieces/white-king.svg' : '/images/pieces/black-king.svg'}
          alt={`${color} king`}
          className="w-full h-full object-contain"
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`relative ${className}`}
      style={{
        filter: color === 'white'
          ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.9)) drop-shadow(0 0 12px rgba(255,255,255,0.2))'
          : 'drop-shadow(0 2px 8px rgba(255,255,255,0.3)) drop-shadow(0 0 8px rgba(0,0,0,0.6))'
      }}
    >
      <ChessPieceSVG type={type} color={color} />
    </motion.div>
  );
}
