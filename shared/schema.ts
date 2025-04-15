import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  role: text("role").notNull().default("user"), // admin, manager, user
  department: text("department"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  fullName: true,
  email: true,
  role: true,
  department: true,
  avatar: true,
});

// Document category schema
export const documentCategories = pgTable("document_categories", {
  id: serial("id").primaryKey(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  nameHi: text("name_hi").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull().default("primary"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDocumentCategorySchema = createInsertSchema(documentCategories).pick({
  nameEn: true,
  nameAr: true,
  nameHi: true,
  icon: true,
  color: true,
});

// Document type schema
export const documentTypes = pgTable("document_types", {
  id: serial("id").primaryKey(),
  categoryId: integer("category_id").notNull(),
  nameEn: text("name_en").notNull(),
  nameAr: text("name_ar").notNull(),
  nameHi: text("name_hi").notNull(),
  requiresExpiry: boolean("requires_expiry").notNull().default(false),
  requiredForEmployees: boolean("required_for_employees").notNull().default(false),
  requiredForApplicants: boolean("required_for_applicants").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertDocumentTypeSchema = createInsertSchema(documentTypes).pick({
  categoryId: true,
  nameEn: true,
  nameAr: true,
  nameHi: true,
  requiresExpiry: true,
  requiredForEmployees: true,
  requiredForApplicants: true,
});

// Document schema
export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(), // Employee or applicant ID
  typeId: integer("type_id").notNull(),
  filename: text("filename").notNull(),
  originalFilename: text("original_filename").notNull(),
  fileSize: integer("file_size").notNull(),
  mimeType: text("mime_type").notNull(),
  path: text("path").notNull(),
  status: text("status").notNull().default("valid"), // valid, expired, expiring_soon
  uploadedBy: integer("uploaded_by").notNull(),
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  expiryDate: timestamp("expiry_date"),
  metaData: jsonb("meta_data"),
});

export const insertDocumentSchema = createInsertSchema(documents).pick({
  userId: true,
  typeId: true,
  filename: true,
  originalFilename: true,
  fileSize: true,
  mimeType: true,
  path: true,
  status: true,
  uploadedBy: true,
  expiryDate: true,
  metaData: true,
});

// Person (employee or applicant) schema
export const persons = pgTable("persons", {
  id: serial("id").primaryKey(),
  userId: integer("user_id"),
  type: text("type").notNull(), // employee, applicant
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  nationality: text("nationality"),
  department: text("department"),
  position: text("position"),
  avatar: text("avatar"),
  status: text("status").notNull().default("active"), // active, inactive, pending
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertPersonSchema = createInsertSchema(persons).pick({
  userId: true,
  type: true,
  firstName: true,
  lastName: true,
  email: true,
  phone: true,
  nationality: true,
  department: true,
  position: true,
  avatar: true,
  status: true,
});

// Notification schema
export const notifications = pgTable("notifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  documentId: integer("document_id"),
  title: text("title").notNull(),
  message: text("message").notNull(),
  read: boolean("read").notNull().default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertNotificationSchema = createInsertSchema(notifications).pick({
  userId: true,
  documentId: true,
  title: true,
  message: true,
  read: true,
});

// Defining types for all schemas
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type DocumentCategory = typeof documentCategories.$inferSelect;
export type InsertDocumentCategory = z.infer<typeof insertDocumentCategorySchema>;

export type DocumentType = typeof documentTypes.$inferSelect;
export type InsertDocumentType = z.infer<typeof insertDocumentTypeSchema>;

export type Document = typeof documents.$inferSelect;
export type InsertDocument = z.infer<typeof insertDocumentSchema>;

export type Person = typeof persons.$inferSelect;
export type InsertPerson = z.infer<typeof insertPersonSchema>;

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = z.infer<typeof insertNotificationSchema>;
