import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {showToast} from '../../../utils/toast';

// Define types
interface User {
  id: string;
  iqamaId: string;
  name: string;
  email: string;
  profileImage?: string;
  lastLogin?: string;
  joinDate?: string;
  phone?: string;
  role?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  lastLoginDate: string | null;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  lastLoginDate: null,
};

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async (
    credentials: {username: string; password: string},
    {rejectWithValue},
  ) => {
    try {
      // For now, we'll simulate a successful login
      // Later, replace this with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Get current date for login timestamp
      const currentDate = new Date();
      const formattedDate = currentDate.toISOString();

      // Simulated response
      const response = {
        user: {
          id: '1',
          iqamaId: credentials.username,
          name: 'Test User',
          email: 'testuser@example.com',
          profileImage: null,
          joinDate: '2023-01-15T08:30:00Z',
          phone: '+966 50 123 4567',
          role: 'Technician',
        },
        token: 'dummy_token',
        lastLoginDate: formattedDate,
      };

      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  },
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.error = null;
      state.isAuthenticated = false;
    },
    updateUserProfile: (state, action) => {
      if (state.user) {
        state.user = {...state.user, ...action.payload};
      }
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isAuthenticated = true;
        state.lastLoginDate = action.payload.lastLoginDate;
        showToast({
          type: 'success',
          message: 'Login successful',
        });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        state.isAuthenticated = false;
        showToast({
          type: 'danger',
          message: state.error || 'Login failed',
        });
      });
  },
});

export const {logout, updateUserProfile} = authSlice.actions;
export default authSlice.reducer;
