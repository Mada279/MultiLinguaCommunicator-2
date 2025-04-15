import { Switch, Route } from "wouter";
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
    <Switch>
      {/* Main pages */}
      <Route path="/login" component={Login} />
      <Route path="/" component={Dashboard} />
      <Route path="/employees" component={Employees} />
      <Route path="/applicants" component={Applicants} />
      <Route path="/documents" component={Documents} />
      <Route path="/documents/:id" component={DocumentView} />
      <Route path="/settings" component={Settings} />

      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
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