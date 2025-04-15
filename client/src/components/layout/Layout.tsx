import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useI18n } from '@/context/I18nContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { dir } = useI18n();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden" dir={dir}>
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="left" className="p-0 w-[240px]">
          <Sidebar />
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleMobileMenu={toggleMobileMenu} />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-4">
          {children}
        </main>
        <div className="text-xs text-slate-500 text-center py-2 border-t">
          Designed by Mohamed Farag
        </div>
      </div>
    </div>
  );
};

export default Layout;