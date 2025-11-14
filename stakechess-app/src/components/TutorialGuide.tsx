import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ChevronRight, ChevronLeft, BookOpen, Lightbulb, Trophy, Check, X } from 'lucide-react';

interface TutorialStep {
  id: number;
  title: string;
  description: string;
  tip?: string;
  visual?: string;
  task?: string;
  completed?: boolean;
}

interface TutorialGuideProps {
  steps: TutorialStep[];
  onComplete?: () => void;
  onSkip?: () => void;
}

const defaultSteps: TutorialStep[] = [
  {
    id: 1,
    title: 'Добро пожаловать в StakeChess',
    description: 'Играйте в шахматы, зарабатывайте награды и становитесь мастером!',
    tip: 'Каждая игра приносит опыт и рейтинг',
    visual: '/images/pieces/knight-light.png',
  },
  {
    id: 2,
    title: 'Как ходит Конь',
    description: 'Конь перемещается буквой "Г" - на 2 клетки в одном направлении и 1 клетку перпендикулярно',
    tip: 'Конь - единственная фигура, которая может перепрыгивать через другие',
    task: 'Сделайте первый ход конем',
    visual: '/images/pieces/knight-light.png',
  },
  {
    id: 3,
    title: 'Базовые правила',
    description: 'Цель игры - объявить шах и мат королю противника',
    tip: 'Защищайте своего короля и атакуйте короля соперника',
    task: 'Изучите основные правила',
  },
  {
    id: 4,
    title: 'Рейтинговая система',
    description: 'Выигрывайте партии, получайте очки рейтинга и поднимайтесь в таблице лидеров',
    tip: 'Чем сильнее соперник, тем больше очков за победу',
    task: 'Сыграйте первую рейтинговую партию',
  },
  {
    id: 5,
    title: 'Готовы начать?',
    description: 'Теперь вы знаете основы. Пора применить знания на практике!',
    tip: 'Не бойтесь ошибаться - это лучший способ учиться',
  },
];

export default function TutorialGuide({
  steps = defaultSteps,
  onComplete,
  onSkip,
}: TutorialGuideProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (isLastStep) {
      onComplete?.();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleTaskComplete = () => {
    if (!completedSteps.includes(step.id)) {
      setCompletedSteps([...completedSteps, step.id]);
    }
  };

  const isStepCompleted = completedSteps.includes(step.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="glass-card max-w-2xl w-full max-h-[90vh] overflow-hidden relative"
      >
        {/* Skip Button */}
        <button
          onClick={onSkip}
          className="absolute top-4 right-4 z-10 p-2 rounded-lg bg-stake-gray/50 hover:bg-stake-gray transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Progress Bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-stake-gray">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-stake-red to-orange-500"
          />
        </div>

        {/* Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-stake-red/20 to-orange-500/20 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-stake-red" />
            </div>
            <div>
              <h2 className="!text-2xl">Обучение</h2>
              <p className="text-xs text-gray-400">
                Шаг {currentStep + 1} из {steps.length}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* Visual */}
              {step.visual && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="relative w-full h-64 mb-6 rounded-xl overflow-hidden bg-gradient-to-br from-stake-black-light to-stake-gray"
                >
                  <motion.img
                    animate={{
                      y: [-10, 10, -10],
                      rotate: [-2, 2, -2],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    src={step.visual}
                    alt={step.title}
                    className="absolute inset-0 w-full h-full object-contain p-8"
                  />

                  {/* Light Glow Effect */}
                  <motion.div
                    animate={{
                      opacity: [0.3, 0.6, 0.3],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                    className="absolute inset-0 bg-gradient-radial from-stake-red/20 via-transparent to-transparent"
                  />

                  {/* Particle Effects */}
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: [0, 1, 0],
                        y: [0, -50],
                        x: Math.random() * 100 - 50,
                      }}
                      transition={{
                        duration: 2 + Math.random(),
                        delay: i * 0.3,
                        repeat: Infinity,
                      }}
                      className="absolute bottom-1/4 left-1/2 w-2 h-2 rounded-full bg-yellow-400"
                    />
                  ))}
                </motion.div>
              )}

              {/* Title */}
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="!text-3xl mb-4"
              >
                {step.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-gray-300 text-lg mb-6"
              >
                {step.description}
              </motion.p>

              {/* Tip */}
              {step.tip && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="glass-card p-4 mb-6 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/30"
                >
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="!text-sm font-semibold text-yellow-400 mb-1">
                        Совет
                      </h4>
                      <p className="text-sm text-gray-300">{step.tip}</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Task */}
              {step.task && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className={`glass-card p-4 transition-all ${
                    isStepCompleted
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-stake-red/10 border border-stake-red/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                          isStepCompleted
                            ? 'bg-green-500/20'
                            : 'bg-stake-red/20'
                        }`}
                      >
                        {isStepCompleted ? (
                          <Check className="w-5 h-5 text-green-400" />
                        ) : (
                          <Trophy className="w-5 h-5 text-stake-red" />
                        )}
                      </div>
                      <div>
                        <h4 className="!text-sm font-semibold mb-1">
                          {isStepCompleted ? 'Задание выполнено!' : 'Задание'}
                        </h4>
                        <p className="text-sm text-gray-300">{step.task}</p>
                      </div>
                    </div>
                    {!isStepCompleted && (
                      <button
                        onClick={handleTaskComplete}
                        className="btn-primary !py-2 !px-4 !text-sm"
                      >
                        Выполнено
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Navigation */}
        <div className="p-6 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={isFirstStep}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
              isFirstStep
                ? 'text-gray-600 cursor-not-allowed'
                : 'hover-lift text-white'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Назад</span>
          </button>

          <div className="flex gap-2">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'bg-stake-red w-8'
                    : index < currentStep
                    ? 'bg-green-500'
                    : 'bg-stake-gray'
                }`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="btn-primary flex items-center gap-2 group"
          >
            <span>{isLastStep ? 'Начать игру' : 'Далее'}</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
