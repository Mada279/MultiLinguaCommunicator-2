import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { Document, DocumentType, Person } from '@shared/schema';
import { formatDate } from '@/lib/i18n';
import { cn } from '@/lib/utils';
import { 
  getDocumentStatusColor, 
  getDocumentStatusIcon, 
  getFileIconByMimeType, 
  getFileIconColorByMimeType 
} from '@/lib/utils';
import { 
  getDocumentThumbnailUrl, 
  getDocumentFullName, 
  getFileExtension 
} from '@/lib/documentUtils';

interface DocumentCardProps {
  document: Document;
  documentType?: DocumentType;
  person?: Person;
  onView?: (document: Document) => void;
  onDownload?: (document: Document) => void;
  onEdit?: (document: Document) => void;
  onDelete?: (document: Document) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  documentType,
  person,
  onView,
  onDownload,
  onEdit,
  onDelete
}) => {
  const { t, language } = useI18n();
  
  const documentName = getDocumentFullName(document, documentType, person, language);
  const thumbnailUrl = getDocumentThumbnailUrl(document);
  const statusClass = getDocumentStatusColor(document.status);
  const statusIconClass = getDocumentStatusIcon(document.status);
  const fileIconClass = getFileIconByMimeType(document.mimeType);
  const fileIconColor = getFileIconColorByMimeType(document.mimeType);
  const fileExtension = getFileExtension(document.mimeType);
  
  const getStatusLabel = () => {
    switch (document.status) {
      case 'valid':
        return t('validStatus');
      case 'expiring_soon':
        return t('expiringSoonStatus');
      case 'expired':
        return t('expiredStatus');
      default:
        return document.status;
    }
  };
  
  const formatExpiryDate = () => {
    if (!document.expiryDate) return '';
    
    const date = formatDate(document.expiryDate, language as any);
    
    if (document.status === 'expired') {
      return t('expiredOn', { date });
    }
    
    return t('expiresOn', { date });
  };
  
  const uploadDateFormatted = formatDate(document.uploadedAt, language as any);
  
  return (
    <div className="document-card bg-white rounded-lg shadow border border-slate-200 overflow-hidden transition-all hover:translate-y-[-2px] hover:shadow-lg">
      <div className="relative h-36 bg-slate-100 overflow-hidden">
        <img 
          src={thumbnailUrl} 
          alt={documentName} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 rtl:left-2 rtl:right-auto">
          <span className={cn("inline-flex items-center px-2 py-1 rounded text-xs font-medium", statusClass)}>
            {getStatusLabel()}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-sm font-medium text-slate-900 mb-1">
          {documentName}
        </h3>
        
        <p className="text-xs text-slate-500 mb-3">
          {t('uploadedOn', { date: uploadDateFormatted })}
        </p>
        
        <div className="flex items-center mb-3">
          <i className={cn("fa-solid text-xs ltr:mr-1 rtl:ml-1", statusIconClass)}></i>
          <span className={cn("text-xs", document.status === 'valid' ? 'text-slate-500' : document.status === 'expiring_soon' ? 'text-warning' : 'text-danger')}>
            {formatExpiryDate()}
          </span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center text-xs text-slate-500">
            <i className={cn("fa-solid ltr:mr-1 rtl:ml-1", fileIconClass, fileIconColor)}></i> {fileExtension}
          </span>
          
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {onView && (
              <button 
                className="p-1 text-slate-400 hover:text-primary-600"
                onClick={() => onView(document)}
                title={t('view')}
              >
                <i className="fa-solid fa-eye"></i>
              </button>
            )}
            
            {onDownload && (
              <button 
                className="p-1 text-slate-400 hover:text-primary-600"
                onClick={() => onDownload(document)}
                title={t('download')}
              >
                <i className="fa-solid fa-download"></i>
              </button>
            )}
            
            <button 
              className="p-1 text-slate-400 hover:text-slate-700"
              onClick={() => {
                // Open a dropdown menu with edit and delete options
                // For this demo, we'll just console.log
                console.log('More options:', document.id);
              }}
              title="More options"
            >
              <i className="fa-solid fa-ellipsis-vertical"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
