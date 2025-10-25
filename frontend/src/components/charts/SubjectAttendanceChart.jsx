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

const SubjectAttendanceChart = React.memo(({ data }) => {
  const COLORS = ["#3b82f6", "#8b5cf6", "#ec4899", "#f59e0b"];
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Subject-wise Attendance
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="60%"
            cy="50%"
            labelLine={false}
            label={({ subject, attendance, x, y }) => (
              <text
                x={x}
                y={y}
                fill="#333"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={14} // 👈 Change font size here
                fontWeight="500"
              >
                {`${subject}: ${attendance}%`}
              </text>
            )}
            outerRadius={80}
            fill="#8884d8"
            dataKey="attendance"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
});

export default SubjectAttendanceChart;
