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
          <div className="flex items-center justify-center bg-primary-50 p-2 rounded-full mb-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z" fill="#E5F0FF"/>
              <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" fill="#3366FF"/>
              <path d="M28 13C28 14.6569 26.6569 16 25 16C23.3431 16 22 14.6569 22 13C22 11.3431 23.3431 10 25 10C26.6569 10 28 11.3431 28 13Z" fill="#3366FF"/>
              <path d="M20 28C24.4183 28 28 24.4183 28 20H12C12 24.4183 15.5817 28 20 28Z" fill="#3366FF"/>
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
                ? "bg-primary-50 text-primary-700" 
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
                ? "bg-primary-50 text-primary-700" 
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
                ? "bg-primary-50 text-primary-700" 
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
                ? "bg-primary-50 text-primary-700" 
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
                ? "bg-primary-50 text-primary-700" 
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
                ? "bg-primary-50 text-primary-700" 
                : "text-slate-700 hover:bg-slate-100"
            )}>
              <i className="fa-solid fa-bell w-5 h-5 ltr:mr-2 rtl:ml-2"></i>
              {t('notifications')}
              <span className="ml-auto bg-primary-100 text-primary-600 rounded-full px-2 py-0.5 text-xs">12</span>
            </a>
          </Link>
          
          <Link href="/settings">
            <a className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-md",
              isActive('/settings') 
                ? "bg-primary-50 text-primary-700" 
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
