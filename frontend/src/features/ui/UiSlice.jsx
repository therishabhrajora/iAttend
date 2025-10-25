import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    sidebarOpen: true,
    notifications: [],
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action) => {
      state.notifications.push({ id: Date.now(), ...action.payload });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(
        (n) => n.id !== action.payload
      );
    },
    // --- ADDED THIS REDUCER ---
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export default uiSlice.reducer;

// --- AND ADDED IT TO THE EXPORT LIST ---
export const {
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications, // <-- Added this
} = uiSlice.actions;