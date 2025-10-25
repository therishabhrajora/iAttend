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
// IMPORTED: Added 'addNotification'
import { addNotification } from "../../features/ui/UiSlice";
import StudentTable from "./StudentTable";
import { fetchAttendanceRecords } from "../../features/attendance/AttendanceSlice";

const StudentsView = () => {
  const dispatch = useDispatch();
  const { records } = useSelector((state) => state.attendance);
  const { list, loading, selectedStudent,studentAttendance } = useSelector(
    (state) => state.students
  );


  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const handleViewAttendance = (student) => {
    dispatch(setSelectedStudent(student));
    dispatch(
      addNotification({
        type: "info",
        message: `Fetching attendance for ${student.name}...`,
      })
    );
    dispatch(fetchStudentAttendance(student.id));
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-64 mt-16">
        {/* UPDATED: Themed loader color */}
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="space-y-6 mt-16">
      <StudentTable students={list} onViewAttendance={handleViewAttendance} />

      {selectedStudent && (
        // UPDATED: Card styles
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
          {/* UPDATED: Text color */}
          <h4 className="text-xl font-semibold text-slate-900 mb-4">
            Attendance History for {selectedStudent.name} (
            {selectedStudent.rollNumber})
          </h4>
          <div className="overflow-x-auto">
            {/* UPDATED: Table colors */}
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Teacher
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-200">
                {studentAttendance.length > 0 ? (
                  // FIXED: Changed 'student' to 'record' and key to 'record.id'
                  studentAttendance.map((record) => (
                    <tr key={record.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">
                        {record.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {record.subject}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                        {record.teacher.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 text-xs font-medium rounded-full  ${
                            // FIXED: Changed to 'record.status' and 'present'
                            record.status === "present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-4 text-center text-sm text-slate-500"
                    >
                      No attendance records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsView;
