import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import api from "../../api/apis";

// 🔐 Retrieve token if available
const token = localStorage.getItem("token");

// 🌟 Initial state
const authInitialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  role: localStorage.getItem("role") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  loading: false,
  error: null,
  message: null,
};

// 🔹 LOGIN THUNK
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password, role }, { rejectWithValue }) => {
    try {
      console.log("in try");
      const roleLower = role.toLowerCase();
      const endpoint = `/api/auth/${roleLower}/login`;
      const response = await api.post(
        endpoint,
        { email, password, roleLower },
        roleLower
      );
     

      return { message: response.data.message || "OTP sent" };
    } catch (error) {
      console.log("❌ Login Catch:", error);
      return rejectWithValue(
        error.response?.data?.message || error.message || "Login failed."
      );
    }
  }
);

// 🔹 REGISTER THUNK (completed)
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ role, endpoint, data }, { rejectWithValue }) => {
    try {
      const finalEndpoint = `/api/auth${endpoint}`;

      const response = await api.post(finalEndpoint, data, role);
      return response;
    } catch (error) {
      // console.log("❌ Register Catch:", error);
      return rejectWithValue(error.response?.data || "Registration failed");
    }
  }
);

export const fetchCurrentUser = createAsyncThunk(
  "auth/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/me");
      return response.data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user info");
    }
  }
);

export const verifyOtp = createAsyncThunk(
  "auth/verifyOtp",
  async ({ email, otp, role }, { rejectWithValue }) => {
    try {
      console.log("Verifying OTP for:", email, role);
      const res = await api.post(`/api/auth/verify-otp`, { email, otp, role });
      
     

      console.log("OTP Verification Response:", res);
      const { token, user, userRole } = res;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", userRole);

      return res;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Invalid OTP");
    }
  }
);

// 🔹 SLICE
const authSlice = createSlice({
  name: "auth",
  initialState: authInitialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Login flow
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message; // OTP sent message
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 🔹 Register flow
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ✅ Verify OTP

      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.userRole;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
