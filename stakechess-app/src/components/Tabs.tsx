import { useState, type ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

interface TabsProps {
  tabs: Tab[];
  defaultTab?: string;
  onChange?: (tabId: string) => void;
  variant?: 'pills' | 'underline';
  className?: string;
}

/**
 * Tabs компонент с анимацией
 */
export default function Tabs({
  tabs,
  defaultTab,
  onChange,
  variant = 'pills',
  className = '',
}: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    onChange?.(tabId);
  };

  const activeTabContent = tabs.find((tab) => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* Tab buttons */}
      <div
        className={`
          flex
          gap-1
          ${variant === 'underline' ? 'border-b border-gray-700' : 'bg-gray-800/50 p-1 rounded-xl'}
        `}
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => !tab.disabled && handleTabChange(tab.id)}
            disabled={tab.disabled}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`panel-${tab.id}`}
            className={`
              relative
              flex
              items-center
              gap-2
              px-4
              py-2
              font-medium
              transition-colors
              ${variant === 'pills' ? 'rounded-lg' : ''}
              ${
                activeTab === tab.id
                  ? variant === 'pills'
                    ? 'text-white'
                    : 'text-blue-400 border-b-2 border-blue-500'
                  : 'text-gray-400'
              }
              ${
                tab.disabled
                  ? 'opacity-50 cursor-not-allowed'
                  : 'hover:text-white cursor-pointer'
              }
            `}
          >
            {variant === 'pills' && activeTab === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg"
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              />
            )}

            <span className="relative z-10 flex items-center gap-2">
              {tab.icon}
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="mt-4">
        <AnimatedTabContent key={activeTab}>{activeTabContent}</AnimatedTabContent>
      </div>
    </div>
  );
}

function AnimatedTabContent({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      role="tabpanel"
    >
      {children}
    </motion.div>
  );
}
