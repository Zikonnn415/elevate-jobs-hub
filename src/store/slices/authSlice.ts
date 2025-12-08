import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AuthState, User, LoginCredentials, RegisterCredentials } from '@/models/types';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Check for existing user in localStorage
const storedUser = localStorage.getItem('user');
if (storedUser) {
  try {
    const parsed = JSON.parse(storedUser);
    initialState.user = parsed;
    initialState.isAuthenticated = true;
  } catch (e) {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  }
}

// Mock login async thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock users
      const mockUsers: Record<string, User & { password: string }> = {
        'seeker@test.com': {
          id: '1',
          email: 'seeker@test.com',
          password: 'password123',
          userType: 'job_seeker',
          fullName: 'John Doe',
          createdAt: new Date(),
        },
        'company@test.com': {
          id: '2',
          email: 'company@test.com',
          password: 'password123',
          userType: 'company',
          fullName: 'TechCorp Nepal',
          createdAt: new Date(),
        },
      };

      const user = mockUsers[credentials.email];
      if (user && user.password === credentials.password) {
        const { password, ...userWithoutPassword } = user;
        const token = `mock-jwt-token-${Date.now()}`;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return userWithoutPassword as User;
      }
      
      return rejectWithValue('Invalid email or password');
    } catch (error) {
      return rejectWithValue('Login failed. Please try again.');
    }
  }
);

// Mock register async thunk
export const register = createAsyncThunk(
  'auth/register',
  async (credentials: RegisterCredentials, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: `user-${Date.now()}`,
        email: credentials.email,
        userType: credentials.userType,
        fullName: credentials.fullName,
        createdAt: new Date(),
      };

      const token = `mock-jwt-token-${Date.now()}`;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    } catch (error) {
      return rejectWithValue('Registration failed. Please try again.');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    clearError: (state) => {
      state.error = null;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem('user', JSON.stringify(state.user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logout, clearError, updateUser } = authSlice.actions;
export default authSlice.reducer;
