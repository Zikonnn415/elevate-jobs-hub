import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCard } from '@/components/jobs/JobCard';
import { Badge } from '@/components/ui/badge';
import { statistics, mockJobs } from '@/data/mockData';
import {
  Search,
  Users,
  Building2,
  Award,
  Briefcase,
  ArrowRight,
  CheckCircle2,
  Target,
  TrendingUp,
  Shield,
} from 'lucide-react';

export default function HomePage() {
  const featuredJobs = mockJobs.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium">
              Nepal's Trusted Recruitment Partner
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up">
              Find Your Dream Career with{' '}
              <span className="text-primary">Elevate Workforce</span>
            </h1>
            
            <p className="text-lg md:text-xl text-primary-foreground/80 mb-10 animate-slide-up" style={{ animationDelay: '100ms' }}>
              Connecting talented professionals with leading companies across Nepal.
              Start your journey towards a fulfilling career today.
            </p>

            {/* Search Box */}
            <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
              <JobFilters variant="hero" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {[
                { icon: Briefcase, value: statistics.totalJobs.toLocaleString(), label: 'Active Jobs' },
                { icon: Building2, value: statistics.companiesHiring.toLocaleString(), label: 'Companies' },
                { icon: Users, value: statistics.jobSeekersRegistered.toLocaleString(), label: 'Job Seekers' },
                { icon: Award, value: statistics.successfulPlacements.toLocaleString(), label: 'Placements' },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold">{stat.value}</div>
                  <div className="text-sm text-primary-foreground/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-background"
            />
          </svg>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Featured Opportunities
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Explore our hand-picked job listings from top employers across Nepal
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0" asChild>
              <Link to="/jobs">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job, index) => (
              <div
                key={job.id}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <JobCard job={job} compact />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Elevate Workforce?
            </h2>
            <p className="text-muted-foreground">
              We're committed to providing the best recruitment experience for both
              job seekers and employers
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Target,
                title: 'Targeted Matching',
                description: 'Our smart algorithms connect the right talent with the right opportunities',
              },
              {
                icon: Shield,
                title: 'Verified Employers',
                description: 'All companies on our platform are thoroughly verified for authenticity',
              },
              {
                icon: TrendingUp,
                title: 'Career Growth',
                description: 'Access resources and guidance to accelerate your professional journey',
              },
              {
                icon: CheckCircle2,
                title: 'Transparent Process',
                description: 'Track your application status and get timely updates at every step',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-lg transition-shadow animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 lg:p-16">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTJIMjR2Mmgxek0zNiAzMHYtMkgyNHYyaDEyek0zNiAyNnYtMkgyNHYyaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                  Ready to Take the Next Step?
                </h2>
                <p className="text-primary-foreground/80 text-lg mb-6">
                  Whether you're looking for your dream job or seeking top talent,
                  we're here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="hero" asChild>
                    <Link to="/register">
                      <Search className="mr-2 h-5 w-5" />
                      Find Jobs
                    </Link>
                  </Button>
                  <Button size="lg" variant="heroOutline" asChild>
                    <Link to="/register?type=company">
                      <Building2 className="mr-2 h-5 w-5" />
                      Post a Job
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-foreground/10 rounded-2xl transform rotate-3" />
                  <div className="relative bg-card/10 backdrop-blur-sm rounded-2xl p-6 border border-primary-foreground/20">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-primary-foreground/10">
                          <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 animate-pulse" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-primary-foreground/20 animate-pulse" />
                            <div className="h-3 w-1/2 rounded bg-primary-foreground/15 animate-pulse" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
