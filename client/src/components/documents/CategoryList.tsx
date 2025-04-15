import React from 'react';
import { useI18n } from '@/context/I18nContext';
import { DocumentCategory, DocumentType, Document } from '@shared/schema';
import { Link } from 'wouter';
import { getCategoryColor } from '@/lib/utils';
import { getCategoryIconClass, getDocumentCountByType } from '@/lib/documentUtils';

interface CategoryListProps {
  category: DocumentCategory;
  documentTypes: DocumentType[];
  documents: Document[];
}

const CategoryList: React.FC<CategoryListProps> = ({ category, documentTypes, documents }) => {
  const { t, language } = useI18n();
  
  const categoryName = 
    language === 'ar' ? category.nameAr : 
    language === 'hi' ? category.nameHi : 
    category.nameEn;
  
  const filteredTypes = documentTypes.filter(type => type.categoryId === category.id);
  
  const getTypeName = (type: DocumentType) => {
    return language === 'ar' ? type.nameAr : 
           language === 'hi' ? type.nameHi : 
           type.nameEn;
  };
  
  const iconClass = getCategoryIconClass(category);
  const colorClass = getCategoryColor(category.color);
  
  return (
    <div className="bg-white rounded-lg shadow border border-slate-200 p-4">
      <div className="flex items-center mb-4">
        <div className={`p-2 rounded-md ${colorClass}`}>
          <i className={iconClass}></i>
        </div>
        <h3 className="ml-3 rtl:mr-3 rtl:ml-0 text-sm font-medium text-slate-900">
          {categoryName}
        </h3>
      </div>
      
      <ul className="space-y-2 mb-3">
        {filteredTypes.slice(0, 3).map(type => (
          <li key={type.id} className="flex items-center justify-between text-sm">
            <span>{getTypeName(type)}</span>
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
              {getDocumentCountByType(documents, type.id)}
            </span>
          </li>
        ))}
      </ul>
      
      <Link href={`/documents?category=${category.id}`}>
        <a className="text-xs text-mint-green hover:text-mint-green/90 font-medium">
          {t('viewAllDocuments')}
        </a>
      </Link>
    </div>
  );
};

export default CategoryList;
