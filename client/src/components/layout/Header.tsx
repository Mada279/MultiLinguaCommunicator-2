import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { Language } from '@/lib/i18n';
import { Button } from '@/components/ui/button';

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
        
        <div className="flex items-center gap-2">
          {/* Language Switcher Buttons */}
          <div className="flex rounded-md overflow-hidden border border-slate-200 mr-3">
            <button 
              type="button"
              onClick={() => handleLanguageChange('en')}
              className={`px-3 py-1.5 text-xs font-medium ${language === 'en' ? 'bg-primary-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              EN
            </button>
            <button 
              type="button"
              onClick={() => handleLanguageChange('ar')}
              className={`px-3 py-1.5 text-xs font-medium border-l border-r border-slate-200 ${language === 'ar' ? 'bg-primary-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              عربي
            </button>
            <button 
              type="button"
              onClick={() => handleLanguageChange('hi')}
              className={`px-3 py-1.5 text-xs font-medium ${language === 'hi' ? 'bg-primary-500 text-white' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
            >
              हिंदी
            </button>
          </div>

          <button
            type="button"
            className="relative p-1 text-slate-500 hover:text-slate-600 focus:outline-none"
          >
            <i className="fa-solid fa-bell text-xl"></i>
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.location.href = '/settings'}
            className="p-1 text-slate-500 hover:text-slate-600 focus:outline-none"
          >
            <i className="fa-solid fa-gear text-xl"></i>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
