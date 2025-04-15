import React, { useState, useEffect } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useQuery } from '@tanstack/react-query';
import { useLocation } from 'wouter';
import Layout from '@/components/layout/Layout';
import DocumentList from '@/components/documents/DocumentList';
import DocumentFilter from '@/components/documents/DocumentFilter';
import StatCard from '@/components/documents/StatCard';
import UploadDropzone from '@/components/documents/UploadDropzone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateDocumentStats } from '@/lib/documentUtils';

const Documents = () => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [location] = useLocation();
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('date_desc');
  const [filter, setFilter] = useState<Record<string, string>>({});

  // Parse URL parameters for filtering
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const statusParam = params.get('status');
    const categoryParam = params.get('category');
    const typeParam = params.get('type');
    
    const newFilter: Record<string, string> = {};
    
    if (statusParam) {
      newFilter.status = statusParam;
      setActiveTab('status');
    }
    
    if (categoryParam) {
      newFilter.categoryId = categoryParam;
      setActiveTab('category');
    }
    
    if (typeParam) {
      newFilter.typeId = typeParam;
      setActiveTab('type');
    }
    
    setFilter(newFilter);
  }, [location]);

  // Fetch documents
  const { data: documents } = useQuery({
    queryKey: ['/api/documents']
  });

  // Calculate document statistics
  const stats = documents ? generateDocumentStats(documents) : { total: 0, valid: 0, expiringSoon: 0, expired: 0 };

  // Handle file upload
  const handleUploadFiles = async (files: File[]) => {
    try {
      // In a real application, we would upload these files to the server
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

  const handleFilterChange = (newFilter: Record<string, string>) => {
    setFilter({ ...filter, ...newFilter });
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">
            {t('allDocuments')}
          </h1>
          <p className="text-slate-500 mt-1">
            View, manage and organize all documents
          </p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard
            icon="fa-file-lines"
            title={t('totalDocuments')}
            value={stats.total}
            iconColor="bg-primary-100 text-primary-600"
          />
          <StatCard
            icon="fa-circle-check"
            title={t('validDocuments')}
            value={stats.valid}
            iconColor="bg-emerald-100 text-emerald-600"
          />
          <StatCard
            icon="fa-clock"
            title={t('expiringSoon')}
            value={stats.expiringSoon}
            iconColor="bg-amber-100 text-amber-600"
          />
          <StatCard
            icon="fa-triangle-exclamation"
            title={t('expired')}
            value={stats.expired}
            iconColor="bg-red-100 text-red-600"
          />
        </div>
        
        {/* Upload Section */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Upload Documents</CardTitle>
            <CardDescription>Upload new documents for employees or applicants</CardDescription>
          </CardHeader>
          <CardContent>
            <UploadDropzone onUpload={handleUploadFiles} />
          </CardContent>
        </Card>
        
        {/* Tabs and Document List */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
              <CardTitle>Document Library</CardTitle>
              <DocumentFilter 
                sortBy={sortBy}
                onSortChange={setSortBy}
                onFilterChange={handleFilterChange}
                showStatusFilter
                showTypeFilter
              />
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Documents</TabsTrigger>
                <TabsTrigger value="status">By Status</TabsTrigger>
                <TabsTrigger value="category">By Category</TabsTrigger>
                <TabsTrigger value="type">By Type</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <DocumentList title="" />
              </TabsContent>
              
              <TabsContent value="status">
                <div className="grid grid-cols-1 gap-4">
                  <h3 className="text-lg font-medium">Documents by Status</h3>
                  <DocumentList 
                    filter={{ status: filter.status || 'valid' }} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="category">
                <div className="grid grid-cols-1 gap-4">
                  <h3 className="text-lg font-medium">Documents by Category</h3>
                  <DocumentList 
                    filter={{ categoryId: filter.categoryId || '1' }} 
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="type">
                <div className="grid grid-cols-1 gap-4">
                  <h3 className="text-lg font-medium">Documents by Type</h3>
                  <DocumentList 
                    filter={{ typeId: filter.typeId || '1' }} 
                  />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Documents;
