import { motion } from 'framer-motion';
import ChessPiece from './ChessPiece';

type PieceType = 'queen' | 'rook' | 'bishop' | 'knight';
type PieceColor = 'white' | 'black';

interface PromotionModalProps {
  isOpen: boolean;
  color: PieceColor;
  onSelect: (piece: PieceType) => void;
}

/**
 * Modal for pawn promotion - select which piece to promote to
 */
export default function PromotionModal({ isOpen, color, onSelect }: PromotionModalProps) {
  if (!isOpen) return null;

  const pieces: PieceType[] = ['queen', 'rook', 'bishop', 'knight'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="glass-card p-8 w-full max-w-md"
      >
        <h3 className="mb-6 text-center">Выберите фигуру</h3>
        <div className="grid grid-cols-4 gap-4">
          {pieces.map((pieceType) => (
            <motion.button
              key={pieceType}
              whileHover={{ scale: 1.1, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(pieceType)}
              className="glass-card p-6 aspect-square flex items-center justify-center shadow-depth hover:shadow-red-glow transition-all"
            >
              <ChessPiece type={pieceType} color={color} className="w-full h-full" />
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
