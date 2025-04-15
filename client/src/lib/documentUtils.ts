import { Document, DocumentCategory, DocumentType, Person } from '@shared/schema';
import { formatDate } from './i18n';

// Get document file extension from mimetype
export function getFileExtension(mimeType: string): string {
  switch (mimeType) {
    case 'application/pdf':
      return 'PDF';
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return 'DOCX';
    case 'image/jpeg':
    case 'image/jpg':
      return 'JPG';
    case 'image/png':
      return 'PNG';
    default:
      return 'FILE';
  }
}

// Generate a placeholder thumbnail for a document
export function getDocumentThumbnailUrl(document: Document): string {
  // In a real application, we would generate thumbnails for documents
  // For this example, we'll use placeholder images based on the mimetype
  if (document.mimeType.includes('image')) {
    return document.path;
  }
  
  return `https://images.unsplash.com/photo-1568122506084-57d12d22b780?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&h=200&q=80`;
}

// Get person's full name
export function getPersonFullName(person: Person): string {
  return `${person.firstName} ${person.lastName}`;
}

// Get document name with person's name
export function getDocumentFullName(
  document: Document, 
  documentType: DocumentType | undefined,
  person: Person | undefined,
  language: string
): string {
  if (!documentType || !person) {
    return document.originalFilename;
  }
  
  const typeName = 
    language === 'ar' ? documentType.nameAr : 
    language === 'hi' ? documentType.nameHi : 
    documentType.nameEn;
  
  const personName = getPersonFullName(person);
  
  return `${typeName} - ${personName}`;
}

// Generate document stats
export interface DocumentStats {
  total: number;
  valid: number;
  expiringSoon: number;
  expired: number;
}

export function generateDocumentStats(documents: Document[]): DocumentStats {
  const stats: DocumentStats = {
    total: documents.length,
    valid: 0,
    expiringSoon: 0,
    expired: 0
  };
  
  documents.forEach(doc => {
    switch (doc.status) {
      case 'valid':
        stats.valid++;
        break;
      case 'expiring_soon':
        stats.expiringSoon++;
        break;
      case 'expired':
        stats.expired++;
        break;
    }
  });
  
  return stats;
}

// Format expiry date with status
export function formatExpiryDate(document: Document, language: string): string {
  if (!document.expiryDate) return '';
  
  const formattedDate = formatDate(document.expiryDate, language as any);
  
  switch (document.status) {
    case 'valid':
      return `Expires: ${formattedDate}`;
    case 'expiring_soon':
      return `Expires: ${formattedDate}`;
    case 'expired':
      return `Expired: ${formattedDate}`;
    default:
      return `Expires: ${formattedDate}`;
  }
}

// Get document count by category
export function getDocumentCountByCategory(
  documents: Document[],
  documentTypes: DocumentType[],
  categoryId: number
): number {
  // Get all type IDs for this category
  const typeIds = documentTypes
    .filter(type => type.categoryId === categoryId)
    .map(type => type.id);
  
  // Count documents with these type IDs
  return documents.filter(doc => typeIds.includes(doc.typeId)).length;
}

// Get document count by type
export function getDocumentCountByType(
  documents: Document[],
  typeId: number
): number {
  return documents.filter(doc => doc.typeId === typeId).length;
}

// Get category icon class
export function getCategoryIconClass(category: DocumentCategory): string {
  return `fa-solid ${category.icon}`;
}

// For document preview
export function canPreviewInBrowser(mimeType: string): boolean {
  return mimeType.includes('image') || mimeType.includes('pdf');
}
