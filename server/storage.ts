import { 
  users, type User, type InsertUser,
  documentCategories, type DocumentCategory, type InsertDocumentCategory,
  documentTypes, type DocumentType, type InsertDocumentType,
  documents, type Document, type InsertDocument,
  persons, type Person, type InsertPerson,
  notifications, type Notification, type InsertNotification
} from "@shared/schema";

// Storage interface
export interface IStorage {
  // User management
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;

  // Document categories
  getDocumentCategories(): Promise<DocumentCategory[]>;
  getDocumentCategory(id: number): Promise<DocumentCategory | undefined>;
  createDocumentCategory(category: InsertDocumentCategory): Promise<DocumentCategory>;
  updateDocumentCategory(id: number, category: Partial<InsertDocumentCategory>): Promise<DocumentCategory | undefined>;
  deleteDocumentCategory(id: number): Promise<boolean>;

  // Document types
  getDocumentTypes(): Promise<DocumentType[]>;
  getDocumentTypesByCategory(categoryId: number): Promise<DocumentType[]>;
  getDocumentType(id: number): Promise<DocumentType | undefined>;
  createDocumentType(type: InsertDocumentType): Promise<DocumentType>;
  updateDocumentType(id: number, type: Partial<InsertDocumentType>): Promise<DocumentType | undefined>;
  deleteDocumentType(id: number): Promise<boolean>;

  // Documents
  getDocuments(): Promise<Document[]>;
  getDocument(id: number): Promise<Document | undefined>;
  getDocumentsByUser(userId: number): Promise<Document[]>;
  getDocumentsByType(typeId: number): Promise<Document[]>;
  getDocumentsByStatus(status: string): Promise<Document[]>;
  createDocument(document: InsertDocument): Promise<Document>;
  updateDocument(id: number, document: Partial<InsertDocument>): Promise<Document | undefined>;
  deleteDocument(id: number): Promise<boolean>;

  // Persons (employees/applicants)
  getPersons(): Promise<Person[]>;
  getPersonsByType(type: string): Promise<Person[]>;
  getPerson(id: number): Promise<Person | undefined>;
  createPerson(person: InsertPerson): Promise<Person>;
  updatePerson(id: number, person: Partial<InsertPerson>): Promise<Person | undefined>;
  deletePerson(id: number): Promise<boolean>;

  // Notifications
  getNotifications(): Promise<Notification[]>;
  getNotificationsByUser(userId: number): Promise<Notification[]>;
  getNotification(id: number): Promise<Notification | undefined>;
  createNotification(notification: InsertNotification): Promise<Notification>;
  updateNotification(id: number, notification: Partial<InsertNotification>): Promise<Notification | undefined>;
  deleteNotification(id: number): Promise<boolean>;
  markNotificationAsRead(id: number): Promise<Notification | undefined>;
}

// In-memory storage implementation
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private documentCategories: Map<number, DocumentCategory>;
  private documentTypes: Map<number, DocumentType>;
  private documents: Map<number, Document>;
  private persons: Map<number, Person>;
  private notifications: Map<number, Notification>;

  private currentUserId: number;
  private currentDocumentCategoryId: number;
  private currentDocumentTypeId: number;
  private currentDocumentId: number;
  private currentPersonId: number;
  private currentNotificationId: number;

  constructor() {
    this.users = new Map();
    this.documentCategories = new Map();
    this.documentTypes = new Map();
    this.documents = new Map();
    this.persons = new Map();
    this.notifications = new Map();

    this.currentUserId = 1;
    this.currentDocumentCategoryId = 1;
    this.currentDocumentTypeId = 1;
    this.currentDocumentId = 1;
    this.currentPersonId = 1;
    this.currentNotificationId = 1;

    // Initialize with some sample data
    this.initSampleData();
  }

  private async initSampleData() {
    const { promises: fs } = await import('node:fs');
    
    // Create a default admin user
    const adminUser: InsertUser = {
      username: "admin",
      password: "admin123",
      fullName: "Admin User",
      email: "admin@example.com",
      role: "admin",
      department: "HR",
      avatar: ""
    };
    this.createUser(adminUser);

    // Create sample document categories
    const categories = [
      {
        nameEn: "Personal Identification",
        nameAr: "الهوية الشخصية",
        nameHi: "व्यक्तिगत पहचान",
        icon: "fa-id-card",
        color: "primary"
      },
      {
        nameEn: "Employment",
        nameAr: "التوظيف",
        nameHi: "रोज़गार",
        icon: "fa-file-contract",
        color: "success"
      },
      {
        nameEn: "Educational & Skills",
        nameAr: "التعليم والمهارات",
        nameHi: "शैक्षिक और कौशल",
        icon: "fa-graduation-cap",
        color: "warning"
      }
    ];

    categories.forEach(category => this.createDocumentCategory(category as InsertDocumentCategory));

    // Create sample document types
    const types = [
      {
        categoryId: 1,
        nameEn: "Passport",
        nameAr: "جواز السفر",
        nameHi: "पासपोर्ट",
        requiresExpiry: true,
        requiredForEmployees: true,
        requiredForApplicants: true
      },
      {
        categoryId: 1,
        nameEn: "ID Card",
        nameAr: "بطاقة الهوية",
        nameHi: "पहचान पत्र",
        requiresExpiry: true,
        requiredForEmployees: true,
        requiredForApplicants: false
      },
      {
        categoryId: 1,
        nameEn: "Driver's License",
        nameAr: "رخصة القيادة",
        nameHi: "ड्राइविंग लाइसेंस",
        requiresExpiry: true,
        requiredForEmployees: false,
        requiredForApplicants: false
      },
      {
        categoryId: 2,
        nameEn: "Employment Contract",
        nameAr: "عقد العمل",
        nameHi: "रोज़गार अनुबंध",
        requiresExpiry: true,
        requiredForEmployees: true,
        requiredForApplicants: false
      },
      {
        categoryId: 2,
        nameEn: "Offer Letter",
        nameAr: "خطاب العرض",
        nameHi: "ऑफर लेटर",
        requiresExpiry: false,
        requiredForEmployees: false,
        requiredForApplicants: true
      },
      {
        categoryId: 2,
        nameEn: "NDA",
        nameAr: "اتفاقية السرية",
        nameHi: "गोपनीयता समझौता",
        requiresExpiry: false,
        requiredForEmployees: true,
        requiredForApplicants: true
      },
      {
        categoryId: 3,
        nameEn: "Certificates",
        nameAr: "الشهادات",
        nameHi: "प्रमाणपत्र",
        requiresExpiry: false,
        requiredForEmployees: true,
        requiredForApplicants: true
      },
      {
        categoryId: 3,
        nameEn: "Transcripts",
        nameAr: "كشوف الدرجات",
        nameHi: "अंक-तालिका",
        requiresExpiry: false,
        requiredForEmployees: false,
        requiredForApplicants: true
      },
      {
        categoryId: 3,
        nameEn: "Trainings",
        nameAr: "التدريبات",
        nameHi: "प्रशिक्षण",
        requiresExpiry: true,
        requiredForEmployees: true,
        requiredForApplicants: false
      }
    ];

    types.forEach(type => this.createDocumentType(type as InsertDocumentType));

    // Create sample employees/applicants
    const samplePersons = [
      {
        type: "employee",
        firstName: "Ahmed",
        lastName: "Hassan",
        email: "ahmed.hassan@example.com",
        phone: "+971501234567",
        nationality: "Egyptian",
        department: "HR",
        position: "HR Manager",
        status: "active"
      },
      {
        type: "employee",
        firstName: "Sarah",
        lastName: "Khan",
        email: "sarah.khan@example.com",
        phone: "+971502345678",
        nationality: "Pakistani",
        department: "Finance",
        position: "Accountant",
        status: "active"
      },
      {
        type: "employee",
        firstName: "Ravi",
        lastName: "Kumar",
        email: "ravi.kumar@example.com",
        phone: "+971503456789",
        nationality: "Indian",
        department: "IT",
        position: "Software Developer",
        status: "active"
      },
      {
        type: "applicant",
        firstName: "John",
        lastName: "Smith",
        email: "john.smith@example.com",
        phone: "+971504567890",
        nationality: "British",
        position: "Marketing Manager",
        status: "pending"
      }
    ];

    samplePersons.forEach(person => this.createPerson(person as InsertPerson));

    // Create sample documents
    const currentDate = new Date();
    const futureDate = new Date();
    futureDate.setFullYear(currentDate.getFullYear() + 1);

    const expiredDate = new Date();
    expiredDate.setMonth(currentDate.getMonth() - 1);

    const expiringSoonDate = new Date();
    expiringSoonDate.setDate(currentDate.getDate() + 25);

    const sampleDocuments = [
      {
        userId: 1,
        typeId: 4,
        filename: "employee_contract_ahmed_hassan.pdf",
        originalFilename: "Employee Contract - Ahmed Hassan.pdf",
        fileSize: 1024000,
        mimeType: "application/pdf",
        path: "/uploads/employee_contract_ahmed_hassan.pdf",
        status: "valid",
        uploadedBy: 1,
        uploadedAt: currentDate,
        expiryDate: futureDate
      },
      {
        userId: 2,
        typeId: 1,
        filename: "passport_sarah_khan.jpg",
        originalFilename: "Passport Copy - Sarah Khan.jpg",
        fileSize: 2048000,
        mimeType: "image/jpeg",
        path: "/uploads/passport_sarah_khan.jpg",
        status: "expiring_soon",
        uploadedBy: 1,
        uploadedAt: currentDate,
        expiryDate: expiringSoonDate
      },
      {
        userId: 3,
        typeId: 7,
        filename: "medical_certificate_ravi_kumar.docx",
        originalFilename: "Medical Certificate - Ravi Kumar.docx",
        fileSize: 512000,
        mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        path: "/uploads/medical_certificate_ravi_kumar.docx",
        status: "valid",
        uploadedBy: 1,
        uploadedAt: currentDate,
        expiryDate: new Date(futureDate.getTime() + 365 * 24 * 60 * 60 * 1000)
      },
      {
        userId: 4,
        typeId: 1,
        filename: "visa_john_smith.pdf",
        originalFilename: "Visa Copy - John Smith.pdf",
        fileSize: 1024000,
        mimeType: "application/pdf",
        path: "/uploads/visa_john_smith.pdf",
        status: "expired",
        uploadedBy: 1,
        uploadedAt: currentDate,
        expiryDate: expiredDate
      }
    ];

    sampleDocuments.forEach(doc => this.createDocument(doc as InsertDocument));

    // Create sample notifications
    const sampleNotifications = [
      {
        userId: 1,
        documentId: 2,
        title: "Document Reminder",
        message: "Sarah Khan's passport is expiring in 15 days. Request renewal now.",
        read: false,
        createdAt: currentDate
      }
    ];

    sampleNotifications.forEach(notification => this.createNotification(notification as InsertNotification));

    // Ensure uploads directory exists
    const uploadDir = './uploads';
    try {
      await fs.mkdir(uploadDir, { recursive: true });
    } catch (error) {
      console.error('Error creating uploads directory:', error);
    }
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const now = new Date();
    const user: User = { ...insertUser, id, createdAt: now };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined> {
    const existingUser = this.users.get(id);
    if (!existingUser) return undefined;

    const updatedUser = { ...existingUser, ...user };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Document category methods
  async getDocumentCategories(): Promise<DocumentCategory[]> {
    return Array.from(this.documentCategories.values());
  }

  async getDocumentCategory(id: number): Promise<DocumentCategory | undefined> {
    return this.documentCategories.get(id);
  }

  async createDocumentCategory(category: InsertDocumentCategory): Promise<DocumentCategory> {
    const id = this.currentDocumentCategoryId++;
    const now = new Date();
    const newCategory: DocumentCategory = { ...category, id, createdAt: now };
    this.documentCategories.set(id, newCategory);
    return newCategory;
  }

  async updateDocumentCategory(id: number, category: Partial<InsertDocumentCategory>): Promise<DocumentCategory | undefined> {
    const existingCategory = this.documentCategories.get(id);
    if (!existingCategory) return undefined;

    const updatedCategory = { ...existingCategory, ...category };
    this.documentCategories.set(id, updatedCategory);
    return updatedCategory;
  }

  async deleteDocumentCategory(id: number): Promise<boolean> {
    return this.documentCategories.delete(id);
  }

  // Document type methods
  async getDocumentTypes(): Promise<DocumentType[]> {
    return Array.from(this.documentTypes.values());
  }

  async getDocumentTypesByCategory(categoryId: number): Promise<DocumentType[]> {
    return Array.from(this.documentTypes.values())
      .filter(type => type.categoryId === categoryId);
  }

  async getDocumentType(id: number): Promise<DocumentType | undefined> {
    return this.documentTypes.get(id);
  }

  async createDocumentType(type: InsertDocumentType): Promise<DocumentType> {
    const id = this.currentDocumentTypeId++;
    const now = new Date();
    const newType: DocumentType = { ...type, id, createdAt: now };
    this.documentTypes.set(id, newType);
    return newType;
  }

  async updateDocumentType(id: number, type: Partial<InsertDocumentType>): Promise<DocumentType | undefined> {
    const existingType = this.documentTypes.get(id);
    if (!existingType) return undefined;

    const updatedType = { ...existingType, ...type };
    this.documentTypes.set(id, updatedType);
    return updatedType;
  }

  async deleteDocumentType(id: number): Promise<boolean> {
    return this.documentTypes.delete(id);
  }

  // Document methods
  async getDocuments(): Promise<Document[]> {
    return Array.from(this.documents.values());
  }

  async getDocument(id: number): Promise<Document | undefined> {
    return this.documents.get(id);
  }

  async getDocumentsByUser(userId: number): Promise<Document[]> {
    return Array.from(this.documents.values())
      .filter(doc => doc.userId === userId);
  }

  async getDocumentsByType(typeId: number): Promise<Document[]> {
    return Array.from(this.documents.values())
      .filter(doc => doc.typeId === typeId);
  }

  async getDocumentsByStatus(status: string): Promise<Document[]> {
    return Array.from(this.documents.values())
      .filter(doc => doc.status === status);
  }

  async createDocument(document: InsertDocument): Promise<Document> {
    const id = this.currentDocumentId++;
    const now = document.uploadedAt || new Date();
    const newDocument: Document = { ...document, id, uploadedAt: now };
    this.documents.set(id, newDocument);
    return newDocument;
  }

  async updateDocument(id: number, document: Partial<InsertDocument>): Promise<Document | undefined> {
    const existingDocument = this.documents.get(id);
    if (!existingDocument) return undefined;

    const updatedDocument = { ...existingDocument, ...document };
    this.documents.set(id, updatedDocument);
    return updatedDocument;
  }

  async deleteDocument(id: number): Promise<boolean> {
    return this.documents.delete(id);
  }

  // Person methods
  async getPersons(): Promise<Person[]> {
    return Array.from(this.persons.values());
  }

  async getPersonsByType(type: string): Promise<Person[]> {
    return Array.from(this.persons.values())
      .filter(person => person.type === type);
  }

  async getPerson(id: number): Promise<Person | undefined> {
    return this.persons.get(id);
  }

  async createPerson(person: InsertPerson): Promise<Person> {
    const id = this.currentPersonId++;
    const now = new Date();
    const newPerson: Person = { ...person, id, createdAt: now };
    this.persons.set(id, newPerson);
    return newPerson;
  }

  async updatePerson(id: number, person: Partial<InsertPerson>): Promise<Person | undefined> {
    const existingPerson = this.persons.get(id);
    if (!existingPerson) return undefined;

    const updatedPerson = { ...existingPerson, ...person };
    this.persons.set(id, updatedPerson);
    return updatedPerson;
  }

  async deletePerson(id: number): Promise<boolean> {
    return this.persons.delete(id);
  }

  // Notification methods
  async getNotifications(): Promise<Notification[]> {
    return Array.from(this.notifications.values());
  }

  async getNotificationsByUser(userId: number): Promise<Notification[]> {
    return Array.from(this.notifications.values())
      .filter(notification => notification.userId === userId);
  }

  async getNotification(id: number): Promise<Notification | undefined> {
    return this.notifications.get(id);
  }

  async createNotification(notification: InsertNotification): Promise<Notification> {
    const id = this.currentNotificationId++;
    const now = notification.createdAt || new Date();
    const newNotification: Notification = { ...notification, id, createdAt: now };
    this.notifications.set(id, newNotification);
    return newNotification;
  }

  async updateNotification(id: number, notification: Partial<InsertNotification>): Promise<Notification | undefined> {
    const existingNotification = this.notifications.get(id);
    if (!existingNotification) return undefined;

    const updatedNotification = { ...existingNotification, ...notification };
    this.notifications.set(id, updatedNotification);
    return updatedNotification;
  }

  async deleteNotification(id: number): Promise<boolean> {
    return this.notifications.delete(id);
  }

  async markNotificationAsRead(id: number): Promise<Notification | undefined> {
    const notification = this.notifications.get(id);
    if (!notification) return undefined;

    notification.read = true;
    this.notifications.set(id, notification);
    return notification;
  }
}

export const storage = new MemStorage();