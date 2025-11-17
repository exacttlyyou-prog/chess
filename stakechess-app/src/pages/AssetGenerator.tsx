import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Trash2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ChessAssetGenerator, type PieceType, type PieceState, type GeneratedImage } from '../services/imageGenerator';
import { useToast } from '../contexts/ToastContext';

export default function AssetGenerator() {
  const navigate = useNavigate();
  const { info, success, error: showError } = useToast();
  const [generator] = useState(() => new ChessAssetGenerator(import.meta.env.VITE_OPENAI_API_KEY));
  const [selectedPiece, setSelectedPiece] = useState<PieceType>('king');
  const [selectedState, setSelectedState] = useState<PieceState>('base');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<GeneratedImage | null>(null);
  const [progress, setProgress] = useState({ current: 0, total: 0, piece: '' });
  const [isBatchGenerating, setIsBatchGenerating] = useState(false);

  const pieces: { type: PieceType; name: string; icon: string }[] = [
    { type: 'pawn', name: 'Пешка', icon: '♟' },
    { type: 'rook', name: 'Ладья', icon: '♜' },
    { type: 'knight', name: 'Конь', icon: '♞' },
    { type: 'bishop', name: 'Слон', icon: '♝' },
    { type: 'queen', name: 'Ферзь', icon: '♛' },
    { type: 'king', name: 'Король (Утка)', icon: '🦆' },
  ];

  const states: { state: PieceState; name: string }[] = [
    { state: 'base', name: 'Базовая' },
    { state: 'active', name: 'Активная' },
    { state: 'captured', name: 'Захваченная' },
  ];

  const handleGenerate = async () => {
    setIsGenerating(true);
    info('Генерация', `Создаём ${selectedPiece} (${selectedState})...`);

    try {
      const image = await generator.generatePiece(selectedPiece, selectedState);
      setGeneratedImage(image);
      success('Готово!', 'Изображение сгенерировано');
    } catch (err) {
      console.error('Generation error:', err);
      showError('Ошибка', 'Не удалось сгенерировать изображение');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleBatchGenerate = async () => {
    setIsBatchGenerating(true);
    info('Пакетная генерация', 'Генерируем все фигуры...');

    try {
      await generator.preloadAllPieces((current, total, piece) => {
        setProgress({ current, total, piece });
      });
      success('Готово!', `Сгенерировано ${progress.total} изображений`);
    } catch (err) {
      console.error('Batch generation error:', err);
      showError('Ошибка', 'Не удалось завершить генерацию');
    } finally {
      setIsBatchGenerating(false);
      setProgress({ current: 0, total: 0, piece: '' });
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;

    const link = document.createElement('a');
    link.href = generatedImage.url;
    link.download = `${selectedPiece}-${selectedState}.png`;
    link.click();
    success('Скачано', 'Изображение сохранено');
  };

  const handleClearCache = () => {
    if (window.confirm('Очистить весь кэш изображений?')) {
      generator.clearCache();
      setGeneratedImage(null);
      success('Очищено', 'Кэш изображений удалён');
    }
  };

  const cacheStats = generator.getCacheStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black">
      <div className="container max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/home')}
            className="glass-button !px-4 !py-3 mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="!text-4xl mb-2">AI Генератор Фигур</h1>
              <p className="text-gray-400">Создание 3D изображений шахматных фигур через DALL-E 3</p>
            </div>
            <div className="glass-card px-6 py-4">
              <p className="text-sm text-gray-400 mb-1">Кэш</p>
              <p className="text-2xl font-bold text-gradient">{cacheStats.memoryItems}</p>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* Piece Selection */}
            <div className="glass-card p-6">
              <h3 className="!text-xl mb-4 flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-stake-red" />
                Выбор фигуры
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {pieces.map((piece) => (
                  <button
                    key={piece.type}
                    onClick={() => setSelectedPiece(piece.type)}
                    className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                      selectedPiece === piece.type
                        ? 'bg-stake-red/20 border-stake-red text-white'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="text-4xl mb-2">{piece.icon}</div>
                    <div className="text-sm font-semibold">{piece.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* State Selection */}
            <div className="glass-card p-6">
              <h3 className="!text-xl mb-4">Состояние</h3>
              <div className="space-y-2">
                {states.map((state) => (
                  <button
                    key={state.state}
                    onClick={() => setSelectedState(state.state)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                      selectedState === state.state
                        ? 'bg-stake-red/20 border-stake-red text-white'
                        : 'bg-white/5 border-white/10 hover:border-white/20'
                    }`}
                  >
                    <div className="font-semibold">{state.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="btn-primary w-full !py-4 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Sparkles className={`w-5 h-5 ${isGenerating ? 'animate-pulse' : ''}`} />
                <span>{isGenerating ? 'Генерация...' : 'Сгенерировать'}</span>
              </button>

              <button
                onClick={handleBatchGenerate}
                disabled={isBatchGenerating}
                className="btn-secondary w-full !py-4 flex items-center justify-center gap-3 disabled:opacity-50"
              >
                <Sparkles className={`w-5 h-5 ${isBatchGenerating ? 'animate-pulse' : ''}`} />
                <span>
                  {isBatchGenerating
                    ? `Генерация ${progress.current}/${progress.total}...`
                    : 'Сгенерировать все (18 шт)'}
                </span>
              </button>

              <button
                onClick={handleClearCache}
                className="glass-button w-full !py-4 flex items-center justify-center gap-3 !bg-red-500/20 !border-red-500/40 hover:!bg-red-500/30"
              >
                <Trash2 className="w-5 h-5 text-red-400" />
                <span className="text-red-300">Очистить кэш</span>
              </button>
            </div>
          </motion.div>

          {/* Right Panel - Preview */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="space-y-6"
          >
            {/* Image Preview */}
            <div className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="!text-xl">Предпросмотр</h3>
                {generatedImage && (
                  <button
                    onClick={handleDownload}
                    className="glass-button !px-4 !py-2 flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    <span className="text-sm">Скачать</span>
                  </button>
                )}
              </div>

              <div className="aspect-square bg-black/40 rounded-2xl flex items-center justify-center overflow-hidden border border-white/10">
                {generatedImage ? (
                  <motion.img
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    src={generatedImage.url}
                    alt={`${selectedPiece} ${selectedState}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center p-8">
                    <ImageIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-500">Выберите фигуру и состояние</p>
                    <p className="text-gray-600 text-sm mt-2">Нажмите "Сгенерировать"</p>
                  </div>
                )}
              </div>
            </div>

            {/* Prompt Display */}
            {generatedImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card p-6"
              >
                <h3 className="!text-lg mb-3">Промпт</h3>
                <div className="bg-black/40 rounded-xl p-4 border border-white/10">
                  <p className="text-sm text-gray-300 font-mono leading-relaxed">
                    {generatedImage.prompt}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Cache Info */}
            <div className="glass-card p-6">
              <h3 className="!text-lg mb-3">Статистика</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">В памяти:</span>
                  <span className="font-semibold">{cacheStats.memoryItems}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">В localStorage:</span>
                  <span className="font-semibold">{cacheStats.localStorageItems}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
