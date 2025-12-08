// User Types
export type UserType = 'job_seeker' | 'company';

export interface User {
  id: string;
  email: string;
  userType: UserType;
  fullName: string;
  createdAt: Date;
  avatar?: string;
}

export interface JobSeeker extends User {
  userType: 'job_seeker';
  phone?: string;
  location?: string;
  resume?: string;
  skills: string[];
  experience: string;
  education: string;
}

export interface Company extends User {
  userType: 'company';
  companyName: string;
  industry: string;
  description: string;
  website?: string;
  logo?: string;
  location: string;
  size: string;
  foundedYear?: number;
}

// Job Types
export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship' | 'remote';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';
export type ApplicationStatus = 'pending' | 'reviewed' | 'accepted' | 'rejected';

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo?: string;
  location: string;
  jobType: JobType;
  experienceLevel: ExperienceLevel;
  salaryMin: number;
  salaryMax: number;
  currency: string;
  description: string;
  requirements: string[];
  benefits: string[];
  category: string;
  skills: string[];
  postedAt: Date;
  deadline: Date;
  isActive: boolean;
  applicationsCount: number;
}

export interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  companyName: string;
  applicantId: string;
  applicantName: string;
  applicantEmail: string;
  coverLetter: string;
  resume?: string;
  status: ApplicationStatus;
  appliedAt: Date;
  updatedAt: Date;
}

// Filter Types
export interface JobFilters {
  search: string;
  location: string;
  category: string;
  jobType: JobType | '';
  experienceLevel: ExperienceLevel | '';
  salaryMin: number;
  salaryMax: number;
}

// Auth Types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials extends LoginCredentials {
  fullName: string;
  userType: UserType;
  companyName?: string;
}

// Pagination
export interface PaginationState {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}
