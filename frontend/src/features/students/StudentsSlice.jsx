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

export const fetchStudents = createAsyncThunk("students/fetchAll", async () => {
  const response = await api.get(`/student/all`);
  return response;
});

export const fetchStudentAttendance = createAsyncThunk(
  "students/fetchAttendance",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await api.get(`/attendance/stu/${studentId}`);
      console.log("Attendance for Student API response:", response);
      return response;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const studentsSlice = createSlice({
  name: "students",
  initialState: {
    list: [],
    loading: false,
    selectedStudent: null,
    studentAttendance: [],
  },
  reducers: {
    setSelectedStudent: (state, action) => {
      state.selectedStudent = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchStudentAttendance.fulfilled, (state, action) => {
        state.studentAttendance = action.payload;
      });
  },
});

export default studentsSlice.reducer;

export const { setSelectedStudent } = studentsSlice.actions;
