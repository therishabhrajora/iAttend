import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, CheckCircle, XCircle, Menu, X, Search, Bell, Settings, LogOut, Plus, Edit2, Trash2, AlertCircle, Loader, BookOpen, GraduationCap, Building2, User, LogIn, UserPlus } from 'lucide-react';



const StatCard = React.memo(({ icon: Icon, title, value, subtitle, color, delay }) => {
    // ... (Component remains the same, but now gets data from the Redux-connected Dashboard)
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => { const timer = setTimeout(() => setIsVisible(true), delay); return () => clearTimeout(timer); }, [delay]);

    return (
        <div className={`bg-white rounded-xl shadow-sm p-6 border border-gray-100 transition-all duration-500 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hover:shadow-md hover:-translate-y-1`}>
            <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-br ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
            </div>
            <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
            <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
        </div>
    );
});

export default StatCard;