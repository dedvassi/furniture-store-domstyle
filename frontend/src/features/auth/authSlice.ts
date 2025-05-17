import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';

interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  user: {
    id: number | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    role: string | null;
  };
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  user: {
    id: null,
    email: null,
    firstName: null,
    lastName: null,
    role: null,
  },
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setUser(state, action: PayloadAction<{ id: number; email: string; firstName?: string; lastName?: string; role: string }>) {
      state.user = {
        id: action.payload.id,
        email: action.payload.email,
        firstName: action.payload.firstName || null,
        lastName: action.payload.lastName || null,
        role: action.payload.role,
      };
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = {
        id: null,
        email: null,
        firstName: null,
        lastName: null,
        role: null,
      };
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, setUser, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
