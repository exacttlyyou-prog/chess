import { motion } from 'framer-motion';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular' | 'card';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ variant = 'text', width, height, className = '' }: SkeletonProps) {
  const baseClasses = 'bg-gradient-to-r from-white/5 via-white/10 to-white/5 animate-pulse';

  const variantClasses = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
    card: 'rounded-2xl',
  };

  const style = {
    width: width || (variant === 'circular' ? '40px' : '100%'),
    height: height || (variant === 'circular' ? '40px' : variant === 'card' ? '200px' : '16px'),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Pre-built skeleton layouts
export function HomePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black p-8">
      {/* Header */}
      <div className="mb-8">
        <Skeleton width="40%" height={32} className="mb-2" />
        <Skeleton width="30%" height={16} />
      </div>

      {/* Main Action Card */}
      <Skeleton variant="card" className="mb-6" height={180} />

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Skeleton variant="card" height={120} />
        <Skeleton variant="card" height={120} />
      </div>

      {/* Stats Card */}
      <Skeleton variant="card" height={150} className="mb-8" />

      {/* Recent Games */}
      <Skeleton width="40%" height={24} className="mb-4" />
      <div className="flex gap-4 overflow-hidden">
        <Skeleton variant="card" width={280} height={180} />
        <Skeleton variant="card" width={280} height={180} />
        <Skeleton variant="card" width={280} height={180} />
      </div>
    </div>
  );
}

export function ProfilePageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width={44} height={44} />
        <Skeleton width="30%" height={32} />
      </div>

      {/* Profile Card */}
      <div className="glass-card p-8 mb-6">
        <Skeleton variant="circular" width={112} height={112} className="mx-auto mb-4" />
        <Skeleton width="40%" height={28} className="mx-auto mb-4" />
        <div className="flex gap-3 justify-center mb-6">
          <Skeleton width={100} height={80} variant="rectangular" />
          <Skeleton width={100} height={80} variant="rectangular" />
        </div>
        <Skeleton width="50%" height={40} className="mx-auto" variant="rectangular" />
      </div>

      {/* Stats Cards */}
      <div className="space-y-4">
        <Skeleton variant="card" height={200} />
        <Skeleton variant="card" height={250} />
        <Skeleton variant="card" height={200} />
      </div>
    </div>
  );
}

export function TournamentsPageSkeleton() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-stake-black via-stake-black-light to-stake-black p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Skeleton variant="circular" width={44} height={44} />
        <div className="flex-1">
          <Skeleton width="40%" height={28} className="mb-2" />
          <Skeleton width="30%" height={16} />
        </div>
      </div>

      {/* Tournament Cards */}
      <div className="space-y-4">
        {[...Array(8)].map((_, i) => (
          <Skeleton key={i} variant="card" height={160} />
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="glass-card p-6">
      <Skeleton width="60%" height={20} className="mb-3" />
      <Skeleton width="100%" height={16} className="mb-2" />
      <Skeleton width="80%" height={16} className="mb-4" />
      <div className="flex gap-3">
        <Skeleton width={80} height={32} variant="rectangular" />
        <Skeleton width={80} height={32} variant="rectangular" />
      </div>
    </div>
  );
}
