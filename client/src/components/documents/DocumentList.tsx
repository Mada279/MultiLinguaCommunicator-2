import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useQuery } from '@tanstack/react-query';
import { Document, DocumentType, Person } from '@shared/schema';
import { useToast } from '@/hooks/use-toast';
import DocumentCard from './DocumentCard';
import DocumentFilter from './DocumentFilter';
import { Skeleton } from '@/components/ui/skeleton';
import { apiRequest } from '@/lib/queryClient';

interface DocumentListProps {
  title?: string;
  maxItems?: number;
  filter?: {
    personId?: number;
    categoryId?: number;
    typeId?: number;
    status?: string;
  };
}

const DocumentList: React.FC<DocumentListProps> = ({
  title,
  maxItems,
  filter
}) => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [sortBy, setSortBy] = useState('date_desc');

  // Fetch documents
  const { data: documents, isLoading: isLoadingDocuments } = useQuery({
    queryKey: ['/api/documents'],
    select: (data) => {
      let filteredData = [...data];

      // Apply filters if provided
      if (filter) {
        if (filter.personId) {
          filteredData = filteredData.filter(doc => doc.userId === filter.personId);
        }
        if (filter.typeId) {
          filteredData = filteredData.filter(doc => doc.typeId === filter.typeId);
        }
        if (filter.status) {
          filteredData = filteredData.filter(doc => doc.status === filter.status);
        }
      }

      // Apply sorting
      filteredData.sort((a, b) => {
        if (sortBy === 'date_desc') {
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
        } else if (sortBy === 'date_asc') {
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
        } else if (sortBy === 'name_asc') {
          return a.originalFilename.localeCompare(b.originalFilename);
        } else if (sortBy === 'name_desc') {
          return b.originalFilename.localeCompare(a.originalFilename);
        }
        return 0;
      });

      // Limit the number of items if maxItems is provided
      if (maxItems && filteredData.length > maxItems) {
        filteredData = filteredData.slice(0, maxItems);
      }

      return filteredData;
    }
  });

  // Fetch document types to display proper names
  const { data: documentTypes, isLoading: isLoadingTypes } = useQuery({
    queryKey: ['/api/document-types']
  });

  // Fetch persons to display proper names
  const { data: persons, isLoading: isLoadingPersons } = useQuery({
    queryKey: ['/api/persons']
  });

  // Handle document actions
  const handleViewDocument = (document: Document) => {
    // In a real app, this would navigate to a document viewer
    window.open(document.path, '_blank');
  };

  const handleDownloadDocument = async (document: Document) => {
    try {
      await apiRequest('GET', document.path, undefined);
      
      // Create a link to download the file
      const a = document.createElement('a');
      a.href = document.path;
      a.download = document.originalFilename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      toast({
        title: 'Download Error',
        description: 'Failed to download the document',
        variant: 'destructive',
      });
    }
  };

  const isLoading = isLoadingDocuments || isLoadingTypes || isLoadingPersons;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-slate-900">
          {title || t('recentDocuments')}
        </h2>
        
        <DocumentFilter 
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow border border-slate-200 overflow-hidden">
              <Skeleton className="h-36 w-full" />
              <div className="p-4 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-2/3" />
                <div className="flex justify-between pt-2">
                  <Skeleton className="h-3 w-10" />
                  <div className="flex gap-2">
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                    <Skeleton className="h-6 w-6 rounded-full" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : documents && documents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {documents.map(document => (
            <DocumentCard
              key={document.id}
              document={document}
              documentType={documentTypes?.find(t => t.id === document.typeId)}
              person={persons?.find(p => p.id === document.userId)}
              onView={handleViewDocument}
              onDownload={handleDownloadDocument}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow border border-slate-200 p-6 text-center">
          <i className="fa-solid fa-folder-open text-4xl text-slate-300 mb-2"></i>
          <p className="text-slate-500">{t('noResults')}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
