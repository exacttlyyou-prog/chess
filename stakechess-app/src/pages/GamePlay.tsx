import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Handshake, Flag, Settings, ArrowLeft, Clock, Bot, Sparkles, X } from 'lucide-react';
import ChessBoard from '../components/ChessBoard';
import { useChess } from '../hooks/useChess';
import type { ChessSquare } from '../hooks/useChess';
import {
  CHESS_PERSONALITIES,
  selectMoveByPersonality,
  getThinkingTime,
  type ChessPersonality
} from '../ai/chessPersonalities';
import { analyzePosition, type ChessAnalysis } from '../services/aiAnalysis';
import { useToast } from '../contexts/ToastContext';

interface Move {
  notation: string;
  time: string;
}

export default function GamePlay() {
  const navigate = useNavigate();
  const location = useLocation();
  const { info } = useToast();
  const [timeWhite, setTimeWhite] = useState(180); // 3 minutes in seconds
  const [timeBlack, setTimeBlack] = useState(180);
  const [showMenu, setShowMenu] = useState(false);
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [showAIAnalysis, setShowAIAnalysis] = useState(false);
  const [aiAnalysis, setAIAnalysis] = useState<ChessAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Get AI personality from navigation state or default to Magnus
  const aiPersonalityId = (location.state as { aiPersonality?: string })?.aiPersonality || 'magnus';
  const aiPersonality: ChessPersonality = CHESS_PERSONALITIES[aiPersonalityId] || CHESS_PERSONALITIES.magnus;

  const {
    game,
    position,
    makeMove,
    turn,
    isCheckmate,
    isStalemate,
    isDraw,
  } = useChess();

  const currentTurn = turn === 'w' ? 'white' : 'black';
  const isPlayerTurn = currentTurn === 'white' && !isAIThinking;

  // Timer effect
  useEffect(() => {
    if (isCheckmate || isStalemate || isDraw) return;

    const timer = setInterval(() => {
      if (currentTurn === 'white') {
        setTimeWhite((prev) => Math.max(0, prev - 1));
      } else {
        setTimeBlack((prev) => Math.max(0, prev - 1));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentTurn, isCheckmate, isStalemate, isDraw]);

  // AI move logic - responds to player moves with personality
  const makeAIMove = useCallback(() => {
    if (currentTurn !== 'black' || isCheckmate || isStalemate || isDraw) return;

    setIsAIThinking(true);

    // Get personality-based thinking time
    const thinkingDelay = getThinkingTime(aiPersonality);

    setTimeout(() => {
      const selectedMove = selectMoveByPersonality(game, aiPersonality);

      if (!selectedMove) {
        setIsAIThinking(false);
        return;
      }

      const result = makeMove({
        from: selectedMove.from as ChessSquare,
        to: selectedMove.to as ChessSquare,
        promotion: selectedMove.promotion as 'q' | 'r' | 'b' | 'n' | undefined,
      });

      if (result.success) {
        const currentTime = timeBlack;
        setMoveHistory(prev => [...prev, {
          notation: selectedMove.san,
          time: `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`
        }]);
      }

      setIsAIThinking(false);
    }, thinkingDelay);
  }, [game, makeMove, currentTurn, isCheckmate, isStalemate, isDraw, timeBlack, aiPersonality]);

  // Trigger AI move when it's black's turn
  useEffect(() => {
    if (currentTurn === 'black' && !isAIThinking) {
      makeAIMove();
    }
  }, [currentTurn, isAIThinking, makeAIMove]);

  const handleMove = (from: ChessSquare, to: ChessSquare) => {
    const result = makeMove({ from, to });

    if (result.success && result.move) {
      const currentTime = currentTurn === 'white' ? timeWhite : timeBlack;
      setMoveHistory(prev => [...prev, {
        notation: result.move.san,
        time: `${Math.floor(currentTime / 60)}:${(currentTime % 60).toString().padStart(2, '0')}`
      }]);
    }
  };

  const handleResign = () => {
    if (window.confirm('Вы уверены, что хотите сдаться?')) {
      navigate('/home');
    }
  };

  const handleDraw = () => {
    if (window.confirm('Предложить ничью сопернику?')) {
      setShowMenu(false);
    }
  };

  const handleAIAnalysis = async () => {
    setIsAnalyzing(true);
    info('AI Анализ', 'Анализируем позицию...');

    try {
      const analysis = await analyzePosition(game, 'deepseek');
      setAIAnalysis(analysis);
      setShowAIAnalysis(true);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="relative min-h-screen flex overflow-hidden">
      {/* Premium Background with Glow */}
      <div className="fixed inset-0 z-0">
        <img
          src="/images/backgrounds/board-depth.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <img
          src="/images/backgrounds/board-glow.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-screen"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40" />
      </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-10 flex flex-1"
    >
      {/* Left Panel - Chess Board */}
      <div className="flex-1 flex flex-col px-4 md:px-8 pt-2 pb-4 md:pb-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-4 flex items-center gap-4 flex-wrap"
        >
          <button
            onClick={() => navigate('/game-mode')}
            className="glass-button !px-4 !py-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="glass-card px-4 py-2 flex items-center gap-2">
            <Clock className="w-4 h-4 text-stake-red" />
            <span className="text-body-sm font-semibold">Блиц 3+2</span>
          </div>
          <div className="glass-card px-4 py-2 flex items-center gap-3 bg-gradient-to-r from-stake-red/10 to-transparent border-stake-red/30">
            <Bot className="w-4 h-4 text-stake-red" />
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Противник</span>
              <span className="text-sm font-semibold text-stake-red">{aiPersonality.name}</span>
            </div>
            <div className="text-xs font-mono text-gray-400">
              {aiPersonality.rating}
            </div>
            {isAIThinking && (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xs text-yellow-400"
              >
                думает...
              </motion.div>
            )}
          </div>
        </motion.div>

        {/* Chess Board Component */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex-1 flex items-center"
        >
          <div className="w-full">
            <ChessBoard
              game={game}
              position={position}
              onMove={handleMove}
              whiteTime={timeWhite}
              blackTime={timeBlack}
              isPlayerTurn={isPlayerTurn}
            />
          </div>
        </motion.div>

        {/* Game Controls */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex gap-3"
        >
          <button
            onClick={handleAIAnalysis}
            disabled={isAnalyzing}
            className="glass-button !bg-stake-red/10 !border-stake-red/30 flex-1 flex items-center justify-center gap-2 hover:!bg-stake-red/20 hover:!border-stake-red/50 hover:shadow-[0_0_16px_rgba(239,49,36,0.3)] transition-all duration-300 disabled:opacity-50"
          >
            <Sparkles className={`w-5 h-5 text-stake-red ${isAnalyzing ? 'animate-pulse' : ''}`} />
            <span className="font-semibold text-stake-red">{isAnalyzing ? 'Анализ...' : 'AI'}</span>
          </button>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="btn-secondary flex items-center justify-center gap-2 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <Settings className="w-5 h-5" />
          </button>
          <button
            onClick={handleDraw}
            className="btn-secondary flex items-center justify-center gap-2 hover:shadow-[0_0_12px_rgba(255,255,255,0.1)] transition-all duration-300"
          >
            <Handshake className="w-5 h-5" />
          </button>
          <button
            onClick={handleResign}
            className="glass-button !bg-red-500/20 !border-red-500/40 flex items-center justify-center gap-2 hover:!bg-red-500/30 hover:!border-red-500/60 hover:shadow-[0_0_16px_rgba(239,68,68,0.3)] transition-all duration-300"
          >
            <Flag className="w-5 h-5 text-red-400" />
          </button>
        </motion.div>
      </div>

      {/* Right Panel - Move History (Desktop) */}
      <motion.div
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="hidden lg:block w-80 bg-gradient-to-b from-black/40 to-black/60 border-l border-white/10 p-6"
      >
        <h4 className="mb-6">История ходов</h4>

        <div className="glass-card p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-body-sm text-gray-400">Ход</span>
            <span className="text-body-sm text-gray-400">Время</span>
          </div>
        </div>

        <div className="relative">
          {/* Scroll fade indicators */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/40 to-transparent pointer-events-none z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/40 to-transparent pointer-events-none z-10" />

          <div className="space-y-1 max-h-[calc(100vh-240px)] overflow-y-auto scrollbar-hide py-2">
            {moveHistory.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <p className="text-body-sm">Ходов пока нет</p>
              </div>
            ) : (
              moveHistory.map((move, index) => {
                const isLatestMove = index === moveHistory.length - 1;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    className={`p-3 flex items-center justify-between transition-all rounded-lg ${
                      isLatestMove
                        ? 'bg-stake-red/15 border border-stake-red/30 shadow-[0_0_12px_rgba(255,23,68,0.2)]'
                        : index % 2 === 0
                        ? 'bg-white/5 hover:bg-white/10'
                        : 'bg-transparent hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-semibold text-gray-400 w-8 tabular-nums">
                        {Math.floor(index / 2) + 1}.
                      </span>
                      <span className={`font-semibold tracking-wide ${isLatestMove ? 'text-white' : 'text-gray-200'}`}>
                        {move.notation}
                      </span>
                    </div>
                    <span className={`text-xs font-mono tabular-nums ${isLatestMove ? 'text-gray-300' : 'text-gray-400'}`}>
                      {move.time}
                    </span>
                  </motion.div>
                );
              })
            )}
          </div>
        </div>
      </motion.div>

      {/* Menu Overlay */}
      {showMenu && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          onClick={() => setShowMenu(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="glass-card p-8 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="mb-6">Меню игры</h3>
            <div className="space-y-3">
              <button className="btn-secondary w-full !py-4 text-left px-6">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  <span>Настройки доски</span>
                </div>
              </button>
              <button className="btn-secondary w-full !py-4 text-left px-6">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5" />
                  <span>История ходов</span>
                </div>
              </button>
              <button
                onClick={() => navigate('/home')}
                className="glass-button w-full !bg-red-500/20 !border-red-500/30 !py-4 text-left px-6 hover:!bg-red-500/30"
              >
                <div className="flex items-center gap-3">
                  <Flag className="w-5 h-5" />
                  <span>Выйти из игры</span>
                </div>
              </button>
              <button
                onClick={() => setShowMenu(false)}
                className="btn-primary w-full !py-4"
              >
                Продолжить
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* AI Analysis Panel */}
      <AnimatePresence>
        {showAIAnalysis && aiAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
            onClick={() => setShowAIAnalysis(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-card p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-stake-red to-stake-red-dark flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="!text-2xl !mb-0">AI Анализ позиции</h3>
                    <p className="text-sm text-gray-400">Powered by DeepSeek</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAIAnalysis(false)}
                  className="glass-button !p-3"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                {/* Evaluation */}
                <div className="glass-card p-6 bg-gradient-to-br from-stake-red/10 to-transparent border-stake-red/30">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-stake-red" />
                    <h4 className="!text-lg !mb-0">Оценка позиции</h4>
                  </div>
                  <p className="text-3xl font-bold text-gradient mb-2">{aiAnalysis.evaluation}</p>
                  <p className="text-body text-gray-300">{aiAnalysis.positionSummary}</p>
                </div>

                {/* Best Move */}
                <div className="glass-card p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    <h4 className="!text-lg !mb-0">Лучший ход</h4>
                  </div>
                  <p className="text-2xl font-bold text-white mb-2">{aiAnalysis.bestMove}</p>
                  <p className="text-body text-gray-400">{aiAnalysis.suggestedPlan}</p>
                </div>

                {/* Threats */}
                {aiAnalysis.threats.length > 0 && (
                  <div className="glass-card p-6 bg-gradient-to-br from-red-500/10 to-transparent border-red-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                      <h4 className="!text-lg !mb-0">Угрозы</h4>
                    </div>
                    <ul className="space-y-2">
                      {aiAnalysis.threats.map((threat, i) => (
                        <li key={i} className="text-body text-gray-300 flex items-start gap-2">
                          <span className="text-red-400 mt-1">•</span>
                          <span>{threat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Opportunities */}
                {aiAnalysis.opportunities.length > 0 && (
                  <div className="glass-card p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-3 h-3 rounded-full bg-green-400" />
                      <h4 className="!text-lg !mb-0">Возможности</h4>
                    </div>
                    <ul className="space-y-2">
                      {aiAnalysis.opportunities.map((opp, i) => (
                        <li key={i} className="text-body text-gray-300 flex items-start gap-2">
                          <span className="text-green-400 mt-1">•</span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowAIAnalysis(false)}
                className="btn-primary w-full !py-4 mt-6"
              >
                Понятно
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
    </div>
  );
}
