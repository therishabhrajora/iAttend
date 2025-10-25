import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, CheckCircle, XCircle, Menu, X, Search, Bell, Settings, LogOut, Plus, Edit2, Trash2, AlertCircle, Loader, BookOpen, GraduationCap, Building2, User, LogIn, UserPlus } from 'lucide-react';



const Sidebar = () => {
 
    const dispatch = useDispatch();
    const sidebarOpen = useSelector(state => state.ui.sidebarOpen);

    
    const navigate = useNavigate();
    const activePath = window.location.pathname.split('/')[1] || 'dashboard';
    const user = useSelector(state => state.auth.user);
   

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: GraduationCap, roles: ['COLLEGE', 'TEACHER', 'STUDENT'] },
        { id: 'students', label: 'Students', icon: Users, roles: ['COLLEGE', 'TEACHER'] },
        { id: 'teachers', label: 'Teachers', icon: BookOpen, roles: ['COLLEGE'] },
        { id: 'attendance', label: 'Attendance', icon: Calendar, roles: ['COLLEGE', 'TEACHER'] },
        { id: 'settings', label: 'Settings', icon: Settings, roles: ['COLLEGE', 'TEACHER', 'STUDENT'] },
    ];

    return (
        <aside 
            className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 transition-all duration-300 z-20 ${
                sidebarOpen ? 'w-64' : 'w-0'
            } overflow-hidden`}
        >
            <nav className="p-4 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <button
                            key={item.id}
                            onClick={() => navigate(`/${item.id}`)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                                activePath === item.id
                                    ? 'bg-blue-50 text-blue-600 font-medium'
                                    : 'text-gray-700 hover:bg-gray-50'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.label}</span>
                        </button>
                    );
                })}
            </nav>
        </aside>
    );
};

export default Sidebar;