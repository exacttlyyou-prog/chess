import { motion } from 'framer-motion';
import { Crown, Check, Zap, Award, Star, Sparkles } from 'lucide-react';
import BottomNav from '../components/BottomNav';
import PremiumKingFeatureCard from '../components/PremiumKingFeatureCard';
import { useToast } from '../contexts/ToastContext';

const features = [
  {
    id: '1',
    title: 'Безлимитный AI анализ',
    description: 'Анализируйте все свои партии с глубоким AI',
    icon: Star,
    included: true,
  },
  {
    id: '2',
    title: 'Премиум темы досок',
    description: 'Эксклюзивные визуальные стили и фигуры',
    icon: Sparkles,
    included: true,
  },
  {
    id: '3',
    title: 'Без рекламы',
    description: 'Чистый игровой опыт без отвлечений',
    icon: Check,
    included: true,
  },
  {
    id: '4',
    title: 'Приоритетная поддержка',
    description: '24/7 помощь от команды',
    icon: Crown,
    included: true,
  },
  {
    id: '5',
    title: 'Турнирные бонусы',
    description: 'Дополнительные призы в турнирах',
    icon: Award,
    included: true,
  },
  {
    id: '6',
    title: 'Ранний доступ',
    description: 'Первыми получайте новые функции',
    icon: Zap,
    included: true,
  },
];

export default function Premium() {
  const { success } = useToast();

  const handleUpgrade = () => {
    success('Premium активирован!', 'Добро пожаловать в King Premium');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-24"
    >
      {/* Header */}
      <div className="p-6 border-b border-yellow-500/20">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Crown className="w-10 h-10 text-yellow-400" fill="currentColor" />
            <h1 className="!text-4xl bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 bg-clip-text text-transparent">
              King Premium
            </h1>
            <Crown className="w-10 h-10 text-yellow-400" fill="currentColor" />
          </div>
          <p className="text-gray-400">Станьте королём шахмат</p>
        </motion.div>
      </div>

      {/* Premium Card */}
      <div className="p-6">
        <PremiumKingFeatureCard isPremium={false} onUpgrade={handleUpgrade} features={features} />
      </div>

      {/* Comparison Table */}
      <div className="p-6">
        <h2 className="!text-2xl mb-6 text-center">Сравнение</h2>

        <div className="glass-card overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-white/10">
            {/* Header */}
            <div className="bg-stake-black-light p-4">
              <p className="text-sm text-gray-400">Функция</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-gray-400">Бесплатно</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 p-4 text-center">
              <p className="text-sm font-bold text-yellow-400">Premium</p>
            </div>

            {/* AI Analysis */}
            <div className="bg-stake-black-light p-4">
              <p className="text-sm">AI Анализ</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-gray-500">3 в день</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <Check className="w-5 h-5 text-green-400 mx-auto" />
            </div>

            {/* Themes */}
            <div className="bg-stake-black-light p-4">
              <p className="text-sm">Темы досок</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-gray-500">2</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm font-bold text-yellow-400">Все</p>
            </div>

            {/* Ads */}
            <div className="bg-stake-black-light p-4">
              <p className="text-sm">Реклама</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-red-400">Да</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-green-400">Нет</p>
            </div>

            {/* Support */}
            <div className="bg-stake-black-light p-4">
              <p className="text-sm">Поддержка</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm text-gray-500">Email</p>
            </div>
            <div className="bg-stake-black-light p-4 text-center">
              <p className="text-sm font-bold text-yellow-400">24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="p-6">
        <h2 className="!text-2xl mb-6 text-center">Отзывы премиум пользователей</h2>

        <div className="space-y-4">
          {[
            {
              name: 'Алексей М.',
              rating: 2100,
              text: 'AI анализ помог мне улучшить свою игру на 200 пунктов рейтинга!',
            },
            {
              name: 'Мария К.',
              rating: 1850,
              text: 'Премиум темы - просто восхитительны. Играть стало намного приятнее!',
            },
            {
              name: 'Дмитрий С.',
              rating: 2300,
              text: 'Приоритетная поддержка решила мою проблему за 5 минут. Супер!',
            },
          ].map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-5"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center">
                  <Crown className="w-6 h-6 text-white" fill="currentColor" />
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400" fill="currentColor" />
                    <span className="text-sm text-gray-400">{testimonial.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-300">{testimonial.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-6">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleUpgrade}
          className="w-full py-5 rounded-xl bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-stake-black font-bold text-xl relative overflow-hidden group shadow-lg"
        >
          <motion.div
            animate={{ x: [-100, 400] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            style={{ width: '100px' }}
          />

          <span className="relative z-10 flex items-center justify-center gap-2">
            <Crown className="w-7 h-7" fill="currentColor" />
            Получить King Premium
            <Crown className="w-7 h-7" fill="currentColor" />
          </span>
        </motion.button>

        <p className="text-xs text-center text-gray-500 mt-3">
          Специальная цена: 499₽/месяц вместо 999₽
        </p>
      </div>

      <BottomNav />
    </motion.div>
  );
}
