import React, { createContext, useContext, useReducer, useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Provider, useDispatch, useSelector } from 'react-redux';

import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Users, Calendar, CheckCircle, XCircle, Menu, X, Search, Bell, Settings, LogOut, Plus, Edit2, Trash2, AlertCircle, Loader, BookOpen, GraduationCap, Building2, User, LogIn, UserPlus } from 'lucide-react';
import { removeNotification } from '../../features/ui/UiSlice';



const NotificationToast = ({ notification }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(removeNotification(notification.id));
        }, 2000);
        return () => clearTimeout(timer);
    }, [dispatch, notification.id]);

    const icons = {
        success: <CheckCircle className="w-5 h-5 text-green-600" />,
        error: <AlertCircle className="w-5 h-5 text-red-600" />,
        info: <AlertCircle className="w-5 h-5 text-blue-600" />,
    };

    return (
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex items-center gap-3 min-w-80 animate-slideIn">
            {icons[notification.type]}
            <p className="text-sm text-gray-700 flex-1">{notification.message}</p>
            <button 
                onClick={() => dispatch(removeNotification(notification.id))}
                className="text-gray-400 hover:text-gray-600"
            >
                <X className="w-4 h-4" />
            </button>
        </div>
    );
};


const NotificationContainer = () => {
    const notifications = useSelector(state => state.ui.notifications);
    return (
        <div className="fixed bottom-6 right-6 space-y-3 z-50">
            {notifications.map(notification => (
                <NotificationToast key={notification.id} notification={notification} />
            ))}
        </div>
    );
};


export default NotificationContainer;