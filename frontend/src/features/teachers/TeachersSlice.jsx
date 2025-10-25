import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, CheckCircle, XCircle, Menu, X, Search, Bell, Settings, LogOut, Plus, Edit2, Trash2, AlertCircle, Loader, BookOpen, GraduationCap, Building2, User, LogIn, UserPlus } from 'lucide-react';
import api from '../../api/apis';



export const fetchTeachers = createAsyncThunk('teachers/fetchAll', async () => {
    const response = await api.get(`/teacher/all`);
    return response;
});

const teachersSlice = createSlice({
    name: 'teachers',
    initialState: { list: [], loading: false },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTeachers.pending, (state) => { state.loading = true; })
            .addCase(fetchTeachers.fulfilled, (state, action) => { state.loading = false; state.list = action.payload; });
    },
});

export default teachersSlice.reducer;