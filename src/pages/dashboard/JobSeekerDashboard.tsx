import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { fetchApplications } from '@/store/slices/applicationsSlice';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { LoadingPage } from '@/components/ui/loading-spinner';
import {
  Briefcase,
  FileText,
  Clock,
  CheckCircle2,
  XCircle,
  Eye,
  User,
  Settings,
  Bell,
} from 'lucide-react';
import { format } from 'date-fns';

const statusConfig: Record<string, { label: string; variant: 'warning' | 'primary' | 'success' | 'destructive'; icon: typeof Clock }> = {
  pending: { label: 'Pending', variant: 'warning', icon: Clock },
  reviewed: { label: 'Reviewed', variant: 'primary', icon: Eye },
  accepted: { label: 'Accepted', variant: 'success', icon: CheckCircle2 },
  rejected: { label: 'Rejected', variant: 'destructive', icon: XCircle },
};

export default function JobSeekerDashboard() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { items: applications, isLoading } = useAppSelector((state) => state.applications);

  useEffect(() => {
    dispatch(fetchApplications());
  }, [dispatch]);

  const userApplications = applications.filter((app) => app.applicantId === user?.id);

  const stats = {
    total: userApplications.length,
    pending: userApplications.filter((app) => app.status === 'pending').length,
    reviewed: userApplications.filter((app) => app.status === 'reviewed').length,
    accepted: userApplications.filter((app) => app.status === 'accepted').length,
  };

  if (isLoading) {
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
                <User className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">
                  Welcome back, {user?.fullName}!
                </h1>
                <p className="text-muted-foreground">
                  Track your applications and manage your profile
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
              <Button asChild>
                <Link to="/jobs">
                  <Briefcase className="mr-2 h-4 w-4" />
                  Browse Jobs
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Applications', value: stats.total, icon: FileText, color: 'primary' },
            { label: 'Pending Review', value: stats.pending, icon: Clock, color: 'warning' },
            { label: 'Under Review', value: stats.reviewed, icon: Eye, color: 'primary' },
            { label: 'Accepted', value: stats.accepted, icon: CheckCircle2, color: 'success' },
          ].map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="font-display text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-${stat.color}/10`}>
                    <stat.icon className={`h-6 w-6 text-${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle className="font-display text-xl">Your Applications</CardTitle>
          </CardHeader>
          <CardContent>
            {userApplications.length === 0 ? (
              <div className="text-center py-12">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted mx-auto mb-4">
                  <FileText className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="font-semibold text-lg mb-2">No applications yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start applying to jobs to see your applications here
                </p>
                <Button asChild>
                  <Link to="/jobs">Browse Jobs</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userApplications.map((application) => {
                  const status = statusConfig[application.status];
                  return (
                    <div
                      key={application.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border bg-card hover:shadow-md transition-shadow gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Briefcase className="h-6 w-6 text-primary" />
                        </div>
                        <div>
                          <Link
                            to={`/jobs/${application.jobId}`}
                            className="font-semibold hover:text-primary transition-colors"
                          >
                            {application.jobTitle}
                          </Link>
                          <p className="text-sm text-muted-foreground">
                            {application.companyName}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Applied {format(new Date(application.appliedAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 sm:justify-end">
                        <Badge variant={status.variant} className="flex items-center gap-1">
                          <status.icon className="h-3 w-3" />
                          {status.label}
                        </Badge>
                        <Button variant="outline" size="sm" asChild>
                          <Link to={`/jobs/${application.jobId}`}>View Job</Link>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
