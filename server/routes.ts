import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import multer from "multer";
import path from "path";
import fs from "fs/promises";
import { randomUUID } from "crypto";
import { 
  insertUserSchema, 
  insertDocumentCategorySchema,
  insertDocumentTypeSchema,
  insertDocumentSchema,
  insertPersonSchema,
  insertNotificationSchema
} from "@shared/schema";

// Configure multer for file uploads
const uploadDir = path.join(process.cwd(), "uploads");

// Ensure upload directory exists
const ensureUploadDir = async () => {
  try {
    await fs.mkdir(uploadDir, { recursive: true });
  } catch (error) {
    console.error("Error creating upload directory:", error);
  }
};

ensureUploadDir();

const storage_config = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadDir);
  },
  filename: (_req, file, cb) => {
    const uniqueFilename = `${Date.now()}-${randomUUID()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});

const upload = multer({
  storage: storage_config,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (_req, file, cb) => {
    // Allowed file types
    const allowedMimes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "image/jpeg",
      "image/png",
    ];
    
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOCX, JPG, and PNG files are allowed."));
    }
  },
});

export async function registerRoutes(app: Express): Promise<Server> {
  const httpServer = createServer(app);
  
  // Health check
  app.get("/api/health", (_req: Request, res: Response) => {
    res.json({ status: "ok" });
  });
  
  // User routes
  app.get("/api/users", async (_req: Request, res: Response) => {
    try {
      // For a real application, you would need to implement authentication
      // and authorization to restrict this endpoint to admin users.
      const users = Array.from((await storage.getUsers?.()) || []);
      
      // Remove password fields for security
      const sanitizedUsers = users.map(({ password, ...user }) => user);
      
      res.json(sanitizedUsers);
    } catch (error) {
      res.status(500).json({ message: "Error fetching users" });
    }
  });
  
  app.get("/api/users/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await storage.getUser(id);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Remove password field for security
      const { password, ...sanitizedUser } = user;
      
      res.json(sanitizedUser);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user" });
    }
  });
  
  app.post("/api/users", async (req: Request, res: Response) => {
    try {
      const result = insertUserSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid user data", errors: result.error.errors });
      }
      
      // In a real application, you would hash the password here
      const newUser = await storage.createUser(result.data);
      
      // Remove password field for security
      const { password, ...sanitizedUser } = newUser;
      
      res.status(201).json(sanitizedUser);
    } catch (error) {
      res.status(500).json({ message: "Error creating user" });
    }
  });
  
  // Document Category routes
  app.get("/api/document-categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getDocumentCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document categories" });
    }
  });
  
  app.get("/api/document-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const category = await storage.getDocumentCategory(id);
      
      if (!category) {
        return res.status(404).json({ message: "Document category not found" });
      }
      
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document category" });
    }
  });
  
  app.post("/api/document-categories", async (req: Request, res: Response) => {
    try {
      const result = insertDocumentCategorySchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document category data", errors: result.error.errors });
      }
      
      const newCategory = await storage.createDocumentCategory(result.data);
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ message: "Error creating document category" });
    }
  });
  
  app.put("/api/document-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertDocumentCategorySchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document category data", errors: result.error.errors });
      }
      
      const updatedCategory = await storage.updateDocumentCategory(id, result.data);
      
      if (!updatedCategory) {
        return res.status(404).json({ message: "Document category not found" });
      }
      
      res.json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: "Error updating document category" });
    }
  });
  
  app.delete("/api/document-categories/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDocumentCategory(id);
      
      if (!success) {
        return res.status(404).json({ message: "Document category not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting document category" });
    }
  });
  
  // Document Type routes
  app.get("/api/document-types", async (_req: Request, res: Response) => {
    try {
      const types = await storage.getDocumentTypes();
      res.json(types);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document types" });
    }
  });
  
  app.get("/api/document-types/category/:categoryId", async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.categoryId);
      const types = await storage.getDocumentTypesByCategory(categoryId);
      res.json(types);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document types by category" });
    }
  });
  
  app.get("/api/document-types/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const type = await storage.getDocumentType(id);
      
      if (!type) {
        return res.status(404).json({ message: "Document type not found" });
      }
      
      res.json(type);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document type" });
    }
  });
  
  app.post("/api/document-types", async (req: Request, res: Response) => {
    try {
      const result = insertDocumentTypeSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document type data", errors: result.error.errors });
      }
      
      const newType = await storage.createDocumentType(result.data);
      res.status(201).json(newType);
    } catch (error) {
      res.status(500).json({ message: "Error creating document type" });
    }
  });
  
  app.put("/api/document-types/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertDocumentTypeSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document type data", errors: result.error.errors });
      }
      
      const updatedType = await storage.updateDocumentType(id, result.data);
      
      if (!updatedType) {
        return res.status(404).json({ message: "Document type not found" });
      }
      
      res.json(updatedType);
    } catch (error) {
      res.status(500).json({ message: "Error updating document type" });
    }
  });
  
  app.delete("/api/document-types/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteDocumentType(id);
      
      if (!success) {
        return res.status(404).json({ message: "Document type not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting document type" });
    }
  });
  
  // Document routes
  app.get("/api/documents", async (_req: Request, res: Response) => {
    try {
      const documents = await storage.getDocuments();
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents" });
    }
  });
  
  app.get("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json(document);
    } catch (error) {
      res.status(500).json({ message: "Error fetching document" });
    }
  });
  
  app.get("/api/documents/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const documents = await storage.getDocumentsByUser(userId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents by user" });
    }
  });
  
  app.get("/api/documents/type/:typeId", async (req: Request, res: Response) => {
    try {
      const typeId = parseInt(req.params.typeId);
      const documents = await storage.getDocumentsByType(typeId);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents by type" });
    }
  });
  
  app.get("/api/documents/status/:status", async (req: Request, res: Response) => {
    try {
      const status = req.params.status;
      const documents = await storage.getDocumentsByStatus(status);
      res.json(documents);
    } catch (error) {
      res.status(500).json({ message: "Error fetching documents by status" });
    }
  });
  
  app.post("/api/documents", upload.single("file"), async (req: Request, res: Response) => {
    try {
      const file = req.file;
      
      if (!file) {
        return res.status(400).json({ message: "No file uploaded" });
      }
      
      const documentData = {
        ...req.body,
        userId: parseInt(req.body.userId),
        typeId: parseInt(req.body.typeId),
        uploadedBy: parseInt(req.body.uploadedBy),
        filename: file.filename,
        originalFilename: file.originalname,
        fileSize: file.size,
        mimeType: file.mimetype,
        path: `/uploads/${file.filename}`,
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : undefined,
        metaData: req.body.metaData ? JSON.parse(req.body.metaData) : undefined
      };
      
      const result = insertDocumentSchema.safeParse(documentData);
      
      if (!result.success) {
        // Clean up the uploaded file if validation fails
        await fs.unlink(file.path).catch(console.error);
        return res.status(400).json({ message: "Invalid document data", errors: result.error.errors });
      }
      
      const newDocument = await storage.createDocument(result.data);
      res.status(201).json(newDocument);
    } catch (error) {
      res.status(500).json({ message: "Error creating document" });
    }
  });
  
  app.put("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      // Handle date conversion
      const updateData = {
        ...req.body,
        expiryDate: req.body.expiryDate ? new Date(req.body.expiryDate) : undefined
      };
      
      const result = insertDocumentSchema.partial().safeParse(updateData);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid document data", errors: result.error.errors });
      }
      
      const updatedDocument = await storage.updateDocument(id, result.data);
      
      if (!updatedDocument) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      res.json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: "Error updating document" });
    }
  });
  
  app.delete("/api/documents/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const document = await storage.getDocument(id);
      
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      
      // Delete the file from disk
      const filePath = path.join(process.cwd(), document.path);
      await fs.unlink(filePath).catch(console.error);
      
      const success = await storage.deleteDocument(id);
      
      if (!success) {
        return res.status(500).json({ message: "Error deleting document" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting document" });
    }
  });
  
  // Person routes
  app.get("/api/persons", async (_req: Request, res: Response) => {
    try {
      const persons = await storage.getPersons();
      res.json(persons);
    } catch (error) {
      res.status(500).json({ message: "Error fetching persons" });
    }
  });
  
  app.get("/api/persons/type/:type", async (req: Request, res: Response) => {
    try {
      const type = req.params.type;
      const persons = await storage.getPersonsByType(type);
      res.json(persons);
    } catch (error) {
      res.status(500).json({ message: "Error fetching persons by type" });
    }
  });
  
  app.get("/api/persons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const person = await storage.getPerson(id);
      
      if (!person) {
        return res.status(404).json({ message: "Person not found" });
      }
      
      res.json(person);
    } catch (error) {
      res.status(500).json({ message: "Error fetching person" });
    }
  });
  
  app.post("/api/persons", async (req: Request, res: Response) => {
    try {
      const result = insertPersonSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid person data", errors: result.error.errors });
      }
      
      const newPerson = await storage.createPerson(result.data);
      res.status(201).json(newPerson);
    } catch (error) {
      res.status(500).json({ message: "Error creating person" });
    }
  });
  
  app.put("/api/persons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const result = insertPersonSchema.partial().safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid person data", errors: result.error.errors });
      }
      
      const updatedPerson = await storage.updatePerson(id, result.data);
      
      if (!updatedPerson) {
        return res.status(404).json({ message: "Person not found" });
      }
      
      res.json(updatedPerson);
    } catch (error) {
      res.status(500).json({ message: "Error updating person" });
    }
  });
  
  app.delete("/api/persons/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deletePerson(id);
      
      if (!success) {
        return res.status(404).json({ message: "Person not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting person" });
    }
  });
  
  // Notification routes
  app.get("/api/notifications", async (_req: Request, res: Response) => {
    try {
      const notifications = await storage.getNotifications();
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications" });
    }
  });
  
  app.get("/api/notifications/user/:userId", async (req: Request, res: Response) => {
    try {
      const userId = parseInt(req.params.userId);
      const notifications = await storage.getNotificationsByUser(userId);
      res.json(notifications);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notifications by user" });
    }
  });
  
  app.get("/api/notifications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const notification = await storage.getNotification(id);
      
      if (!notification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      
      res.json(notification);
    } catch (error) {
      res.status(500).json({ message: "Error fetching notification" });
    }
  });
  
  app.post("/api/notifications", async (req: Request, res: Response) => {
    try {
      const result = insertNotificationSchema.safeParse(req.body);
      
      if (!result.success) {
        return res.status(400).json({ message: "Invalid notification data", errors: result.error.errors });
      }
      
      const newNotification = await storage.createNotification(result.data);
      res.status(201).json(newNotification);
    } catch (error) {
      res.status(500).json({ message: "Error creating notification" });
    }
  });
  
  app.patch("/api/notifications/:id/mark-read", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const updatedNotification = await storage.markNotificationAsRead(id);
      
      if (!updatedNotification) {
        return res.status(404).json({ message: "Notification not found" });
      }
      
      res.json(updatedNotification);
    } catch (error) {
      res.status(500).json({ message: "Error marking notification as read" });
    }
  });
  
  app.delete("/api/notifications/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const success = await storage.deleteNotification(id);
      
      if (!success) {
        return res.status(404).json({ message: "Notification not found" });
      }
      
      res.status(204).end();
    } catch (error) {
      res.status(500).json({ message: "Error deleting notification" });
    }
  });
  
  // Serve uploaded files
  app.get("/uploads/:filename", (req: Request, res: Response) => {
    const filename = req.params.filename;
    const filePath = path.join(uploadDir, filename);
    res.sendFile(filePath);
  });
  
  return httpServer;
}
