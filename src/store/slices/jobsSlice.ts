import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Job, JobFilters, PaginationState } from '@/models/types';
import { mockJobs } from '@/data/mockData';

interface JobsState {
  items: Job[];
  filteredItems: Job[];
  selectedJob: Job | null;
  filters: JobFilters;
  pagination: PaginationState;
  isLoading: boolean;
  error: string | null;
}

const initialFilters: JobFilters = {
  search: '',
  location: '',
  category: '',
  jobType: '',
  experienceLevel: '',
  salaryMin: 0,
  salaryMax: 500000,
};

const initialState: JobsState = {
  items: [],
  filteredItems: [],
  selectedJob: null,
  filters: initialFilters,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  isLoading: false,
  error: null,
};

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async (_, { rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return mockJobs;
  } catch (error) {
    return rejectWithValue('Failed to fetch jobs');
  }
});

const applyFilters = (jobs: Job[], filters: JobFilters): Job[] => {
  return jobs.filter((job) => {
    const matchesSearch =
      !filters.search ||
      job.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.companyName.toLowerCase().includes(filters.search.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesLocation =
      !filters.location ||
      job.location.toLowerCase().includes(filters.location.toLowerCase());

    const matchesCategory =
      !filters.category || job.category.toLowerCase() === filters.category.toLowerCase();

    const matchesJobType = !filters.jobType || job.jobType === filters.jobType;

    const matchesExperience =
      !filters.experienceLevel || job.experienceLevel === filters.experienceLevel;

    const matchesSalary =
      job.salaryMin >= filters.salaryMin && job.salaryMax <= filters.salaryMax;

    return (
      matchesSearch &&
      matchesLocation &&
      matchesCategory &&
      matchesJobType &&
      matchesExperience &&
      matchesSalary &&
      job.isActive
    );
  });
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<Partial<JobFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredItems = applyFilters(state.items, state.filters);
      state.pagination.totalItems = state.filteredItems.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / state.pagination.itemsPerPage
      );
      state.pagination.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = initialFilters;
      state.filteredItems = state.items.filter((job) => job.isActive);
      state.pagination.totalItems = state.filteredItems.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / state.pagination.itemsPerPage
      );
      state.pagination.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    selectJob: (state, action: PayloadAction<string>) => {
      state.selectedJob = state.items.find((job) => job.id === action.payload) || null;
    },
    clearSelectedJob: (state) => {
      state.selectedJob = null;
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.items.unshift(action.payload);
      state.filteredItems = applyFilters(state.items, state.filters);
      state.pagination.totalItems = state.filteredItems.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / state.pagination.itemsPerPage
      );
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.items.findIndex((job) => job.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = action.payload;
        state.filteredItems = applyFilters(state.items, state.filters);
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((job) => job.id !== action.payload);
      state.filteredItems = applyFilters(state.items, state.filters);
      state.pagination.totalItems = state.filteredItems.length;
      state.pagination.totalPages = Math.ceil(
        state.filteredItems.length / state.pagination.itemsPerPage
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload.filter((job) => job.isActive);
        state.pagination.totalItems = state.filteredItems.length;
        state.pagination.totalPages = Math.ceil(
          state.filteredItems.length / state.pagination.itemsPerPage
        );
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  selectJob,
  clearSelectedJob,
  addJob,
  updateJob,
  deleteJob,
} = jobsSlice.actions;
export default jobsSlice.reducer;
