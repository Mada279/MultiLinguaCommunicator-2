import React from 'react';
import { Link, useLocation } from 'wouter';
import { useI18n } from '@/context/I18nContext';
import { useAuth } from '@/context/AuthContext';
import { cn } from '@/lib/utils';

const Sidebar: React.FC = () => {
  const { t } = useI18n();
  const { user } = useAuth();
  const [location] = useLocation();

  const isActive = (path: string) => {
    return location === path;
  };

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white border-r border-slate-200 h-full">
      <div className="p-4 border-b border-slate-200">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center justify-center bg-mint-green rounded-full p-3 mb-2">
            <svg width="42" height="42" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2Z" fill="#1E2A38"/>
              <path d="M18 9H13V4H14V8H18V9Z" fill="#F0F3F5"/>
              <path d="M16 12C16 13.1 15.1 14 14 14C12.9 14 12 13.1 12 12C12 10.9 12.9 10 14 10C15.1 10 16 10.9 16 12Z" fill="#F0F3F5"/>
              <path d="M15 17H13C12.45 17 12 16.55 12 16V15.5C12 14.95 12.45 14.5 13 14.5H15C15.55 14.5 16 14.95 16 15.5V16C16 16.55 15.55 17 15 17Z" fill="#F0F3F5"/>
              <path d="M10 11H8V13H10V11Z" fill="#00B894"/>
              <path d="M10 15H8V17H10V15Z" fill="#00B894"/>
              <path d="M10 7H8V9H10V7Z" fill="#00B894"/>
            </svg>
          </div>
          <div className="text-center">
            <h1 className="font-bold text-primary-700 text-lg">
              {t('appName')}
            </h1>
            <p className="text-xs text-slate-500">Document Management</p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1">
        <div className="mb-6">
          <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2 px-2">
            {t('mainMenu')}
          </h3>
          
          <Link href="/">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-home w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('dashboard')}
            </a>
          </Link>
          
          <Link href="/employees">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/employees') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-users w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('employees')}
            </a>
          </Link>
          
          <Link href="/applicants">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/applicants') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-user-plus w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('applicants')}
            </a>
          </Link>
          
          <Link href="/documents">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/documents') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-folder-open w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('allDocuments')}
            </a>
          </Link>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xs uppercase text-slate-500 font-semibold mb-2 px-2">
            {t('management')}
          </h3>
          
          <Link href="/reports">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/reports') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-chart-line w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('reports')}
            </a>
          </Link>
          
          <Link href="/notifications">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/notifications') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-bell w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('notifications')}
              <span className="ml-auto bg-mint-green text-white rounded-full px-2 py-0.5 text-xs">12</span>
            </a>
          </Link>
          
          <Link href="/settings">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/settings') 
                ? "bg-light-gray text-dark-blue" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-gear w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('settings')}
            </a>
          </Link>
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center text-sm font-medium text-slate-700">
          <img 
            src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80" 
            alt="User" 
            className="h-8 w-8 rounded-full ltr:mr-2 rtl:ml-2"
          />
          <div>
            <p className="font-medium">{user?.fullName || 'Ahmed Hassan'}</p>
            <p className="text-xs text-slate-500">{user?.department || 'HR Manager'}</p>
          </div>
          <i className="fa-solid fa-caret-down ml-auto rtl:mr-auto rtl:ml-0"></i>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
