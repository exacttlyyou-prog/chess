import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  image?: string;
}

export default function EmptyState({ icon: Icon, title, description, action, image }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-8 text-center"
    >
      {image ? (
        <div className="w-48 h-48 mb-6 relative">
          <img
            src={image}
            alt=""
            className="w-full h-full object-contain opacity-30"
          />
        </div>
      ) : (
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-stake-red/20 to-stake-red/5 flex items-center justify-center mb-6">
          <Icon className="w-12 h-12 text-stake-red/60" strokeWidth={1.5} />
        </div>
      )}

      <h3 className="!text-xl mb-3 text-gray-300">{title}</h3>
      <p className="text-sm text-gray-500 max-w-sm mb-6">{description}</p>

      {action && (
        <button
          onClick={action.onClick}
          className="btn-primary"
        >
          {action.label}
        </button>
      )}
    </motion.div>
  );
}
