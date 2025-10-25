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
  // Removed 'Sidebar' as it's not a lucide-react icon
} from "lucide-react";
import { fetchDashboardData } from "../../features/dashboard/DashboardSlice";
import StatCard from "../charts/StatCard";
import AttendanceChart from "../charts/AttendanceChart";
import SubjectAttendanceChart from "../charts/SubjectAttendanceChart";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, [dispatch]);

  if (loading)
    return (
      // UPDATED: Full height (minus header) for better centering
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        {/* UPDATED: Themed loader color */}
        <Loader className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );

  if (error)
    return (
      // UPDATED: Professional error card
      <div className="flex items-center justify-center h-[calc(100vh-10rem)]">
        <div className="bg-red-50 border border-red-300 rounded-lg p-6 flex flex-col items-center max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            Failed to Load Dashboard
          </h3>
          <p className="text-red-700 text-sm">Error: {error}</p>
        </div>
      </div>
    );

  if (!data) return null;

  return (
    <div className="space-y-6 mt-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          title="Total Students"
          value={data?.totalStudents?.toLocaleString() || "0"}
          subtitle="Active enrollments"
          // UPDATED: Kept blue as a good primary color
          color="from-blue-500 to-blue-600"
          delay={0}
        />
        <StatCard
          icon={BookOpen}
          title="Total Teachers"
          value={data?.totalTeachers?.toLocaleString() || "0"}
          subtitle="Faculty members"
          // UPDATED: Changed to a modern teal
          color="from-teal-500 to-teal-600"
          delay={100}
        />
        <StatCard
          icon={CheckCircle}
          title="Present Today"
          value={data?.todayPresent?.toLocaleString() || "0"}
          subtitle={`Attendance rate: ${data?.attendanceRate || 0}%`}
          // UPDATED: Aligned with our main theme
          color="from-purple-500 to-indigo-600"
          delay={200}
        />
        <StatCard
          icon={XCircle}
          title="Absent Today"
          value={data?.todayAbsent?.toLocaleString() || "0"}
          subtitle="Require follow-up"
          // UPDATED: Vibrant red-to-orange for "// alert"
          color="from-red-500 to-orange-600"
          delay={300}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* These components will be styled based on their own files */}
        <AttendanceChart data={data?.weeklydata || []} />
        <SubjectAttendanceChart data={data?.subjectWiseAttendance || []} />
      </div>
    </div>
  );
};
export default Dashboard;