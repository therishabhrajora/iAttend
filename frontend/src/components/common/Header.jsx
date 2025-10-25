import React, {
  useEffect,
  useState,
  useRef, // Added useRef
} from "react";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import {
  CheckCircle, // For success notifications
  XCircle, // For error notifications
  Menu,
  X,
  Bell,
  Settings,
  LogOut,
  AlertCircle, // For info notifications
  Trash, // For Clear All
} from "lucide-react";
import { logout } from "../../features/auth/AuthSlice";
// UPDATED: Added clearNotifications (assuming it exists in your slice)
import { addNotification, toggleSidebar } from "../../features/ui/UiSlice";

// --- NEW: Helper to get icon and colors for notifications ---
const notificationConfig = {
  info: {
    icon: AlertCircle,
    color: "text-blue-600",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
  },
  error: {
    icon: XCircle,
    color: "text-red-600",
  },
};

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);
  const notifications = useSelector((state) => state.ui.notifications);
  const user = useSelector((state) => state.auth.user);

  // --- State for profile dropdown ---
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileMenuRef = useRef(null);

  // --- NEW: State for notification dropdown ---
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const notificationMenuRef = useRef(null);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(
      addNotification({
        type: "info",
        message: "You have been successfully logged out.",
      })
    );
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  // --- NEW: Function to dispatch clear notifications ---
  const handleClearNotifications = () => {
    // TODO: Make sure 'clearNotifications' action exists in your UiSlice
    // dispatch(clearNotifications());

    setIsNotificationOpen(false); // Close menu after clearing
  };

  // --- Effect to close dropdowns on outside click ---
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close profile menu
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
      // Close notification menu
      if (
        notificationMenuRef.current &&
        !notificationMenuRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profileMenuRef, notificationMenuRef]); // Added notificationMenuRef

  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-30 shadow-sm">
      <div className="h-full px-4 sm:px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={() => dispatch(toggleSidebar())}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            {sidebarOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              iAttend
            </h1>
            <span className="hidden sm:inline-block px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium capitalize">
              {user?.role?.toLowerCase() || "guest"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* --- NEW: Notification Dropdown Container --- */}
          <div className="relative" ref={notificationMenuRef}>
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="relative p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-300"
            >
              <Bell className="w-5 h-5" />
              {notifications.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              )}
            </button>

            {/* --- NEW: Notification Dropdown Menu --- */}
            {isNotificationOpen && (
              <div
                className="absolute top-12 right-0 w-80 sm:w-96 max-h-[70vh] flex flex-col bg-white rounded-lg shadow-xl border border-slate-200 z-40 overflow-hidden"
                style={{ animation: "fadeIn 0.1s ease-out" }}
              >
                <div className="flex items-center justify-between p-3 border-b border-slate-200">
                  <h4 className="text-sm font-semibold text-slate-900">
                    Notifications
                  </h4>
                  {notifications.length > 0 && (
                    <button
                      onClick={handleClearNotifications}
                      className="flex items-center gap-1 text-xs text-red-600 hover:text-red-800 transition-colors"
                      title="Clear all notifications"
                    >
                      <Trash className="w-3 h-3" />
                      Clear All
                    </button>
                  )}
                </div>
                <div className="overflow-y-auto">
                  {notifications.length > 0 ? (
                    <nav className="p-1">
                      {notifications.map((notif, index) => {
                        const config =
                          notificationConfig[notif.type] ||
                          notificationConfig.info;
                        const Icon = config.icon;
                        return (
                          <div
                            key={index} // Use a unique ID if notif has one
                            className="flex items-start gap-3 p-3 text-sm text-slate-700 rounded-md"
                          >
                            <Icon
                              className={`w-5 h-5 ${config.color} flex-shrink-0 mt-0.5`}
                            />
                            <span>{notif.message}</span>
                          </div>
                        );
                      })}
                    </nav>
                  ) : (
                    <p className="text-sm text-slate-500 text-center p-6">
                      You have no new notifications.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={profileMenuRef}>
            <button
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-white font-medium cursor-pointer hover:shadow-md transition-shadow ring-2 ring-offset-2 ring-transparent focus:outline-none focus:ring-indigo-300"
              title="Open profile menu"
            >
              {user?.email?.charAt(0).toUpperCase() || "A"}
            </button>

            {isProfileOpen && (
              <div
                className="absolute top-12 right-0 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-40 overflow-hidden"
                style={{ animation: "fadeIn 0.1s ease-out" }}
              >
                <div className="p-3 border-b border-slate-200">
                  <p
                    className="text-sm font-semibold text-slate-900 truncate"
                    title={user?.name}
                  >
                    {user?.name || "User Name"}
                  </p>
                  <p
                    className="text-xs text-slate-500 truncate"
                    title={user?.email}
                  >
                    {user?.email || "user@example.com"}
                  </p>
                </div>
                <nav className="p-1">
                  <button
                    onClick={() => {
                      navigate("/settings");
                      setIsProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-700 rounded-md hover:bg-slate-50 transition-colors"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 rounded-md hover:bg-red-50 transition-colors"
                    title="Logout"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
