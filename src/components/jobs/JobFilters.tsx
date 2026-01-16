import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppDispatch';
import { setFilters, clearFilters } from '@/store/slices/jobsSlice';
import { categories, locations } from '@/data/mockData';
import { Search, MapPin, Briefcase, TrendingUp, Filter, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface JobFiltersProps {
  variant?: 'hero' | 'sidebar';
}

export function JobFilters({ variant = 'sidebar' }: JobFiltersProps) {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.jobs.filters);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const handleSearchChange = (value: string) => {
    dispatch(setFilters({ search: value }));
  };

  const handleLocationChange = (value: string) => {
    dispatch(setFilters({ location: value === 'all' ? '' : value }));
  };

  const handleCategoryChange = (value: string) => {
    dispatch(setFilters({ category: value === 'all' ? '' : value }));
  };

  const handleJobTypeChange = (value: string) => {
    dispatch(setFilters({ jobType: value === 'all' ? '' : value as any }));
  };

  const handleExperienceChange = (value: string) => {
    dispatch(setFilters({ experienceLevel: value === 'all' ? '' : value as any }));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters =
    filters.search ||
    filters.location ||
    filters.category ||
    filters.jobType ||
    filters.experienceLevel;

  if (variant === 'hero') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex flex-col sm:flex-row gap-3 p-2 bg-card rounded-2xl shadow-xl border border-border/50 hover:shadow-2xl transition-all duration-300 hover-lift">
          <div className="flex-1 relative">
            <Input
              placeholder="Job title, keywords, or company"
              value={filters.search}
              onChange={(e) => handleSearchChange(e.target.value)}
              icon={<Search className="h-5 w-5" />}
              className="border-0 bg-transparent h-12 text-base focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div className="h-12 w-px bg-border hidden sm:block" />
          <div className="flex-1">
            <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
              <SelectTrigger className="border-0 bg-transparent h-12 hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-muted-foreground" />
                  <SelectValue placeholder="Location" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button size="lg" className="h-12 px-8 hover-lift shadow-md">
            <Search className="h-5 w-5 mr-2" />
            Search Jobs
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <Button
          variant="outline"
          className="w-full justify-between"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <span className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
            {hasActiveFilters && (
              <span className="h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                !
              </span>
            )}
          </span>
          {showMobileFilters ? <X className="h-4 w-4" /> : null}
        </Button>
      </div>

      {/* Filter Panel */}
      <div
        className={cn(
          "bg-card rounded-xl border border-border/50 p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow",
          "lg:block",
          showMobileFilters ? "block animate-slide-up" : "hidden"
        )}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-lg">Filters</h3>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear all
            </Button>
          )}
        </div>

        {/* Search */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Search</label>
          <Input
            placeholder="Job title or keyword"
            value={filters.search}
            onChange={(e) => handleSearchChange(e.target.value)}
            icon={<Search className="h-4 w-4" />}
          />
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            Location
          </label>
          <Select value={filters.location || 'all'} onValueChange={handleLocationChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc) => (
                <SelectItem key={loc} value={loc}>
                  {loc}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
            Category
          </label>
          <Select value={filters.category || 'all'} onValueChange={handleCategoryChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Job Type */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Job Type</label>
          <Select value={filters.jobType || 'all'} onValueChange={handleJobTypeChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="full-time">Full Time</SelectItem>
              <SelectItem value="part-time">Part Time</SelectItem>
              <SelectItem value="contract">Contract</SelectItem>
              <SelectItem value="internship">Internship</SelectItem>
              <SelectItem value="remote">Remote</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Experience Level */}
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
            Experience Level
          </label>
          <Select value={filters.experienceLevel || 'all'} onValueChange={handleExperienceChange}>
            <SelectTrigger>
              <SelectValue placeholder="All Levels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              <SelectItem value="entry">Entry Level</SelectItem>
              <SelectItem value="mid">Mid Level</SelectItem>
              <SelectItem value="senior">Senior Level</SelectItem>
              <SelectItem value="executive">Executive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </>
  );
}
