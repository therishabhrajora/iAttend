import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useState,
  useMemo,
} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Users,
  Calendar,
  CheckCircle,
  XCircle,
  Menu,
  X,
  Search,
  Bell,
  Settings,
  LogOut,
  Plus,
  Edit2,
  Trash2,
  AlertCircle,
  Loader,
  BookOpen,
  GraduationCap,
  Building2,
  User,
  LogIn,
  UserPlus,
} from "lucide-react";
import api from "../../api/apis";

export const fetchAttendanceRecords = createAsyncThunk(
  "attendance/fetchRecords",
  async (date) => {
    const response= await api.get(`/attendance/${date}`);
    return response;
  }
);

export const updateAttendanceRecords = createAsyncThunk(
  "attendance/updateRecords",
  async (recordsToUpdate) => {
    const response = await api.put(`/attendance/mark`, recordsToUpdate);
    return response.data;
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState: { records: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAttendanceRecords.pending, (state) => {
        state.loading = true;

      })
      .addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Fetched attendance records:", action.payload);
        state.records = action.payload;
      });
  },
});

export default attendanceSlice.reducer;
