import { Routes, Route, BrowserRouter } from "react-router-dom";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/context/I18nContext";
import { AuthProvider } from "@/context/AuthContext";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Employees from "@/pages/employees";
import Applicants from "@/pages/applicants";
import Documents from "@/pages/documents";
import DocumentView from "@/pages/document-view";
import Settings from "@/pages/settings";
import Login from './pages/login';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/applicants" element={<Applicants />} />
        <Route path="/documents" element={<Documents />} />
        <Route path="/documents/:id" element={<DocumentView />} />
        <Route path="/settings" element={<Settings />} />
        
        {/* Fallback to 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AuthProvider>
          <Router />
          <Toaster />
        </AuthProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;