import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchJobs, setPage } from '@/store/slices/jobsSlice';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobList } from '@/components/jobs/JobList';
import { PaginationControls } from '@/components/ui/pagination-controls';
import { Briefcase } from 'lucide-react';

export default function JobsPage() {
  const dispatch = useAppDispatch();
  const { pagination, filteredItems } = useAppSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-primary-foreground py-12 relative overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        
        <div className="container relative">
          <div className="flex items-center gap-3 mb-3 animate-slide-in-left">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors shadow-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-shadow-md">Find Jobs</h1>
          </div>
          <p className="text-primary-foreground/90 max-w-xl text-lg animate-slide-up" style={{ animationDelay: '100ms' }}>
            Browse through <span className="font-semibold text-primary-foreground">{filteredItems.length}</span> opportunities from top employers across Nepal
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 animate-slide-in-left">
              <JobFilters />
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6 p-4 bg-muted/30 rounded-xl border border-border/50 animate-fade-in">
              <p className="text-muted-foreground">
                Showing{' '}
                <span className="font-semibold text-foreground">
                  {Math.min(
                    (pagination.currentPage - 1) * pagination.itemsPerPage + 1,
                    pagination.totalItems
                  )}
                  -
                  {Math.min(
                    pagination.currentPage * pagination.itemsPerPage,
                    pagination.totalItems
                  )}
                </span>{' '}
                of{' '}
                <span className="font-semibold text-foreground">
                  {pagination.totalItems}
                </span>{' '}
                jobs
              </p>
            </div>

            <JobList />

            {pagination.totalPages > 1 && (
              <div className="mt-8 animate-fade-in">
                <PaginationControls
                  currentPage={pagination.currentPage}
                  totalPages={pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
