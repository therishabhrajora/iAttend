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
import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";
// export const API_BASE_URL = "https://iattend-yvjs.onrender.com";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const api = {
  get: async (url) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    if (url.includes("/student/all")) {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE_URL}/student/all`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
      } catch (error) {
        return error;
      }
    }

    if (url.includes("/college/all")) {
      try {
        const response = await axios.get(`${API_BASE_URL}${url}`);
        return response.data;
      } catch (error) {
        console.error("Dashboard API error:", error);
      }
    }

    if (url.includes("/teacher/all")) {
      try {
        const response = await axios.get(`${API_BASE_URL}${url}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching student attendance:", error);
        return { error: error.response?.data || error.message };
      }
    }
    if (url.includes("/attendance/stu")) {
      try {
        console.log(`${API_BASE_URL}${url}`);
        const response = await axios.get(`${API_BASE_URL}${url}`);
        return response.data;
      } catch (error) {
        console.error("Error fetching student attendance:", error);
        return { error: error.response?.data || error.message };
      }
    } else if (url.includes("/attendance")) {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_BASE_URL}${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        return response.data;
      } catch (error) {
        return { error: error.response?.data || error.message };
      }
    }

    if (url.includes("/dashboard")) {
      try {
        const token = localStorage.getItem("token");

        if (token) {
          const response = await axios.get(`${API_BASE_URL}/dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
            params: { date: Date.now() },
          });
          return response.data;
        } else {
          return null;
        }
      } catch (error) {
        // console.error("Dashboard API error:", error);
      }
    }
  },

  post: async (url, data, role) => {
    await new Promise((resolve) => setTimeout(resolve, 600));
   
    if (url.includes(`/api/auth/${role}/login`)) {
      const endpoint = `${API_BASE_URL}${url}`;
      const response = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });
      console.log( "📡 POST Response:", response);
     
      return response;
    }

    if (url.includes(`/api/auth/${role}/register`)) {
      const endpoint = `${API_BASE_URL}${url}`;
      // console.log("📡 POST Request:", endpoint, data);

      const response = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });

      return response.data;
    }

    if (url.includes("/verify-otp")) {
      const endpoint = `${API_BASE_URL}${url}`;
     
      const response = await axios.post(endpoint, data, {
        headers: { "Content-Type": "application/json" },
      });
      // Return full response data (including token, user, role)
      return response.data;
    }
    return { data: { ...data, id: Date.now().toString() } };
  },

  put: async (url, data) => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    if (url.includes("/attendance/mark")) {
      try {
        const token = localStorage.getItem("token");

        const response = await axios.put(
          `${API_BASE_URL}/attendance/mark`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        return response.data;
      } catch (error) {
        console.error("Error in PUT request:", error);
        throw error.response?.data || error.message;
      }
    }
    return { data: data };
  },
};

export default api;
