import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import StatCard from '@/components/documents/StatCard';
import UploadDropzone from '@/components/documents/UploadDropzone';
import DocumentList from '@/components/documents/DocumentList';
import CategoryList from '@/components/documents/CategoryList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Link } from 'wouter';
import { generateDocumentStats } from '@/lib/documentUtils';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const Dashboard = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('recent-uploads');

  // Fetch documents
  const { data: documents } = useQuery({
    queryKey: ['/api/documents']
  });

  // Fetch document categories
  const { data: categories } = useQuery({
    queryKey: ['/api/document-categories']
  });

  // Fetch document types
  const { data: documentTypes } = useQuery({
    queryKey: ['/api/document-types']
  });

  // Calculate document statistics
  const stats = documents ? generateDocumentStats(documents) : { total: 0, valid: 0, expiringSoon: 0, expired: 0 };

  // Handle file upload
  const handleUploadFiles = async (files: File[]) => {
    try {
      // In a real application, we would upload these files to the server
      // For this demo, we'll just show a success toast
      
      toast({
        title: 'Upload Successful',
        description: `${files.length} files have been uploaded.`,
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your files.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <div className="w-10 h-10 bg-mint-green rounded-full flex items-center justify-center mr-3">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6H12L10 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V8C22 6.9 21.1 6 20 6ZM20 18H4V8H20V18Z" fill="white"/>
                <path d="M14 14C14 15.1 13.1 16 12 16C10.9 16 10 15.1 10 14C10 12.9 10.9 12 12 12C13.1 12 14 12.9 14 14Z" fill="white"/>
                <path d="M12 13C11.45 13 11 13.45 11 14C11 14.55 11.45 15 12 15C12.55 15 13 14.55 13 14C13 13.45 12.55 13 12 13Z" fill="#00B894"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">
              {t('documentManagement')}
            </h1>
          </div>
          <div className="flex flex-col">
            <p className="text-slate-500 mt-1">
              {t('documentManagementDesc')}
            </p>
            <p className="text-sm text-mint-green font-medium mt-1">
              "ثقتك تبدأ من التوثيق"
            </p>
          </div>
        </div>
        
        {/* Notification Area - Only show if there are expiring documents */}
        {stats.expiringSoon > 0 && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded-md">
            <Alert>
              <div className="flex">
                <div className="flex-shrink-0">
                  <i className="fa-solid fa-triangle-exclamation text-amber-500"></i>
                </div>
                <AlertDescription className="ml-3 rtl:mr-3 rtl:ml-0 text-sm text-amber-700">
                  {t('expiringDocumentsAlert', { count: stats.expiringSoon })}
                  <Link href="/documents?status=expiring_soon">
                    <a className="font-medium underline text-amber-700 hover:text-amber-500 ml-1">
                      {t('viewDocuments')}
                    </a>
                  </Link>
                </AlertDescription>
              </div>
            </Alert>
          </div>
        )}
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon="fa-file-lines"
            title={t('totalDocuments')}
            value={stats.total}
            iconColor="bg-primary-100 text-primary-600"
            onClick={() => window.location.href = '/documents'}
          />
          <StatCard
            icon="fa-circle-check"
            title={t('validDocuments')}
            value={stats.valid}
            iconColor="bg-emerald-100 text-emerald-600"
            onClick={() => window.location.href = '/documents?status=valid'}
          />
          <StatCard
            icon="fa-clock"
            title={t('expiringSoon')}
            value={stats.expiringSoon}
            iconColor="bg-amber-100 text-amber-600"
            onClick={() => window.location.href = '/documents?status=expiring_soon'}
          />
          <StatCard
            icon="fa-triangle-exclamation"
            title={t('expired')}
            value={stats.expired}
            iconColor="bg-red-100 text-red-600"
            onClick={() => window.location.href = '/documents?status=expired'}
          />
        </div>
        
        {/* Tabs and Content */}
        <div className="mb-6">
          <Tabs defaultValue="recent-uploads" onValueChange={setActiveTab}>
            <div className="border-b border-slate-200">
              <TabsList className="flex -mb-px space-x-8 rtl:space-x-reverse bg-transparent p-0">
                <TabsTrigger 
                  value="recent-uploads"
                  className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 bg-transparent"
                >
                  {t('recentUploads')}
                </TabsTrigger>
                <TabsTrigger 
                  value="document-types"
                  className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 bg-transparent"
                >
                  {t('documentTypes')}
                </TabsTrigger>
                <TabsTrigger 
                  value="templates"
                  className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 bg-transparent"
                >
                  {t('templates')}
                </TabsTrigger>
                <TabsTrigger 
                  value="approvals"
                  className="border-b-2 border-transparent py-4 px-1 text-sm font-medium text-slate-500 hover:text-slate-700 hover:border-slate-300 data-[state=active]:border-primary-500 data-[state=active]:text-primary-600 bg-transparent"
                >
                  {t('approvals')}
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="recent-uploads" className="mt-6">
              {/* Upload Area */}
              <UploadDropzone onUpload={handleUploadFiles} />
              
              {/* Recent Uploads Grid */}
              <DocumentList title={t('recentDocuments')} maxItems={8} />
            </TabsContent>
            
            <TabsContent value="document-types" className="mt-6">
              <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h3 className="text-lg font-medium mb-4">{t('documentTypes')}</h3>
                <p className="text-slate-500">Manage document types and their properties.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h3 className="text-lg font-medium mb-4">{t('templates')}</h3>
                <p className="text-slate-500">Create and manage document templates for your organization.</p>
              </div>
            </TabsContent>
            
            <TabsContent value="approvals" className="mt-6">
              <div className="bg-white rounded-lg shadow border border-slate-200 p-6">
                <h3 className="text-lg font-medium mb-4">{t('approvals')}</h3>
                <p className="text-slate-500">Review and approve pending document requests.</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Document Categories Section */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-slate-900">
              {t('documentCategories')}
            </h2>
            <button className="flex items-center px-3 py-1.5 text-sm bg-primary-50 text-primary-700 rounded-md hover:bg-primary-100">
              <i className="fa-solid fa-plus text-xs ltr:mr-1 rtl:ml-1"></i>
              {t('addCategory')}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {categories && documentTypes && documents && categories.map(category => (
              <CategoryList 
                key={category.id}
                category={category}
                documentTypes={documentTypes}
                documents={documents}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
