import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';

interface StatCardProps {
  icon: string;
  title: string;
  value: number | string;
  iconColor?: string;
  onClick?: () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  icon,
  title,
  value,
  iconColor = 'bg-light-gray text-dark-blue',
  onClick
}) => {
  const { t } = useI18n();

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow p-4 border border-slate-200",
        onClick && "cursor-pointer transition-all hover:shadow-md"
      )}
      onClick={onClick}
    >
      <div className="flex items-center">
        <div className={cn("p-3 rounded-full", iconColor)}>
          <i className={cn("fa-solid", icon, "text-xl")}></i>
        </div>
        <div className="ml-4 rtl:mr-4 rtl:ml-0">
          <h3 className="text-sm font-medium text-slate-500">
            {title}
          </h3>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default StatCard;
