import "./App.css";

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
  Sidebar,
} from "lucide-react";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import AuthenticatedLayout from "./components/common/AuthenticatedLayout";
import PrivateRoute from "./components/common/PriavetRoute";
import Dashboard from "./components/views/Dashboard";
import StudentsView from "./components/views/StudentsView";
import TeachersView from "./components/views/TeachersView";
import AttendanceView from "./components/views/AttendanceView";
import SettingsView from "./components/views/SettingsView";
import Header from "./components/common/Header";
import { fetchCurrentUser } from "./features/auth/AuthSlice";

function App() {
  const dispatch = useDispatch();
  const { user, token, isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token && !user) {
      // Dispatch a thunk to fetch the logged-in user info
      dispatch(fetchCurrentUser());
    }
  }, [dispatch, token, user]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Private layout and nested routes */}
          <Route path="/" element={<AuthenticatedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="students" element={<StudentsView />} />
            <Route path="teachers" element={<TeachersView />} />
            <Route path="attendance" element={<AttendanceView />} />
            <Route path="settings" element={<SettingsView />} />
          </Route>

          {/* Catch-all fallback */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
