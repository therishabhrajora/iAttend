import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { Loader } from 'lucide-react';


const PrivateRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);

  if (loading) return <div className="flex items-center justify-center h-screen"><Loader className="w-8 h-8 animate-spin text-blue-600" /></div>;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" replace />; // Redirect unauthorized
  }

  return children;
};


export default PrivateRoute;