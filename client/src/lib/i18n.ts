// Translations for the application
export type Language = 'en' | 'ar' | 'hi';

export const translations = {
  en: {
    // Common
    appName: 'Erada HR & Document System',
    loading: 'Loading...',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    download: 'Download',
    upload: 'Upload',
    search: 'Search',
    noResults: 'No results found',
    required: 'This field is required',
    
    // Layout
    mainMenu: 'Main Menu',
    management: 'Management',
    searchDocuments: 'Search documents...',
    
    // Navigation
    dashboard: 'Dashboard',
    employees: 'Employees',
    applicants: 'Applicants',
    allDocuments: 'All Documents',
    reports: 'Reports',
    notifications: 'Notifications',
    settings: 'Settings',
    
    // Dashboard
    documentManagement: 'Document Management',
    documentManagementDesc: 'Organize, track and manage employee and applicant documents',
    expiringDocumentsAlert: 'You have {count} documents expiring in the next 30 days.',
    viewDocuments: 'View documents',
    
    // Stats
    totalDocuments: 'Total Documents',
    validDocuments: 'Valid Documents',
    expiringSoon: 'Expiring Soon',
    expired: 'Expired',
    
    // Tabs
    recentUploads: 'Recent Uploads',
    documentTypes: 'Document Types',
    templates: 'Templates',
    approvals: 'Approvals',
    
    // Upload
    dragAndDrop: 'Drag and drop files here',
    browseFiles: 'or click to browse from your computer',
    supportedFormats: 'Supported formats: PDF, DOCX, JPG, PNG (max 10MB)',
    uploadFiles: 'Upload Files',
    
    // Documents
    recentDocuments: 'Recent Documents',
    sortBy: 'Sort by:',
    dateNewest: 'Date (Newest)',
    valid: 'Valid',
    expiresOn: 'Expires: {date}',
    expiredOn: 'Expired: {date}',
    uploadedOn: 'Uploaded: {date}',
    
    // Document Categories
    documentCategories: 'Document Categories',
    addCategory: 'Add Category',
    viewAllDocuments: 'View all documents',
    
    // Categories
    personalIdentification: 'Personal Identification',
    employment: 'Employment',
    educationalSkills: 'Educational & Skills',
    
    // Document Types
    passport: 'Passport',
    idCard: 'ID Card',
    driversLicense: 'Driver\'s License',
    employmentContract: 'Employment Contract',
    offerLetter: 'Offer Letter',
    nda: 'NDA',
    certificates: 'Certificates',
    transcripts: 'Transcripts',
    trainings: 'Trainings',
    
    // Notifications
    documentReminder: 'Document Reminder',
    passportExpiring: '{name}\'s passport is expiring in {days} days. Request renewal now.',
    
    // Document Status
    validStatus: 'Valid',
    expiringSoonStatus: 'Expiring Soon',
    expiredStatus: 'Expired',
    
    // Errors
    errorFetchingDocuments: 'Error fetching documents',
    errorUploadingDocument: 'Error uploading document',
    errorDeletingDocument: 'Error deleting document',
    
    // Settings
    language: 'Language',
    theme: 'Theme',
    notificationSettings: 'Notifications',
    security: 'Security',
    profile: 'Profile',
    logout: 'Logout',
  },
  
  ar: {
    // Common
    appName: 'نظام إرادة للموارد البشرية والمستندات',
    loading: 'جاري التحميل...',
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    view: 'عرض',
    download: 'تنزيل',
    upload: 'رفع',
    search: 'بحث',
    noResults: 'لم يتم العثور على نتائج',
    required: 'هذا الحقل مطلوب',
    
    // Layout
    mainMenu: 'القائمة الرئيسية',
    management: 'الإدارة',
    searchDocuments: 'البحث في المستندات...',
    
    // Navigation
    dashboard: 'لوحة التحكم',
    employees: 'الموظفين',
    applicants: 'المتقدمين',
    allDocuments: 'جميع المستندات',
    reports: 'التقارير',
    notifications: 'الإشعارات',
    settings: 'الإعدادات',
    
    // Dashboard
    documentManagement: 'إدارة المستندات',
    documentManagementDesc: 'تنظيم وتتبع وإدارة مستندات الموظفين والمتقدمين',
    expiringDocumentsAlert: 'لديك {count} مستندات ستنتهي صلاحيتها في الثلاثين يومًا القادمة.',
    viewDocuments: 'عرض المستندات',
    
    // Stats
    totalDocuments: 'إجمالي المستندات',
    validDocuments: 'مستندات سارية',
    expiringSoon: 'ستنتهي قريبًا',
    expired: 'منتهية الصلاحية',
    
    // Tabs
    recentUploads: 'التحميلات الحديثة',
    documentTypes: 'أنواع المستندات',
    templates: 'القوالب',
    approvals: 'الموافقات',
    
    // Upload
    dragAndDrop: 'اسحب وأفلت الملفات هنا',
    browseFiles: 'أو انقر للتصفح من جهاز الكمبيوتر الخاص بك',
    supportedFormats: 'الصيغ المدعومة: PDF، DOCX، JPG، PNG (بحد أقصى 10 ميجابايت)',
    uploadFiles: 'تحميل الملفات',
    
    // Documents
    recentDocuments: 'المستندات الحديثة',
    sortBy: 'ترتيب حسب:',
    dateNewest: 'التاريخ (الأحدث)',
    valid: 'ساري',
    expiresOn: 'تنتهي الصلاحية: {date}',
    expiredOn: 'انتهت الصلاحية: {date}',
    uploadedOn: 'تم التحميل: {date}',
    
    // Document Categories
    documentCategories: 'فئات المستندات',
    addCategory: 'إضافة فئة',
    viewAllDocuments: 'عرض جميع المستندات',
    
    // Categories
    personalIdentification: 'الهوية الشخصية',
    employment: 'التوظيف',
    educationalSkills: 'التعليم والمهارات',
    
    // Document Types
    passport: 'جواز السفر',
    idCard: 'بطاقة الهوية',
    driversLicense: 'رخصة القيادة',
    employmentContract: 'عقد العمل',
    offerLetter: 'خطاب العرض',
    nda: 'اتفاقية السرية',
    certificates: 'الشهادات',
    transcripts: 'كشوف الدرجات',
    trainings: 'التدريبات',
    
    // Notifications
    documentReminder: 'تذكير بالمستند',
    passportExpiring: 'جواز سفر {name} سينتهي خلال {days} يومًا. اطلب التجديد الآن.',
    
    // Document Status
    validStatus: 'ساري',
    expiringSoonStatus: 'ستنتهي قريبًا',
    expiredStatus: 'منتهي الصلاحية',
    
    // Errors
    errorFetchingDocuments: 'خطأ في جلب المستندات',
    errorUploadingDocument: 'خطأ في رفع المستند',
    errorDeletingDocument: 'خطأ في حذف المستند',
    
    // Settings
    language: 'اللغة',
    theme: 'الثيم',
    notificationSettings: 'الإشعارات',
    security: 'الأمان',
    profile: 'الملف الشخصي',
    logout: 'تسجيل الخروج',
  },
  
  hi: {
    // Common
    appName: 'एराडा एचआर और दस्तावेज प्रणाली',
    loading: 'लोड हो रहा है...',
    save: 'सहेजें',
    cancel: 'रद्द करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    view: 'देखें',
    download: 'डाउनलोड करें',
    upload: 'अपलोड',
    search: 'खोज',
    noResults: 'कोई परिणाम नहीं मिला',
    required: 'यह फ़ील्ड आवश्यक है',
    
    // Layout
    mainMenu: 'मुख्य मेनू',
    management: 'प्रबंधन',
    searchDocuments: 'दस्तावेज़ खोजें...',
    
    // Navigation
    dashboard: 'डैशबोर्ड',
    employees: 'कर्मचारी',
    applicants: 'आवेदक',
    allDocuments: 'सभी दस्तावेज़',
    reports: 'रिपोर्ट',
    notifications: 'सूचनाएँ',
    settings: 'सेटिंग्स',
    
    // Dashboard
    documentManagement: 'दस्तावेज़ प्रबंधन',
    documentManagementDesc: 'कर्मचारियों और आवेदकों के दस्तावेज़ों को व्यवस्थित, ट्रैक और प्रबंधित करें',
    expiringDocumentsAlert: 'आपके पास {count} दस्तावेज़ हैं जो अगले 30 दिनों में समाप्त हो रहे हैं।',
    viewDocuments: 'दस्तावेज़ देखें',
    
    // Stats
    totalDocuments: 'कुल दस्तावेज़',
    validDocuments: 'वैध दस्तावेज़',
    expiringSoon: 'जल्द समाप्त होने वाले',
    expired: 'समाप्त',
    
    // Tabs
    recentUploads: 'हाल के अपलोड',
    documentTypes: 'दस्तावेज़ प्रकार',
    templates: 'टेम्पलेट',
    approvals: 'स्वीकृतियां',
    
    // Upload
    dragAndDrop: 'फ़ाइलों को यहां खींचें और छोड़ें',
    browseFiles: 'या अपने कंप्यूटर से ब्राउज़ करने के लिए क्लिक करें',
    supportedFormats: 'समर्थित प्रारूप: PDF, DOCX, JPG, PNG (अधिकतम 10MB)',
    uploadFiles: 'फ़ाइलें अपलोड करें',
    
    // Documents
    recentDocuments: 'हाल के दस्तावेज़',
    sortBy: 'क्रमबद्ध करें:',
    dateNewest: 'तिथि (नवीनतम)',
    valid: 'वैध',
    expiresOn: 'समाप्ति: {date}',
    expiredOn: 'समाप्त: {date}',
    uploadedOn: 'अपलोड किया गया: {date}',
    
    // Document Categories
    documentCategories: 'दस्तावेज़ श्रेणियां',
    addCategory: 'श्रेणी जोड़ें',
    viewAllDocuments: 'सभी दस्तावेज़ देखें',
    
    // Categories
    personalIdentification: 'व्यक्तिगत पहचान',
    employment: 'रोज़गार',
    educationalSkills: 'शैक्षिक और कौशल',
    
    // Document Types
    passport: 'पासपोर्ट',
    idCard: 'पहचान पत्र',
    driversLicense: 'ड्राइविंग लाइसेंस',
    employmentContract: 'रोज़गार अनुबंध',
    offerLetter: 'ऑफर लेटर',
    nda: 'गोपनीयता समझौता',
    certificates: 'प्रमाणपत्र',
    transcripts: 'अंक-तालिका',
    trainings: 'प्रशिक्षण',
    
    // Notifications
    documentReminder: 'दस्तावेज़ रिमाइंडर',
    passportExpiring: '{name} का पासपोर्ट {days} दिनों में समाप्त हो रहा है। अभी नवीनीकरण का अनुरोध करें।',
    
    // Document Status
    validStatus: 'वैध',
    expiringSoonStatus: 'जल्द समाप्त होने वाला',
    expiredStatus: 'समाप्त',
    
    // Errors
    errorFetchingDocuments: 'दस्तावेज़ प्राप्त करने में त्रुटि',
    errorUploadingDocument: 'दस्तावेज़ अपलोड करने में त्रुटि',
    errorDeletingDocument: 'दस्तावेज़ हटाने में त्रुटि',
    
    // Settings
    language: 'भाषा',
    theme: 'थीम',
    notificationSettings: 'सूचनाएँ',
    security: 'सुरक्षा',
    profile: 'प्रोफ़ाइल',
    logout: 'लॉग आउट',
  }
};

export const getTranslation = (key: string, language: Language, params?: Record<string, string | number>): string => {
  const keys = key.split('.');
  let current: any = translations[language];
  
  for (const k of keys) {
    if (current[k] === undefined) {
      console.warn(`Translation key not found: ${key} for language ${language}`);
      return key;
    }
    current = current[k];
  }
  
  if (typeof current !== 'string') {
    console.warn(`Translation key is not a string: ${key} for language ${language}`);
    return key;
  }
  
  if (params) {
    return Object.entries(params).reduce((result, [param, value]) => {
      return result.replace(`{${param}}`, String(value));
    }, current);
  }
  
  return current;
};

export const formatDate = (date: Date | string | undefined, language: Language): string => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  switch (language) {
    case 'ar':
      return new Intl.DateTimeFormat('ar-SA', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    case 'hi':
      return new Intl.DateTimeFormat('hi-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
    case 'en':
    default:
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
  }
};
