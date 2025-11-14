import { motion } from 'framer-motion';
import { Brain, TrendingUp, Lightbulb, Zap, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Move {
  notation: string;
  evaluation: number;
  depth: number;
  bestMove: boolean;
}

interface AIAnalysisPanelProps {
  currentEvaluation: number;
  suggestedMoves: Move[];
  analysisDepth?: number;
  showHints?: boolean;
  onAcceptSuggestion?: (move: Move) => void;
}

export default function AIAnalysisPanel({
  currentEvaluation,
  suggestedMoves,
  analysisDepth = 20,
  showHints = true,
  onAcceptSuggestion,
}: AIAnalysisPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const getEvaluationColor = (evaluation: number) => {
    if (evaluation > 2) return 'text-green-400';
    if (evaluation > 0) return 'text-green-300';
    if (evaluation > -2) return 'text-gray-300';
    return 'text-red-400';
  };

  const getEvaluationBar = (evaluation: number) => {
    // Convert evaluation to percentage (capped at ±5)
    const cappedEval = Math.max(-5, Math.min(5, evaluation));
    const percentage = ((cappedEval + 5) / 10) * 100;
    return percentage;
  };

  return (
    <div className="glass-card overflow-hidden relative">
      {/* AI Network Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-10">
        <motion.img
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          src="/images/heroes/ai-network.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-stake-black/90 via-stake-black/80 to-stake-black/90" />
      </div>

      {/* Header */}
      <div className="relative z-10 p-4 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center relative"
          >
            <Brain className="w-5 h-5 text-purple-400" />

            {/* Pulse Effect */}
            <motion.div
              animate={{
                opacity: [0, 0.5, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-lg bg-purple-500/30"
            />
          </motion.div>

          <div>
            <h3 className="!text-lg flex items-center gap-2">
              <span>AI Анализ</span>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-purple-400"
              />
            </h3>
            <p className="text-xs text-gray-400">Глубина анализа: {analysisDepth}</p>
          </div>
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="px-3 py-1 rounded-lg bg-stake-gray/50 hover:bg-stake-gray transition-colors text-sm"
        >
          {isExpanded ? 'Свернуть' : 'Развернуть'}
        </button>
      </div>

      {/* Evaluation Bar */}
      <div className="relative z-10 p-4 border-b border-white/10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-400">Оценка позиции</span>
          <span className={`text-lg font-bold ${getEvaluationColor(currentEvaluation)}`}>
            {currentEvaluation > 0 ? '+' : ''}{currentEvaluation.toFixed(1)}
          </span>
        </div>

        {/* Evaluation Bar */}
        <div className="relative h-3 bg-stake-gray rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '50%' }}
            animate={{ width: `${getEvaluationBar(currentEvaluation)}%` }}
            transition={{ duration: 0.5 }}
            className={`h-full relative ${
              currentEvaluation > 0
                ? 'bg-gradient-to-r from-green-600 to-green-400'
                : 'bg-gradient-to-r from-red-600 to-red-400'
            }`}
          >
            {/* Shimmer Effect */}
            <motion.div
              animate={{ x: [-50, 200] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{ width: '50px' }}
            />
          </motion.div>

          {/* Center Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-white/30" />
        </div>

        {/* Position Labels */}
        <div className="flex justify-between mt-1">
          <span className="text-xs text-red-400">Черные</span>
          <span className="text-xs text-green-400">Белые</span>
        </div>
      </div>

      {/* Suggested Moves */}
      {isExpanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="relative z-10 p-4 space-y-2 max-h-64 overflow-y-auto"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-4 h-4 text-yellow-400" />
            <h4 className="!text-sm font-semibold">Рекомендуемые ходы</h4>
          </div>

          {suggestedMoves.map((move, index) => {
            const isBestMove = move.bestMove;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`glass-card p-3 hover-lift cursor-pointer relative overflow-hidden ${
                  isBestMove ? 'border border-yellow-500/30' : ''
                }`}
                onClick={() => onAcceptSuggestion?.(move)}
              >
                {isBestMove && (
                  <motion.div
                    animate={{
                      opacity: [0.1, 0.3, 0.1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
                  />
                )}

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2">
                      {isBestMove && (
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                          }}
                        >
                          <Zap className="w-4 h-4 text-yellow-400 fill-current" />
                        </motion.div>
                      )}
                      <span className="font-mono font-bold text-lg">{move.notation}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      {isBestMove && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                          Лучший
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${getEvaluationColor(move.evaluation)}`}>
                        {move.evaluation > 0 ? '+' : ''}{move.evaluation.toFixed(1)}
                      </p>
                      <p className="text-xs text-gray-500">Глубина {move.depth}</p>
                    </div>

                    <TrendingUp
                      className={`w-4 h-4 ${
                        move.evaluation > 0 ? 'text-green-400' : 'text-red-400 rotate-180'
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

      {/* Hint Section */}
      {showHints && isExpanded && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative z-10 p-4 border-t border-white/10 bg-gradient-to-r from-blue-500/10 to-purple-500/10"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="!text-sm font-semibold text-blue-400 mb-1">Тактический совет</h4>
              <p className="text-sm text-gray-300">
                {currentEvaluation > 2
                  ? 'У вас сильная позиция. Развивайте преимущество.'
                  : currentEvaluation > 0
                  ? 'Небольшое преимущество. Сохраняйте давление.'
                  : currentEvaluation > -2
                  ? 'Равная позиция. Ищите тактические возможности.'
                  : 'Сложная позиция. Защищайтесь и ищите контригру.'}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Neural Network Animation */}
      <div className="absolute top-0 right-0 pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.3, 0],
              scale: [0, 1, 0],
              x: Math.random() * 100 - 50,
              y: Math.random() * 100,
            }}
            transition={{
              duration: 3,
              delay: i * 0.3,
              repeat: Infinity,
            }}
            className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-400"
          />
        ))}
      </div>
    </div>
  );
}
