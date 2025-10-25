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
import {
  fetchStudentAttendance,
  fetchStudents,
  setSelectedStudent,
} from "../../features/students/StudentsSlice";

const StudentTable = React.memo(({ students, onViewAttendance }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentClass.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const handleNavigate = () => {
    navigate("/register");
  };

  return (
    // UPDATED: Card styles
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      {/* UPDATED: Header styles */}
      <div className="p-6 border-b border-slate-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between mb-4 gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Student Management
          </h3>
          <button
            onClick={handleNavigate}
            // UPDATED: Themed button
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md"
          >
            <Plus className="w-4 h-4" /> Add Student
          </button>
        </div>
        <div className="relative">
          {/* UPDATED: Icon color */}
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by name, roll number, or class..."
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
                Roll Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                Class
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
            {filteredStudents.map((student, idx) => (
              <tr
                key={student.rollNumber}
                className="hover:bg-slate-50 transition-colors"
                style={{
                  animation: `fadeIn 0.3s ease-out ${idx * 0.05}s both`,
                }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {student.rollNumber}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {/* UPDATED: Themed avatar */}
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium flex-shrink-0">
                      {student.name.charAt(0)}
                    </div>
                    <span className="ml-3 text-sm font-medium text-slate-900">
                      {student.name}
                    </span>
                  </div>
                </td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {/* UPDATED: Themed badge */}
                  <span className="px-3 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                    {student.studentClass}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                  {student.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  {/* UPDATED: Themed icon buttons */}
                  <button
                    onClick={() => onViewAttendance(student)}
                    className="text-purple-600 hover:text-purple-800 mr-3 transition-colors"
                    title="View Attendance"
                  >
                    <Calendar className="w-4 h-4" />
                  </button>
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
});

export default StudentTable;