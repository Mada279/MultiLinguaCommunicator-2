import React, { useState } from 'react';
import { useI18n } from '@/context/I18nContext';
import { useQuery } from '@tanstack/react-query';
import Layout from '@/components/layout/Layout';
import { Link } from 'wouter';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Person } from '@shared/schema';

const Applicants = () => {
  const { t } = useI18n();
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch applicants
  const { data: persons, isLoading } = useQuery({
    queryKey: ['/api/persons/type/applicant'],
    select: (data: Person[]) => {
      // Filter by search query if provided
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        return data.filter(person => 
          person.firstName.toLowerCase().includes(query) || 
          person.lastName.toLowerCase().includes(query) ||
          person.email.toLowerCase().includes(query) ||
          person.position?.toLowerCase().includes(query)
        );
      }
      return data;
    }
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t('applicants')}</h1>
            <p className="text-slate-500 mt-1">Manage job applicants and their documents</p>
          </div>
          <Button>
            <i className="fa-solid fa-plus mr-2"></i>
            Add Applicant
          </Button>
        </div>
        
        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i>
                <Input
                  type="search"
                  placeholder="Search applicants..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <i className="fa-solid fa-filter mr-2"></i>
                  Filter
                </Button>
                <Button variant="outline">
                  <i className="fa-solid fa-arrow-down-wide-short mr-2"></i>
                  Sort
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Applicants Table */}
        <Card>
          <CardHeader>
            <CardTitle>Applicants</CardTitle>
            <CardDescription>A list of all job applicants</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-[250px]" />
                      <Skeleton className="h-4 w-[200px]" />
                    </div>
                  </div>
                ))}
              </div>
            ) : persons && persons.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Position Applied</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Nationality</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow key={person.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                            {person.firstName[0]}{person.lastName[0]}
                          </div>
                          <span>{person.firstName} {person.lastName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{person.position}</TableCell>
                      <TableCell>{person.email}</TableCell>
                      <TableCell>{person.nationality}</TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          person.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 
                          person.status === 'inactive' ? 'bg-slate-100 text-slate-800' : 
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {person.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Link href={`/applicants/${person.id}`}>
                          <Button variant="ghost" size="sm">
                            <i className="fa-solid fa-folder-open mr-1"></i>
                            View
                          </Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-100 mb-4">
                  <i className="fa-solid fa-user-plus text-2xl text-slate-400"></i>
                </div>
                <h3 className="text-lg font-medium text-slate-900 mb-2">No applicants found</h3>
                <p className="text-slate-500 mb-4">
                  {searchQuery.trim() 
                    ? `No applicants matching "${searchQuery}"`
                    : "You haven't added any applicants yet."}
                </p>
                <Button>
                  <i className="fa-solid fa-plus mr-2"></i>
                  Add Applicant
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Applicants;
