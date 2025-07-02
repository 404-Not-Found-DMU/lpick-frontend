import { ReactNode } from 'react';

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  className?: string;
}

const FeatureCard = ({ icon, title, description, className }: FeatureCardProps) => (
  <div
    className={`rounded-xl border border-white/20 bg-white/70 p-3 backdrop-blur-sm transition-all hover:scale-105 hover:bg-white/90 dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/90 sm:p-4 lg:p-6 ${className ?? ''}`}
  >
    <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 dark:bg-violet-900/30 sm:mb-3 sm:h-10 sm:w-10 lg:mb-4 lg:h-12 lg:w-12">
      {icon}
    </div>
    <h3 className="mb-1 text-xs font-semibold text-gray-900 dark:text-white sm:mb-2 sm:text-sm lg:text-base">
      {title}
    </h3>
    <p className="text-xs text-gray-600 dark:text-gray-400 sm:text-sm">{description}</p>
  </div>
);

export default FeatureCard;
