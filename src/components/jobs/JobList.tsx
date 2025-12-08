import { useAppSelector } from '@/hooks/useAppDispatch';
import { JobCard } from './JobCard';
import { LoadingPage } from '@/components/ui/loading-spinner';
import { Briefcase } from 'lucide-react';

interface JobListProps {
  compact?: boolean;
}

export function JobList({ compact = false }: JobListProps) {
  const { filteredItems, pagination, isLoading, error } = useAppSelector(
    (state) => state.jobs
  );

  if (isLoading) {
    return <LoadingPage message="Loading jobs..." />;
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-destructive mb-2">Error loading jobs</p>
        <p className="text-sm text-muted-foreground">{error}</p>
      </div>
    );
  }

  const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
  const endIndex = startIndex + pagination.itemsPerPage;
  const paginatedJobs = filteredItems.slice(startIndex, endIndex);

  if (paginatedJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mb-4">
          <Briefcase className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-display font-semibold text-lg mb-2">No jobs found</h3>
        <p className="text-muted-foreground max-w-md">
          Try adjusting your search filters or browse all available positions.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {paginatedJobs.map((job, index) => (
        <div
          key={job.id}
          className="animate-slide-up"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <JobCard job={job} compact={compact} />
        </div>
      ))}
    </div>
  );
}
