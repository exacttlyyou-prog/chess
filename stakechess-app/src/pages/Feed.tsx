import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, MessageCircle, TrendingUp, Trophy, Zap, Crown, Target } from 'lucide-react';

interface Post {
  id: number;
  user: {
    name: string;
    rating: number;
    avatar: string;
  };
  type: 'victory' | 'achievement' | 'streak';
  content: string;
  image?: string;
  stats?: {
    opponent?: string;
    moves?: number;
    accuracy?: number;
  };
  likes: number;
  comments: number;
  timestamp: string;
}

const feedData: Post[] = [
  {
    id: 1,
    user: { name: 'Гроссмейстер_89', rating: 2100, avatar: '/images/0_0 (99).png' },
    type: 'victory',
    content: 'Эпическая победа в блиц-турнире! 🔥',
    image: '/images/0_0 (76).png',
    stats: { opponent: 'ТактикПро_1950', moves: 38, accuracy: 94 },
    likes: 24,
    comments: 5,
    timestamp: '2 часа назад',
  },
  {
    id: 2,
    user: { name: 'Мастер_Блица', rating: 1850, avatar: '/images/0_0 (67).png' },
    type: 'achievement',
    content: 'Получил достижение "Молния" - 100 побед в пуле!',
    image: '/images/0_0 (66).png',
    likes: 42,
    comments: 8,
    timestamp: '5 часов назад',
  },
  {
    id: 3,
    user: { name: 'Стратег_2100', rating: 2100, avatar: '/images/0_2 (1).png' },
    type: 'streak',
    content: 'Серия из 10 побед подряд! Кто следующий? 💪',
    image: '/images/0_0 (85).png',
    likes: 67,
    comments: 12,
    timestamp: '1 день назад',
  },
  {
    id: 4,
    user: { name: 'ЗащитникКороля', rating: 1650, avatar: '/images/0_3.png' },
    type: 'victory',
    content: 'Первая победа над 1900+ рейтингом!',
    stats: { opponent: 'Атакующий_1920', moves: 52, accuracy: 87 },
    likes: 31,
    comments: 6,
    timestamp: '2 дня назад',
  },
];

export default function Feed() {
  const navigate = useNavigate();
  const [likedPosts, setLikedPosts] = useState<Set<number>>(new Set());

  const toggleLike = (postId: number) => {
    setLikedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  const getPostIcon = (type: Post['type']) => {
    switch (type) {
      case 'victory':
        return Trophy;
      case 'achievement':
        return Crown;
      case 'streak':
        return Zap;
    }
  };

  const getPostColor = (type: Post['type']) => {
    switch (type) {
      case 'victory':
        return 'text-green-400';
      case 'achievement':
        return 'text-yellow-400';
      case 'streak':
        return 'text-stake-red';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-28"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="sticky top-0 z-20 glass border-b border-white/[0.08] px-6 py-4 backdrop-blur-2xl"
      >
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/home')}
            className="glass-button !px-4 !py-3"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="!text-2xl">Лента игроков</h1>
            <p className="text-body-sm text-gray-400">Следи за достижениями сообщества</p>
          </div>
        </div>
      </motion.div>

      {/* Filter Tabs */}
      <div className="px-6 py-4 sticky top-[88px] z-10 glass-card border-y border-white/[0.08]">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['Все', 'Победы', 'Достижения', 'Стрики'].map((filter) => (
            <button
              key={filter}
              className={`px-5 py-2.5 rounded-xl font-semibold whitespace-nowrap transition-all ${
                filter === 'Все'
                  ? 'bg-stake-red text-white shadow-red-glow'
                  : 'glass text-gray-400 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Feed */}
      <div className="px-6 py-6 space-y-4">
        {feedData.map((post, index) => {
          const Icon = getPostIcon(post.type);
          const colorClass = getPostColor(post.type);
          const isLiked = likedPosts.has(post.id);

          return (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-6 shadow-depth hover-lift"
            >
              {/* User Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center overflow-hidden">
                  <img
                    src={post.user.avatar}
                    alt={post.user.name}
                    className="w-10 h-10 object-contain opacity-80"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h6 className="!text-base">{post.user.name}</h6>
                    <Icon className={`w-4 h-4 ${colorClass}`} />
                  </div>
                  <p className="text-body-sm text-gray-400">
                    Рейтинг {post.user.rating} • {post.timestamp}
                  </p>
                </div>
              </div>

              {/* Content */}
              <p className="text-body mb-4">{post.content}</p>

              {/* Image */}
              {post.image && (
                <div className="relative mb-4 rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/2 border border-white/10">
                  <div className="aspect-video flex items-center justify-center p-8">
                    <img
                      src={post.image}
                      alt=""
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>
                </div>
              )}

              {/* Stats */}
              {post.stats && (
                <div className="glass p-4 rounded-xl mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    {post.stats.opponent && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Соперник</p>
                        <p className="text-sm font-semibold">{post.stats.opponent}</p>
                      </div>
                    )}
                    {post.stats.moves && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Ходов</p>
                        <p className="text-sm font-semibold">{post.stats.moves}</p>
                      </div>
                    )}
                    {post.stats.accuracy && (
                      <div>
                        <p className="text-xs text-gray-400 mb-1">Точность</p>
                        <p className="text-sm font-semibold text-green-400">{post.stats.accuracy}%</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center gap-6">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => toggleLike(post.id)}
                  className={`flex items-center gap-2 transition-colors ${
                    isLiked ? 'text-stake-red' : 'text-gray-400 hover:text-stake-red'
                  }`}
                >
                  <Heart
                    className="w-5 h-5"
                    fill={isLiked ? 'currentColor' : 'none'}
                  />
                  <span className="text-sm font-semibold">
                    {post.likes + (isLiked ? 1 : 0)}
                  </span>
                </motion.button>

                <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm font-semibold">{post.comments}</span>
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="px-6 pb-8">
        <button className="btn-secondary w-full">
          Загрузить ещё
        </button>
      </div>
    </motion.div>
  );
}
