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
import { fetchTeachers } from "../../features/teachers/TeachersSlice";
import Login from "../auth/Login";

const TeachersView = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { list = [], loading } = useSelector((state) => state.teachers);

  const [searchTerm, setSearchTerm] = useState("");

  // fetch teachers
  useEffect(() => {
    if (isAuthenticated) {
      // only fetch if logged in
      dispatch(fetchTeachers());
    }
  }, [dispatch, isAuthenticated]);

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Show loader
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        {/* UPDATED: Themed loader */}
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );
  }
  console.log(  "Teachers List:", list);

  const filteredTeachers = list.filter(
    (teacher) =>
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    // UPDATED: Card styles
    <div className="bg-white mt-16 rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* UPDATED: Header styles */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Teacher Management
          </h3>
          <button
            onClick={handleNavigate}
            // UPDATED: Themed button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Teacher
          </button>
        </div>
        <div className="relative">
          {/* UPDATED: Icon color */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search teachers by name or subject..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            // UPDATED: Themed search input
            className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent placeholder-slate-400"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* UPDATED: Table header styles */}
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Teacher ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Subject
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {/* UPDATED: Table body styles */}
          <tbody className="divide-y divide-slate-200">
            {filteredTeachers.map((teacher, idx) => (
              <tr
                key={teacher.teacherId}
                className="hover:bg-slate-50 transition-colors"
                style={{
                  animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* Kept your original avatar gradient */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                      {teacher.name.charAt(0)}
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-900">
                      {teacher.name}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {teacher.teacherId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {/* Kept your original badge color */}
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {teacher.subject}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {teacher.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {/* UPDATED: Themed icon button */}
                  <button
                    className="text-teal-600 hover:text-teal-800 transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TeachersView;