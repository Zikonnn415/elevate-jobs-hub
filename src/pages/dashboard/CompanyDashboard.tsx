import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchJobs } from '@/store/slices/jobsSlice';
import { fetchApplications } from '@/store/slices/applicationsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingPage } from '@/components/ui/loading-spinner';
import {
  Briefcase,
  Users,
  FileText,
  Plus,
  Building2,
  Settings,
  Bell,
  TrendingUp,
  Eye,
  MoreVertical,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { format } from 'date-fns';

export default function CompanyDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: jobs, isLoading: jobsLoading } = useAppSelector((state) => state.jobs);
  const { items: applications, isLoading: appsLoading } = useAppSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchJobs());
    dispatch(fetchApplications());
  }, [dispatch]);

  // In a real app, filter by company ID
  const companyJobs = jobs.filter((job) => job.companyId === '101' || job.companyId === '102');
  const companyApplications = applications;

  const stats = {
    activeJobs: companyJobs.filter((job) => job.isActive).length,
    totalApplications: companyApplications.length,
    newApplications: companyApplications.filter((app) => app.status === 'pending').length,
    totalViews: companyJobs.reduce((sum, job) => sum + job.applicationsCount * 5, 0),
  };

  if (jobsLoading || appsLoading) {
    return <LoadingPage message="Loading your dashboard..." />;
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Header */}
      <div className="bg-card border-b">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">
                  {user?.fullName || 'Company Dashboard'}
                </h1>
                <p className="text-muted-foreground">
                  Manage your job postings and applicants
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, trend: '+2 this week' },
            { label: 'Total Applications', value: stats.totalApplications, icon: FileText, trend: '+12 this week' },
            { label: 'New Applications', value: stats.newApplications, icon: Users, trend: 'Needs review' },
            { label: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, trend: '+15% vs last week' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="font-display text-3xl font-bold">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3 text-success" />
                      {stat.trend}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Active Job Postings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Active Job Postings</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              {companyJobs.length === 0 ? (
                <div className="text-center py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                    <Briefcase className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground mb-3">No active job postings</p>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Post Your First Job
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {companyJobs.slice(0, 5).map((job) => (
                    <div
                      key={job.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1 min-w-0">
                        <Link
                          to={`/jobs/${job.id}`}
                          className="font-medium hover:text-primary transition-colors block truncate"
                        >
                          {job.title}
                        </Link>
                        <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                          <span>{job.location}</span>
                          <span>•</span>
                          <span>{job.applicationsCount} applicants</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={job.isActive ? 'success' : 'muted'}>
                          {job.isActive ? 'Active' : 'Closed'}
                        </Badge>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>Edit Job</DropdownMenuItem>
                            <DropdownMenuItem>View Applications</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              Close Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="font-display text-xl">Recent Applications</CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent>
              {companyApplications.length === 0 ? (
                <div className="text-center py-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-muted mx-auto mb-3">
                    <Users className="h-7 w-7 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No applications yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {companyApplications.slice(0, 5).map((application) => (
                    <div
                      key={application.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-sm font-medium text-primary">
                            {application.applicantName.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{application.applicantName}</p>
                          <p className="text-sm text-muted-foreground">
                            Applied for {application.jobTitle}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            application.status === 'pending'
                              ? 'warning'
                              : application.status === 'reviewed'
                              ? 'primary'
                              : application.status === 'accepted'
                              ? 'success'
                              : 'destructive'
                          }
                        >
                          {application.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(new Date(application.appliedAt), 'MMM dd')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
