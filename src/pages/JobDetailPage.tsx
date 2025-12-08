import { useEffect, useState } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { selectJob, clearSelectedJob, fetchJobs } from '@/store/slices/jobsSlice';
import { addApplication } from '@/store/slices/applicationsSlice';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { LoadingPage } from '@/components/ui/loading-spinner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import {
  MapPin,
  Clock,
  DollarSign,
  Building2,
  Bookmark,
  Share2,
  ArrowLeft,
  CheckCircle2,
  Briefcase,
  GraduationCap,
  Users,
  Calendar,
} from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Application } from '@/models/types';

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

export default function JobDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { selectedJob, isLoading, items } = useAppSelector((state) => state.jobs);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  const [applyDialogOpen, setApplyDialogOpen] = useState(searchParams.get('apply') === 'true');
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchJobs());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (id && items.length > 0) {
      dispatch(selectJob(id));
    }
    return () => {
      dispatch(clearSelectedJob());
    };
  }, [dispatch, id, items]);

  const handleApply = async () => {
    if (!isAuthenticated) {
      toast({
        title: 'Login Required',
        description: 'Please login to apply for this job.',
        variant: 'destructive',
      });
      return;
    }

    if (!coverLetter.trim()) {
      toast({
        title: 'Cover Letter Required',
        description: 'Please write a cover letter to submit your application.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    const application: Application = {
      id: `app-${Date.now()}`,
      jobId: selectedJob!.id,
      jobTitle: selectedJob!.title,
      companyName: selectedJob!.companyName,
      applicantId: user!.id,
      applicantName: user!.fullName,
      applicantEmail: user!.email,
      coverLetter,
      status: 'pending',
      appliedAt: new Date(),
      updatedAt: new Date(),
    };

    dispatch(addApplication(application));
    setIsSubmitting(false);
    setApplyDialogOpen(false);
    setCoverLetter('');

    toast({
      title: 'Application Submitted!',
      description: 'Your application has been sent to the employer.',
    });
  };

  if (isLoading || !selectedJob) {
    return <LoadingPage message="Loading job details..." />;
  }

  const formatSalary = (min: number, max: number, currency: string) => {
    const formatter = new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${formatter.format(min)} - ${formatter.format(max)}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="gradient-hero text-primary-foreground py-8">
        <div className="container">
          <Link
            to="/jobs"
            className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Jobs
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-primary-foreground/10">
              <Building2 className="h-10 w-10" />
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap gap-2 mb-3">
                <Badge variant="secondary">{jobTypeLabels[selectedJob.jobType]}</Badge>
                <Badge variant="secondary">{experienceLevelLabels[selectedJob.experienceLevel]}</Badge>
                <Badge variant="secondary">{selectedJob.category}</Badge>
              </div>

              <h1 className="font-display text-3xl lg:text-4xl font-bold mb-2">
                {selectedJob.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-primary-foreground/80">
                <span className="flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" />
                  {selectedJob.companyName}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4" />
                  {selectedJob.location}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  Posted {formatDistanceToNow(new Date(selectedJob.postedAt), { addSuffix: true })}
                </span>
              </div>
            </div>

            <div className="flex gap-3 lg:flex-col">
              <Button
                size="lg"
                variant="hero"
                onClick={() => setApplyDialogOpen(true)}
              >
                Apply Now
              </Button>
              <div className="flex gap-2">
                <Button variant="heroOutline" size="icon">
                  <Bookmark className="h-5 w-5" />
                </Button>
                <Button variant="heroOutline" size="icon">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Job Description</h2>
                <p className="text-muted-foreground leading-relaxed">
                  {selectedJob.description}
                </p>
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-success shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{req}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Benefits</h2>
                <ul className="space-y-3">
                  {selectedJob.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardContent className="p-6">
                <h2 className="font-display text-xl font-semibold mb-4">Required Skills</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skills.map((skill) => (
                    <Badge key={skill} variant="primary" className="px-3 py-1">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Job Overview */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">Job Overview</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Salary</p>
                      <p className="font-medium">
                        {formatSalary(selectedJob.salaryMin, selectedJob.salaryMax, selectedJob.currency)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Job Type</p>
                      <p className="font-medium">{jobTypeLabels[selectedJob.jobType]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Experience</p>
                      <p className="font-medium">{experienceLevelLabels[selectedJob.experienceLevel]}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Applications</p>
                      <p className="font-medium">{selectedJob.applicationsCount} applicants</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                      <Calendar className="h-5 w-5 text-warning" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Deadline</p>
                      <p className="font-medium">
                        {format(new Date(selectedJob.deadline), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-display font-semibold mb-4">About Company</h3>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10">
                    <Building2 className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{selectedJob.companyName}</p>
                    <p className="text-sm text-muted-foreground">{selectedJob.location}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/company/${selectedJob.companyId}`}>View Company Profile</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Apply Dialog */}
      <Dialog open={applyDialogOpen} onOpenChange={setApplyDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-display text-xl">
              Apply for {selectedJob.title}
            </DialogTitle>
            <DialogDescription>
              Submit your application to {selectedJob.companyName}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Cover Letter</label>
              <Textarea
                placeholder="Tell us why you're a great fit for this role..."
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                rows={6}
                className="resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Resume (Optional)</label>
              <Input type="file" accept=".pdf,.doc,.docx" />
              <p className="text-xs text-muted-foreground mt-1">
                PDF, DOC, or DOCX. Max 5MB
              </p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setApplyDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleApply} disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
