import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Trophy, Medal, Crown, Flame, TrendingUp } from 'lucide-react';
import { generateChessAvatar, svgToDataUrl } from '../utils/avatarGenerator';

interface Player {
  id: string;
  name: string;
  rating: number;
  wins: number;
  games: number;
  streak: number;
  country: string;
}

const generatePlayers = (count: number): Player[] => {
  const names = [
    'Александр', 'Владимир', 'Дмитрий', 'Сергей', 'Андрей',
    'Мария', 'Анна', 'Елена', 'Ольга', 'Наталья',
    'Иван', 'Петр', 'Николай', 'Михаил', 'Алексей',
  ];
  const surnames = [
    'Петров', 'Иванов', 'Сидоров', 'Кузнецов', 'Смирнов',
    'Попов', 'Волков', 'Соколов', 'Лебедев', 'Козлов',
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `player_${i}`,
    name: `${names[i % names.length]} ${surnames[i % surnames.length]}`,
    rating: 2800 - i * 50 - Math.floor(Math.random() * 30),
    wins: 150 - i * 5 + Math.floor(Math.random() * 20),
    games: 200 - i * 3,
    streak: Math.max(0, 10 - i + Math.floor(Math.random() * 5)),
    country: '🇷🇺',
  }));
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const [timeframe, setTimeframe] = useState<'daily' | 'weekly' | 'allTime'>('weekly');
  const [category, setCategory] = useState<'rating' | 'wins' | 'streak'>('rating');

  const players = useMemo(() => generatePlayers(50), []);

  const sortedPlayers = useMemo(() => {
    return [...players].sort((a, b) => {
      if (category === 'rating') return b.rating - a.rating;
      if (category === 'wins') return b.wins - a.wins;
      return b.streak - a.streak;
    });
  }, [players, category]);

  const currentPlayerRank = 15; // Mock current user rank

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-orange-400" />;
    return null;
  };

  const getRankBackground = (rank: number) => {
    if (rank === 1) return 'from-yellow-500/20 to-yellow-600/10 border-yellow-500/30';
    if (rank === 2) return 'from-gray-400/20 to-gray-500/10 border-gray-400/30';
    if (rank === 3) return 'from-orange-500/20 to-orange-600/10 border-orange-500/30';
    return '';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black pb-28 md:pb-20"
    >
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate(-1)} className="glass-button !p-3 !rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="!text-3xl">Рейтинг</h1>
            <p className="text-sm text-gray-400">Лучшие игроки мира</p>
          </div>
        </div>

        {/* Timeframe Filter */}
        <div className="glass rounded-xl p-2 flex gap-2 mb-4">
          {[
            { key: 'daily', label: 'День' },
            { key: 'weekly', label: 'Неделя' },
            { key: 'allTime', label: 'Всё время' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setTimeframe(key as typeof timeframe)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all text-sm ${
                timeframe === key
                  ? 'bg-stake-red text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Category Filter */}
        <div className="glass rounded-xl p-2 flex gap-2 mb-6">
          {[
            { key: 'rating', label: 'Рейтинг', icon: TrendingUp },
            { key: 'wins', label: 'Победы', icon: Trophy },
            { key: 'streak', label: 'Серия', icon: Flame },
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setCategory(key as typeof category)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 text-sm ${
                category === key
                  ? 'bg-stake-red text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          ))}
        </div>

        {/* Current Player Position */}
        <motion.div
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          className="glass-card p-5 mb-6 border-2 border-stake-red/30"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-2xl font-bold text-stake-red">#{currentPlayerRank}</div>
              <div>
                <p className="font-semibold">Вы</p>
                <p className="text-sm text-gray-400">Рейтинг: 1450</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">+3</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard */}
      <div className="px-6 space-y-3">
        {sortedPlayers.slice(0, 30).map((player, index) => {
          const rank = index + 1;
          const isTopThree = rank <= 3;
          const avatar = useMemo(
            () => svgToDataUrl(generateChessAvatar({ seed: player.name, size: 48, style: 'chess' })),
            [player.name]
          );

          return (
            <motion.div
              key={player.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.02 }}
              className={`glass-card p-4 ${isTopThree ? `bg-gradient-to-br ${getRankBackground(rank)} border` : ''}`}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="w-12 text-center">
                  {getRankIcon(rank) || (
                    <span className={`text-lg font-bold ${isTopThree ? 'text-white' : 'text-gray-500'}`}>
                      #{rank}
                    </span>
                  )}
                </div>

                {/* Avatar */}
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10">
                  <img src={avatar} alt={player.name} className="w-full h-full" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold truncate">{player.name}</span>
                    <span>{player.country}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>{player.games} игр</span>
                    {player.streak > 0 && (
                      <span className="flex items-center gap-1 text-orange-400">
                        <Flame className="w-3 h-3" />
                        {player.streak}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="text-right">
                  {category === 'rating' && (
                    <p className="text-xl font-bold text-gradient">{player.rating}</p>
                  )}
                  {category === 'wins' && (
                    <p className="text-xl font-bold text-green-400">{player.wins}</p>
                  )}
                  {category === 'streak' && (
                    <p className="text-xl font-bold text-orange-400">{player.streak}</p>
                  )}
                  <p className="text-xs text-gray-500">
                    {Math.round((player.wins / player.games) * 100)}% WR
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
