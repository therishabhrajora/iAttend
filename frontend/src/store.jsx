import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../src/features/auth/AuthSlice';
import uiReducer from './features/ui/UiSlice';
import dashboardReducer from './features/dashboard/DashboardSlice';
import studentsReducer from './features/students/StudentsSlice';
import teachersReducer from './features/teachers/TeachersSlice';
import attendanceReducer from './features/attendance/AttendanceSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    ui: uiReducer,
    dashboard: dashboardReducer,
    students: studentsReducer,
    teachers: teachersReducer,
    attendance: attendanceReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
