import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { Language } from '@/lib/i18n';
import Layout from '@/components/layout/Layout';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';

const Settings = () => {
  const { t, language, setLanguage } = useI18n();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('general');

  const handleLanguageChange = (value: string) => {
    setLanguage(value as Language);
    
    toast({
      title: 'Language Changed',
      description: `The language has been changed to ${value === 'en' ? 'English' : value === 'ar' ? 'Arabic' : 'Hindi'}.`,
    });
  };

  return (
    <Layout>
      <div className="max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-slate-900">{t('settings')}</h1>
          <p className="text-slate-500 mt-1">Manage system settings and preferences</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
            <CardDescription>Customize your document management system</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6 bg-light-gray">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="users">Users & Permissions</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general">
                <div className="space-y-6">
                  {/* Language Settings */}
                  <div className="space-y-3">
                    <h2 className="text-lg font-medium">{t('language')}</h2>
                    <p className="text-sm text-slate-500">Choose your preferred language for the interface</p>
                    
                    <div className="flex flex-wrap gap-4 mt-3">
                      <Button 
                        onClick={() => handleLanguageChange('en')}
                        variant={language === 'en' ? 'default' : 'outline'} 
                        className="min-w-[120px] flex-grow sm:flex-grow-0"
                      >
                        <span className="flag-icon mr-2">🇺🇸</span>
                        English
                      </Button>
                      
                      <Button 
                        onClick={() => handleLanguageChange('ar')}
                        variant={language === 'ar' ? 'default' : 'outline'} 
                        className="min-w-[120px] flex-grow sm:flex-grow-0"
                      >
                        <span className="flag-icon mr-2">🇸🇦</span>
                        العربية
                      </Button>
                      
                      <Button 
                        onClick={() => handleLanguageChange('hi')}
                        variant={language === 'hi' ? 'default' : 'outline'} 
                        className="min-w-[120px] flex-grow sm:flex-grow-0"
                      >
                        <span className="flag-icon mr-2">🇮🇳</span>
                        हिन्दी
                      </Button>
                    </div>
                  </div>
                  
                  {/* Theme Settings */}
                  <div className="space-y-3 pt-6 border-t">
                    <h2 className="text-lg font-medium">Theme</h2>
                    <p className="text-sm text-slate-500">Choose your preferred theme for the interface</p>
                    
                    <RadioGroup 
                      defaultValue="light" 
                      className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
                    >
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer">
                        <RadioGroupItem value="light" id="theme-light" />
                        <Label htmlFor="theme-light" className="flex-1 cursor-pointer">Light</Label>
                      </div>
                      
                      <div className="flex items-center space-x-2 rounded-md border p-3 cursor-pointer">
                        <RadioGroupItem value="dark" id="theme-dark" />
                        <Label htmlFor="theme-dark" className="flex-1 cursor-pointer">Dark</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  
                  {/* Company Information */}
                  <div className="space-y-3 pt-6 border-t">
                    <h2 className="text-lg font-medium">Company Information</h2>
                    <p className="text-sm text-slate-500">Update your organization details</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company-name">Company Name</Label>
                        <Input id="company-name" defaultValue="إرادة للموارد البشرية" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company-logo">Company Logo</Label>
                        <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center bg-slate-50">
                          <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-3">
                            <svg width="48" height="48" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20C35 11.7157 28.2843 5 20 5Z" fill="#E5F0FF"/>
                              <path d="M15 13C15 14.6569 13.6569 16 12 16C10.3431 16 9 14.6569 9 13C9 11.3431 10.3431 10 12 10C13.6569 10 15 11.3431 15 13Z" fill="#3366FF"/>
                              <path d="M28 13C28 14.6569 26.6569 16 25 16C23.3431 16 22 14.6569 22 13C22 11.3431 23.3431 10 25 10C26.6569 10 28 11.3431 28 13Z" fill="#3366FF"/>
                              <path d="M20 28C24.4183 28 28 24.4183 28 20H12C12 24.4183 15.5817 28 20 28Z" fill="#3366FF"/>
                            </svg>
                          </div>
                          <Button variant="outline" size="sm">Change Logo</Button>
                          <p className="text-xs text-slate-500 mt-2">Recommended size: 200x200px</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-email">Email Address</Label>
                        <Input id="company-email" type="email" defaultValue="info@erada-hr.com" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="company-phone">Phone Number</Label>
                        <Input id="company-phone" defaultValue="+966 123 456 7890" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company-address">Company Address</Label>
                        <Input id="company-address" defaultValue="الرياض، المملكة العربية السعودية" />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="company-about">About Company</Label>
                        <textarea 
                          id="company-about" 
                          className="w-full min-h-[100px] p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                          defaultValue="نظام إرادة للموارد البشرية والمستندات هو نظام متكامل لإدارة وتنظيم وثائق الموظفين والمتقدمين مع دعم متعدد اللغات."
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <Button>Save Changes</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="notifications">
                <div className="space-y-6">
                  <h2 className="text-lg font-medium">Notification Preferences</h2>
                  <p className="text-sm text-slate-500">Configure how you want to be notified about document events</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-expiry" className="text-base">Document Expiry Notifications</Label>
                        <p className="text-sm text-slate-500">Notify when documents are about to expire</p>
                      </div>
                      <Switch id="notify-expiry" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-upload" className="text-base">New Document Uploads</Label>
                        <p className="text-sm text-slate-500">Notify when new documents are uploaded</p>
                      </div>
                      <Switch id="notify-upload" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-edit" className="text-base">Document Edits</Label>
                        <p className="text-sm text-slate-500">Notify when documents are edited</p>
                      </div>
                      <Switch id="notify-edit" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="notify-delete" className="text-base">Document Deletions</Label>
                        <p className="text-sm text-slate-500">Notify when documents are deleted</p>
                      </div>
                      <Switch id="notify-delete" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-3">Notification Channels</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-email" className="text-base">Email Notifications</Label>
                          <p className="text-sm text-slate-500">Receive notifications via email</p>
                        </div>
                        <Switch id="notify-email" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="notify-app" className="text-base">In-App Notifications</Label>
                          <p className="text-sm text-slate-500">Receive notifications within the application</p>
                        </div>
                        <Switch id="notify-app" defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <Button>Save Preferences</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="documents">
                <div className="space-y-6">
                  <h2 className="text-lg font-medium">Document Settings</h2>
                  <p className="text-sm text-slate-500">Configure document management settings</p>
                  
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry-days">Expiry Warning Period (Days)</Label>
                      <div className="flex items-center gap-4">
                        <Input id="expiry-days" type="number" defaultValue="30" className="w-24" />
                        <p className="text-sm text-slate-500">Days before expiry to show warnings</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-reminder" className="text-base">Automatic Reminders</Label>
                        <p className="text-sm text-slate-500">Send automatic reminders for expiring documents</p>
                      </div>
                      <Switch id="auto-reminder" defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="require-description" className="text-base">Require Document Description</Label>
                        <p className="text-sm text-slate-500">Make description field mandatory when uploading documents</p>
                      </div>
                      <Switch id="require-description" />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-3">File Upload Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                        <Input id="max-file-size" type="number" defaultValue="10" className="w-24" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="allowed-file-types">Allowed File Types</Label>
                        <Input id="allowed-file-types" defaultValue="PDF, DOCX, JPG, PNG" />
                        <p className="text-xs text-slate-500">Comma-separated list of allowed file extensions</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <Button>Save Settings</Button>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="users">
                <div className="space-y-6">
                  <h2 className="text-lg font-medium">User Management & Permissions</h2>
                  <p className="text-sm text-slate-500">Configure user access and permissions</p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allow-signup" className="text-base">Allow User Registration</Label>
                        <p className="text-sm text-slate-500">Let users create their own accounts</p>
                      </div>
                      <Switch id="allow-signup" />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="admin-approval" className="text-base">Require Admin Approval</Label>
                        <p className="text-sm text-slate-500">New accounts must be approved by administrators</p>
                      </div>
                      <Switch id="admin-approval" defaultChecked />
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t">
                    <h3 className="text-lg font-medium mb-3">Default Permissions</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="permission-upload" className="text-base">Upload Documents</Label>
                          <p className="text-sm text-slate-500">Allow users to upload new documents</p>
                        </div>
                        <Switch id="permission-upload" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="permission-edit" className="text-base">Edit Documents</Label>
                          <p className="text-sm text-slate-500">Allow users to edit document metadata</p>
                        </div>
                        <Switch id="permission-edit" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="permission-delete" className="text-base">Delete Documents</Label>
                          <p className="text-sm text-slate-500">Allow users to delete documents</p>
                        </div>
                        <Switch id="permission-delete" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="permission-categories" className="text-base">Manage Categories</Label>
                          <p className="text-sm text-slate-500">Allow users to create/edit document categories</p>
                        </div>
                        <Switch id="permission-categories" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end pt-6">
                    <Button>Save Permissions</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Settings;
