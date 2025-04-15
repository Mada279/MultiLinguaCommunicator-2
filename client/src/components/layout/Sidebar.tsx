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
        <div className="flex items-center justify-center">
          <img 
            src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&h=100&q=80" 
            alt="Company Logo" 
            className="h-10"
          />
          <div className="ml-3 rtl:mr-3 rtl:ml-0">
            <h1 className="font-bold text-primary-600">
              {t('appName')}
            </h1>
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
