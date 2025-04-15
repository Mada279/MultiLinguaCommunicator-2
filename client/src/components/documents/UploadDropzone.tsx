import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useI18n } from '@/context/I18nContext';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface UploadDropzoneProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  maxSize?: number; // In bytes
  acceptedFileTypes?: string[];
}

const UploadDropzone: React.FC<UploadDropzoneProps> = ({
  onUpload,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024, // 10MB by default
  acceptedFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'],
}) => {
  const { t } = useI18n();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Handle the dropped files
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles,
    maxSize,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: (fileRejections) => {
      setIsDragging(false);
      
      // Show error toast for rejected files
      fileRejections.forEach(({ file, errors }) => {
        errors.forEach(error => {
          let errorMessage = '';
          
          if (error.code === 'file-too-large') {
            errorMessage = `File ${file.name} is too large. Max size is ${maxSize / 1024 / 1024}MB.`;
          } else if (error.code === 'file-invalid-type') {
            errorMessage = `File ${file.name} has an invalid type. Accepted types: PDF, DOCX, JPG, PNG.`;
          } else {
            errorMessage = error.message;
          }
          
          toast({
            title: 'Upload Error',
            description: errorMessage,
            variant: 'destructive',
          });
        });
      });
    }
  });

  return (
    <div className="mb-6">
      <div 
        {...getRootProps()} 
        className={cn(
          "dropzone flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 p-6 bg-white transition-all",
          (isDragActive || isDragging) && "border-primary-500 bg-primary-50"
        )}
      >
        <input {...getInputProps()} />
        <i className="fa-solid fa-cloud-arrow-up text-4xl text-slate-400 mb-3"></i>
        <p className="mb-2 text-lg font-medium text-slate-700">
          {t('dragAndDrop')}
        </p>
        <p className="mb-4 text-sm text-slate-500">
          {t('browseFiles')}
        </p>
        <p className="text-xs text-slate-500">
          {t('supportedFormats')}
        </p>
        <Button type="button" className="mt-4">
          {t('uploadFiles')}
        </Button>
      </div>
    </div>
  );
};

export default UploadDropzone;
