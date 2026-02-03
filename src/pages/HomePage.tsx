import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { JobFilters } from '@/components/jobs/JobFilters';
import { JobCard } from '@/components/jobs/JobCard';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { statistics, mockJobs, topCompanies, testimonials } from '@/data/mockData';
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
  MapPin,
} from 'lucide-react';

export default function HomePage() {
  const featuredJobs = mockJobs.slice(0, 6);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden gradient-hero text-primary-foreground">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
        
        <div className="container relative py-20 lg:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm font-medium animate-bounce-in glass-effect">
              Nepal's Trusted Recruitment Partner
            </Badge>
            
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up text-shadow-md">
              Find Your Dream Career with{' '}
              <span className="text-primary relative">
                Elevate Workforce
                <span className="absolute -bottom-2 left-0 right-0 h-1 bg-primary/30 blur-sm" />
              </span>
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/90 mb-10 animate-slide-up text-shadow-sm" style={{ animationDelay: '100ms' }}>
              Connecting talented professionals with leading companies across Nepal.
              Start your journey towards a fulfilling career today.
            </p>
            {/* Search Box */}
            <div className="animate-slide-up hover-lift" style={{ animationDelay: '200ms' }}>
              <JobFilters variant="hero" />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 animate-fade-in" style={{ animationDelay: '400ms' }}>
              {[
                { icon: Briefcase, value: statistics.totalJobs.toLocaleString(), label: 'Active Jobs' },
                { icon: Building2, value: statistics.companiesHiring.toLocaleString(), label: 'Companies' },
                { icon: Users, value: statistics.jobSeekersRegistered.toLocaleString(), label: 'Job Seekers' },
                { icon: Award, value: statistics.successfulPlacements.toLocaleString(), label: 'Placements' },
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="text-center group cursor-default hover-lift"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-3 rounded-xl bg-primary-foreground/10 group-hover:bg-primary-foreground/20 transition-all duration-300 group-hover:scale-110">
                      <stat.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                  </div>
                  <div className="font-display text-2xl md:text-3xl font-bold text-shadow-sm group-hover:text-primary transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/70 mt-1">{stat.label}</div>
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
      <section className="py-20 bg-gradient-to-b from-background to-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div className="animate-slide-in-left">
              <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
                Featured Opportunities
              </h2>
              <p className="text-muted-foreground max-w-xl text-lg">
                Explore our hand-picked job listings from top employers across Nepal
              </p>
            </div>
            <Button variant="outline" className="mt-4 md:mt-0 hover-lift group" asChild>
              <Link to="/jobs">
                View All Jobs <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
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

      {/* Top Companies Section */}
      <section className="py-16 bg-gradient-to-r from-background via-muted/40 to-background border-y border-border/60">
        <div className="container">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="animate-slide-in-left">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
                Trusted by leading employers
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-bold">
                Top Companies Hiring on Elevate Workforce
              </h2>
              <p className="text-muted-foreground mt-2 max-w-xl text-sm md:text-base">
                Discover companies that are actively hiring across Nepal, from fast‑growing startups
                to established industry leaders.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="hover-lift mt-2 md:mt-0 self-start md:self-auto"
              asChild
            >
              <Link to="/companies">
                View all companies
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />

            <div className="flex gap-4 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-muted/60 scrollbar-track-transparent">
              {topCompanies.map((company, index) => (
                <Card
                  key={company.id}
                  hover
                  className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] border-border/60 bg-card/95 hover:border-primary/30 hover-lift animate-slide-up"
                  style={{ animationDelay: `${index * 80}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary font-semibold text-sm uppercase">
                          {company.name
                            .split(' ')
                            .slice(0, 2)
                            .map((w) => w[0])
                            .join('')}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {company.name}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {company.industry}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant={company.isHiringNow ? 'success' : 'muted'}
                        className="text-[10px] px-2 py-0.5"
                      >
                        {company.badge}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {company.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Briefcase className="h-3.5 w-3.5" />
                        {company.jobsOpen} open roles
                      </span>
                    </div>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-between text-xs px-3 py-1.5 hover:bg-primary/5"
                      asChild
                    >
                      <Link to={`/companies/${company.id}`}>
                        View company profile
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5" />
        <div className="container relative">
          <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-in">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
              Why Choose Elevate Workforce?
            </h2>
            <p className="text-muted-foreground text-lg">
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
                color: 'primary',
              },
              {
                icon: Shield,
                title: 'Verified Employers',
                description: 'All companies on our platform are thoroughly verified for authenticity',
                color: 'success',
              },
              {
                icon: TrendingUp,
                title: 'Career Growth',
                description: 'Access resources and guidance to accelerate your professional journey',
                color: 'accent',
              },
              {
                icon: CheckCircle2,
                title: 'Transparent Process',
                description: 'Track your application status and get timely updates at every step',
                color: 'primary',
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 shadow-card hover:shadow-xl transition-all duration-300 animate-slide-up hover-lift group border border-border/50 hover:border-primary/30"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-${feature.color}/10 mb-4 group-hover:bg-${feature.color}/20 group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className={`h-7 w-7 text-${feature.color} group-hover:scale-110 transition-transform`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials / Success Stories Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-accent/5 pointer-events-none" />
        <div className="container relative">
          <div className="max-w-2xl mx-auto text-center mb-14 animate-fade-in">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
              Success stories
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Real people, real career growth
            </h2>
            <p className="text-muted-foreground text-base md:text-lg">
              Hear from job seekers and employers who found the right match through Elevate Workforce.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, index) => (
              <Card
                key={t.id}
                glass
                hover
                className="relative overflow-hidden animate-slide-up hover-lift border-border/60"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <CardContent className="p-6 relative flex flex-col h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-10 w-10 shadow-card">
                      <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
                        {t.avatarInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <p className="font-medium text-sm text-foreground">{t.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {t.role} • {t.company}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-5">
                    “{t.quote}”
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-3 border-t border-border/60">
                    <Badge
                      variant={t.type === 'job_seeker' ? 'accent' : 'primary'}
                      className="text-[10px] px-2 py-0.5"
                    >
                      {t.type === 'job_seeker' ? 'Job Seeker' : 'Employer'}
                    </Badge>
                    <span className="text-[11px] text-muted-foreground">
                      Powered by Elevate Workforce
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-primary p-8 md:p-12 lg:p-16 animate-fade-in shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzR2LTJIMjR2Mmgxek0zNiAzMHYtMkgyNHYyaDEyek0zNiAyNnYtMkgyNHYyaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
            
            {/* Animated gradient overlay */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl animate-pulse-soft" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: '1s' }} />
            
            <div className="relative grid lg:grid-cols-2 gap-8 items-center">
              <div className="animate-slide-in-left">
                <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-4 text-shadow-md">
                  Ready to Take the Next Step?
                </h2>
                <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                  Whether you're looking for your dream job or seeking top talent,
                  we're here to help you succeed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" variant="hero" className="hover-lift group shadow-xl" asChild>
                    <Link to="/register">
                      <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Find Jobs
                    </Link>
                  </Button>
                  <Button size="lg" variant="heroOutline" className="hover-lift group" asChild>
                    <Link to="/register?type=company">
                      <Building2 className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                      Post a Job
                    </Link>
                  </Button>
                </div>
              </div>
              
              <div className="hidden lg:block animate-slide-up" style={{ animationDelay: '200ms' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-primary-foreground/10 rounded-2xl transform rotate-3 animate-float" />
                  <div className="relative bg-card/10 backdrop-blur-md rounded-2xl p-6 border border-primary-foreground/20 shadow-xl hover-lift">
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-3 rounded-lg bg-primary-foreground/10 hover:bg-primary-foreground/15 transition-colors">
                          <div className="h-10 w-10 rounded-lg bg-primary-foreground/20 animate-pulse-soft" />
                          <div className="flex-1 space-y-2">
                            <div className="h-4 w-3/4 rounded bg-primary-foreground/20 animate-pulse-soft" />
                            <div className="h-3 w-1/2 rounded bg-primary-foreground/15 animate-pulse-soft" />
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
