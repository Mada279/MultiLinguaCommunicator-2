import React from 'react';
import { useI18n } from '@/context/I18nContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DocumentFilterProps {
  sortBy: string;
  onSortChange: (value: string) => void;
  onFilterChange?: (filter: Record<string, string>) => void;
  showStatusFilter?: boolean;
  showTypeFilter?: boolean;
  showDateFilter?: boolean;
}

const DocumentFilter: React.FC<DocumentFilterProps> = ({
  sortBy,
  onSortChange,
  onFilterChange,
  showStatusFilter = false,
  showTypeFilter = false,
  showDateFilter = false,
}) => {
  const { t } = useI18n();

  return (
    <div className="flex items-center space-x-2 rtl:space-x-reverse">
      <span className="text-sm text-slate-500">
        {t('sortBy')}
      </span>
      
      <Select
        value={sortBy}
        onValueChange={onSortChange}
      >
        <SelectTrigger className="h-8 text-sm border-slate-300 rounded-md focus:border-primary-500 focus:ring-primary-500 w-[140px]">
          <SelectValue placeholder={t('dateNewest')} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="date_desc">{t('dateNewest')}</SelectItem>
          <SelectItem value="date_asc">Date (Oldest)</SelectItem>
          <SelectItem value="name_asc">Name (A-Z)</SelectItem>
          <SelectItem value="name_desc">Name (Z-A)</SelectItem>
        </SelectContent>
      </Select>
      
      {showStatusFilter && (
        <Select
          defaultValue="all"
          onValueChange={(value) => onFilterChange?.({ status: value })}
        >
          <SelectTrigger className="h-8 text-sm border-slate-300 rounded-md focus:border-primary-500 focus:ring-primary-500 w-[140px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="valid">{t('validStatus')}</SelectItem>
            <SelectItem value="expiring_soon">{t('expiringSoonStatus')}</SelectItem>
            <SelectItem value="expired">{t('expiredStatus')}</SelectItem>
          </SelectContent>
        </Select>
      )}
      
      {showTypeFilter && (
        <Select
          defaultValue="all"
          onValueChange={(value) => onFilterChange?.({ type: value })}
        >
          <SelectTrigger className="h-8 text-sm border-slate-300 rounded-md focus:border-primary-500 focus:ring-primary-500 w-[140px]">
            <SelectValue placeholder="All Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="passport">{t('passport')}</SelectItem>
            <SelectItem value="id">{t('idCard')}</SelectItem>
            <SelectItem value="contract">{t('employmentContract')}</SelectItem>
          </SelectContent>
        </Select>
      )}
      
      {showDateFilter && (
        <Select
          defaultValue="all"
          onValueChange={(value) => onFilterChange?.({ date: value })}
        >
          <SelectTrigger className="h-8 text-sm border-slate-300 rounded-md focus:border-primary-500 focus:ring-primary-500 w-[140px]">
            <SelectValue placeholder="All Dates" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Dates</SelectItem>
            <SelectItem value="today">Today</SelectItem>
            <SelectItem value="this_week">This Week</SelectItem>
            <SelectItem value="this_month">This Month</SelectItem>
            <SelectItem value="this_year">This Year</SelectItem>
          </SelectContent>
        </Select>
      )}
    </div>
  );
};

export default DocumentFilter;
