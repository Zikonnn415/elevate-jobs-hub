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
      <div className="gradient-hero text-primary-foreground py-12">
        <div className="container">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-foreground/10">
              <Briefcase className="h-5 w-5" />
            </div>
            <h1 className="font-display text-3xl font-bold">Find Jobs</h1>
          </div>
          <p className="text-primary-foreground/80 max-w-xl">
            Browse through {filteredItems.length} opportunities from top employers across Nepal
          </p>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24">
              <JobFilters />
            </div>
          </aside>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">
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
                <span className="font-medium text-foreground">
                  {pagination.totalItems}
                </span>{' '}
                jobs
              </p>
            </div>

            <JobList />

            {pagination.totalPages > 1 && (
              <div className="mt-8">
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
