import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useQuery } from '@tanstack/react-query';
import { useRoute, Link } from 'wouter';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDate } from '@/lib/i18n';
import { getDocumentStatusColor, getFileIconByMimeType, getFileIconColorByMimeType } from '@/lib/utils';
import { getDocumentFullName, getPersonFullName, canPreviewInBrowser } from '@/lib/documentUtils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const DocumentView = () => {
  const { t, language } = useI18n();
  const [match, params] = useRoute('/documents/:id');
  const [activeTab, setActiveTab] = useState('preview');
  
  const documentId = params?.id ? parseInt(params.id) : undefined;
  
  // Fetch document
  const { data: document, isLoading: isLoadingDocument } = useQuery({
    queryKey: [`/api/documents/${documentId}`],
    enabled: !!documentId
  });
  
  // Fetch document type
  const { data: documentType, isLoading: isLoadingType } = useQuery({
    queryKey: document ? [`/api/document-types/${document.typeId}`] : null,
    enabled: !!document
  });
  
  // Fetch person
  const { data: person, isLoading: isLoadingPerson } = useQuery({
    queryKey: document ? [`/api/persons/${document.userId}`] : null,
    enabled: !!document
  });
  
  const isLoading = isLoadingDocument || isLoadingType || isLoadingPerson;
  
  // Format dates
  const formatDateLocalized = (date: string | Date | undefined) => {
    if (!date) return '';
    return formatDate(date, language as any);
  };
  
  if (!match) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto mt-10 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Document Not Found</h1>
          <p className="text-slate-500 mb-6">The document you're looking for doesn't exist or has been moved.</p>
          <Link href="/documents">
            <Button>Back to Documents</Button>
          </Link>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/documents">
            <a className="text-sm text-primary-600 hover:underline flex items-center">
              <i className="fa-solid fa-arrow-left mr-2"></i>
              Back to Documents
            </a>
          </Link>
        </div>
        
        {isLoading ? (
          <div className="space-y-6">
            <Skeleton className="h-10 w-3/4" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Skeleton className="h-60 md:col-span-2" />
              <div className="space-y-4">
                <Skeleton className="h-28" />
                <Skeleton className="h-28" />
              </div>
            </div>
          </div>
        ) : document && documentType ? (
          <>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <h1 className="text-2xl font-bold text-slate-900">
                {getDocumentFullName(document, documentType, person, language)}
              </h1>
              <div className="flex items-center gap-2">
                <Badge className={getDocumentStatusColor(document.status)}>
                  {document.status === 'valid' 
                    ? t('validStatus') 
                    : document.status === 'expiring_soon' 
                      ? t('expiringSoonStatus') 
                      : t('expiredStatus')}
                </Badge>
                <Button variant="outline" size="sm">
                  <i className="fa-solid fa-pen-to-square mr-2"></i>
                  Edit
                </Button>
                <Button size="sm">
                  <i className="fa-solid fa-download mr-2"></i>
                  Download
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Document Preview */}
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Document Preview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
                      <TabsList className="mb-4">
                        <TabsTrigger value="preview">Preview</TabsTrigger>
                        <TabsTrigger value="info">Document Info</TabsTrigger>
                        <TabsTrigger value="history">History</TabsTrigger>
                      </TabsList>
                      
                      <TabsContent value="preview">
                        {canPreviewInBrowser(document.mimeType) ? (
                          document.mimeType.includes('image') ? (
                            <div className="border rounded-md overflow-hidden">
                              <img 
                                src={document.path} 
                                alt={document.originalFilename} 
                                className="w-full h-auto max-h-[600px] object-contain"
                              />
                            </div>
                          ) : (
                            <div className="border rounded-md h-[600px]">
                              <iframe 
                                src={document.path} 
                                className="w-full h-full" 
                                title={document.originalFilename}
                              ></iframe>
                            </div>
                          )
                        ) : (
                          <div className="h-60 flex flex-col items-center justify-center border rounded-md bg-slate-50">
                            <i className={cn("fa-solid text-5xl mb-4", getFileIconByMimeType(document.mimeType), getFileIconColorByMimeType(document.mimeType))}></i>
                            <p className="text-slate-700 mb-2">{document.originalFilename}</p>
                            <p className="text-sm text-slate-500 mb-4">This document cannot be previewed</p>
                            <Button size="sm">
                              <i className="fa-solid fa-download mr-2"></i>
                              Download to View
                            </Button>
                          </div>
                        )}
                      </TabsContent>
                      
                      <TabsContent value="info">
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">Original Filename</h3>
                            <p className="text-slate-900">{document.originalFilename}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">Document Type</h3>
                            <p className="text-slate-900">
                              {language === 'ar' ? documentType.nameAr : 
                               language === 'hi' ? documentType.nameHi : 
                               documentType.nameEn}
                            </p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">File Type</h3>
                            <p className="text-slate-900">{document.mimeType}</p>
                          </div>
                          <div>
                            <h3 className="text-sm font-medium text-slate-500 mb-1">File Size</h3>
                            <p className="text-slate-900">{(document.fileSize / 1024).toFixed(2)} KB</p>
                          </div>
                        </div>
                      </TabsContent>
                      
                      <TabsContent value="history">
                        <div className="space-y-4">
                          <div className="border-l-2 border-slate-200 pl-4 py-2">
                            <p className="text-sm text-slate-700">Document uploaded</p>
                            <p className="text-xs text-slate-500">{formatDateLocalized(document.uploadedAt)}</p>
                          </div>
                          <div className="border-l-2 border-slate-200 pl-4 py-2">
                            <p className="text-sm text-slate-700">Document status updated to {document.status}</p>
                            <p className="text-xs text-slate-500">{formatDateLocalized(document.uploadedAt)}</p>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
              
              {/* Document Details */}
              <div className="space-y-6">
                {/* Metadata */}
                <Card>
                  <CardHeader>
                    <CardTitle>Document Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Status</h3>
                      <Badge className={getDocumentStatusColor(document.status)}>
                        {document.status === 'valid' 
                          ? t('validStatus') 
                          : document.status === 'expiring_soon' 
                            ? t('expiringSoonStatus') 
                            : t('expiredStatus')}
                      </Badge>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Expiration Date</h3>
                      <p className="text-slate-900">{formatDateLocalized(document.expiryDate)}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-slate-500 mb-1">Upload Date</h3>
                      <p className="text-slate-900">{formatDateLocalized(document.uploadedAt)}</p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Person Information */}
                {person && (
                  <Card>
                    <CardHeader>
                      <CardTitle>{person.type === 'employee' ? 'Employee' : 'Applicant'} Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Name</h3>
                        <p className="text-slate-900">{getPersonFullName(person)}</p>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">
                          {person.type === 'employee' ? 'Position' : 'Applied Position'}
                        </h3>
                        <p className="text-slate-900">{person.position}</p>
                      </div>
                      
                      {person.department && (
                        <div>
                          <h3 className="text-sm font-medium text-slate-500 mb-1">Department</h3>
                          <p className="text-slate-900">{person.department}</p>
                        </div>
                      )}
                      
                      <div>
                        <h3 className="text-sm font-medium text-slate-500 mb-1">Email</h3>
                        <p className="text-slate-900">{person.email}</p>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Link href={person.type === 'employee' ? `/employees/${person.id}` : `/applicants/${person.id}`}>
                        <Button variant="outline" size="sm" className="w-full">
                          <i className="fa-solid fa-user mr-2"></i>
                          View {person.type === 'employee' ? 'Employee' : 'Applicant'} Profile
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
              <i className="fa-solid fa-file-circle-question text-3xl text-slate-400"></i>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Document Not Found</h2>
            <p className="text-slate-500 mb-6">The document you're looking for doesn't exist or has been deleted.</p>
            <Link href="/documents">
              <Button>Back to Documents</Button>
            </Link>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default DocumentView;
