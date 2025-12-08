import { Link } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Job } from '@/models/types';
import { MapPin, Clock, DollarSign, Building2, Bookmark } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  job: Job;
  compact?: boolean;
}

const jobTypeLabels: Record<string, string> = {
  'full-time': 'Full Time',
  'part-time': 'Part Time',
  'contract': 'Contract',
  'internship': 'Internship',
  'remote': 'Remote',
};

const experienceLevelLabels: Record<string, string> = {
  'entry': 'Entry Level',
  'mid': 'Mid Level',
  'senior': 'Senior Level',
  'executive': 'Executive',
};

export function JobCard({ job, compact = false }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  const postedTime = formatDistanceToNow(new Date(job.postedAt), { addSuffix: true });

  if (compact) {
    return (
      <Card hover className="group">
        <CardContent className="p-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <Link to={`/jobs/${job.id}`} className="block">
                <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                  {job.title}
                </h3>
              </Link>
              <p className="text-sm text-muted-foreground">{job.companyName}</p>
              <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {job.location}
                </span>
                <Badge variant="primary" className="text-xs">
                  {jobTypeLabels[job.jobType]}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card hover className="group overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
              <Building2 className="h-7 w-7 text-primary" />
            </div>
            <div>
              <Link to={`/jobs/${job.id}`}>
                <h3 className="font-display text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {job.title}
                </h3>
              </Link>
              <p className="text-muted-foreground mt-0.5">{job.companyName}</p>
            </div>
          </div>
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Bookmark className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-3 mt-4">
          <Badge variant="primary">
            {jobTypeLabels[job.jobType]}
          </Badge>
          <Badge variant="muted">
            {experienceLevelLabels[job.experienceLevel]}
          </Badge>
          <Badge variant="muted">
            {job.category}
          </Badge>
        </div>

        <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            {job.location}
          </span>
          <span className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4" />
            {formatSalary(job.salaryMin, job.salaryMax, job.currency)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {postedTime}
          </span>
        </div>

        <p className="mt-4 text-sm text-muted-foreground line-clamp-2">
          {job.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {job.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="px-2.5 py-1 text-xs font-medium bg-muted rounded-md text-muted-foreground"
            >
              {skill}
            </span>
          ))}
          {job.skills.length > 4 && (
            <span className="px-2.5 py-1 text-xs font-medium bg-muted rounded-md text-muted-foreground">
              +{job.skills.length - 4} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mt-6 pt-4 border-t">
          <span className="text-xs text-muted-foreground">
            {job.applicationsCount} applicants
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link to={`/jobs/${job.id}`}>View Details</Link>
            </Button>
            <Button size="sm" asChild>
              <Link to={`/jobs/${job.id}?apply=true`}>Apply Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
