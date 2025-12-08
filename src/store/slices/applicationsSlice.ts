import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Application, ApplicationStatus } from '@/models/types';
import { mockApplications } from '@/data/mockData';

interface ApplicationsState {
  items: Application[];
  selectedApplication: Application | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: ApplicationsState = {
  items: [],
  selectedApplication: null,
  isLoading: false,
  error: null,
};

export const fetchApplications = createAsyncThunk(
  'applications/fetchApplications',
  async (_, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return mockApplications;
    } catch (error) {
      return rejectWithValue('Failed to fetch applications');
    }
  }
);

const applicationsSlice = createSlice({
  name: 'applications',
  initialState,
  reducers: {
    addApplication: (state, action: PayloadAction<Application>) => {
      state.items.unshift(action.payload);
    },
    updateApplicationStatus: (
      state,
      action: PayloadAction<{ id: string; status: ApplicationStatus }>
    ) => {
      const application = state.items.find((app) => app.id === action.payload.id);
      if (application) {
        application.status = action.payload.status;
        application.updatedAt = new Date();
      }
    },
    selectApplication: (state, action: PayloadAction<string>) => {
      state.selectedApplication =
        state.items.find((app) => app.id === action.payload) || null;
    },
    clearSelectedApplication: (state) => {
      state.selectedApplication = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  addApplication,
  updateApplicationStatus,
  selectApplication,
  clearSelectedApplication,
} = applicationsSlice.actions;
export default applicationsSlice.reducer;
