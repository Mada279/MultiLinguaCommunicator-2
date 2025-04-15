import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

export function getFileIconByMimeType(mimeType: string): string {
  if (mimeType.includes('pdf')) {
    return 'fa-file-pdf';
  } else if (mimeType.includes('image')) {
    return 'fa-file-image';
  } else if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'fa-file-word';
  } else if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
    return 'fa-file-excel'; 
  } else if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) {
    return 'fa-file-powerpoint';
  } else {
    return 'fa-file';
  }
}

export function getFileIconColorByMimeType(mimeType: string): string {
  if (mimeType.includes('pdf')) {
    return 'text-red-500';
  } else if (mimeType.includes('image')) {
    return 'text-blue-500';
  } else if (mimeType.includes('word') || mimeType.includes('document')) {
    return 'text-blue-700';
  } else if (mimeType.includes('excel') || mimeType.includes('spreadsheet')) {
    return 'text-green-600';
  } else if (mimeType.includes('powerpoint') || mimeType.includes('presentation')) {
    return 'text-orange-500';
  } else {
    return 'text-gray-500';
  }
}

export function getDocumentStatusColor(status: string): string {
  switch (status) {
    case 'valid':
      return 'bg-success text-white';
    case 'expiring_soon':
      return 'bg-warning text-white';
    case 'expired':
      return 'bg-danger text-white';
    default:
      return 'bg-slate-100 text-slate-700';
  }
}

export function getDocumentStatusIcon(status: string): string {
  switch (status) {
    case 'valid':
      return 'fa-calendar-check text-slate-400';
    case 'expiring_soon':
      return 'fa-calendar-xmark text-warning';
    case 'expired':
      return 'fa-calendar-xmark text-danger';
    default:
      return 'fa-calendar text-slate-400';
  }
}

export function getCategoryColor(color: string): string {
  switch (color) {
    case 'primary':
      return 'bg-primary-100 text-primary-600';
    case 'success':
      return 'bg-emerald-100 text-emerald-600';
    case 'warning':
      return 'bg-amber-100 text-amber-600';
    case 'danger':
      return 'bg-red-100 text-red-600';
    default:
      return 'bg-slate-100 text-slate-600';
  }
}

export function isDocumentExpiringSoon(expiryDate: Date | null | undefined): boolean {
  if (!expiryDate) return false;
  
  const expiry = new Date(expiryDate);
  const today = new Date();
  
  // Calculate the difference in days
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  // If document expires within 30 days
  return diffDays > 0 && diffDays <= 30;
}

export function isDocumentExpired(expiryDate: Date | null | undefined): boolean {
  if (!expiryDate) return false;
  
  const expiry = new Date(expiryDate);
  const today = new Date();
  
  return expiry < today;
}

export function getDocumentStatus(expiryDate: Date | null | undefined): string {
  if (!expiryDate) return 'valid';
  
  if (isDocumentExpired(expiryDate)) {
    return 'expired';
  } else if (isDocumentExpiringSoon(expiryDate)) {
    return 'expiring_soon';
  } else {
    return 'valid';
  }
}

export function calculateExpiryDays(expiryDate: Date | null | undefined): number {
  if (!expiryDate) return 0;
  
  const expiry = new Date(expiryDate);
  const today = new Date();
  
  // Calculate the difference in days
  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  return diffDays > 0 ? diffDays : 0;
}
