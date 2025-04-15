import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { Language } from '@/lib/i18n';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface HeaderProps {
  toggleMobileMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMobileMenu }) => {
  const { t, language, setLanguage } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, we would handle search here
    console.log('Searching for:', searchQuery);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
  };

  const getLanguageLabel = () => {
    switch (language) {
      case 'ar':
        return 'العربية';
      case 'hi':
        return 'हिन्दी';
      case 'en':
      default:
        return 'English';
    }
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <button
            type="button"
            className="md:hidden text-slate-500 hover:text-slate-600 focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <i className="fa-solid fa-bars text-xl"></i>
          </button>
          
          <form onSubmit={handleSearch} className="relative ml-4 rtl:mr-4 rtl:ml-0 md:ml-0">
            <div className="absolute inset-y-0 left-0 rtl:right-0 rtl:left-auto flex items-center pl-3 rtl:pr-3">
              <i className="fa-solid fa-search text-slate-400"></i>
            </div>
            <input
              type="search"
              className="block w-full sm:w-64 pl-10 rtl:pr-10 rtl:pl-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder={t('searchDocuments')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
        
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button 
                type="button" 
                className="flex items-center text-sm focus:outline-none"
              >
                <span className="font-medium mr-1 rtl:ml-1 rtl:mr-0">
                  {getLanguageLabel()}
                </span>
                <i className="fa-solid fa-chevron-down text-xs"></i>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleLanguageChange('en')}>
                English
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('ar')}>
                العربية
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleLanguageChange('hi')}>
                हिन्दी
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <button
            type="button"
            className="relative p-1 text-slate-500 hover:text-slate-600 focus:outline-none"
          >
            <i className="fa-solid fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-danger"></span>
          </button>
          
          <button
            type="button"
            className="relative p-1 text-slate-500 hover:text-slate-600 focus:outline-none"
          >
            <i className="fa-solid fa-gear text-xl"></i>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
