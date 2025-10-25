import {
  BrowserRouter as Router,
  Navigate,
  Outlet, // Make sure Outlet is imported
} from "react-router-dom";

import { useSelector } from "react-redux";

import { Loader } from "lucide-react";
import Header from "./Header";
import NotificationContainer from "./NotificationToast";
import Sidebar from "./Sidebar";
// import Sidebar2 from "./Sidebar2"; // Kept this commented as in your original

const AuthenticatedLayout = () => {
  const { user, isAuthenticated, loading, token } = useSelector(
    (state) => state.auth
  ); // Added token here
  const sidebarOpen = useSelector((state) => state.ui.sidebarOpen);

  if (loading || (!user && token)) {
    return (
      // UPDATED: Consistent bg-slate-50 and themed spinner
      <div className="flex items-center justify-center h-screen bg-slate-50">
        <Loader className="w-10 h-10 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!loading && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    // UPDATED: Changed to bg-slate-50 for a cooler, more modern background
    <div className="min-h-screen bg-slate-50">
      <style>{`
          /* UPDATED: Added a class for your fadeIn animation */
          @keyframes fadeIn { 
            from { opacity: 0; transform: translateY(10px); } 
            to { opacity: 1; transform: translateY(0); } 
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out forwards;
          }

          @keyframes slideIn { 
            from { transform: translateX(100%); opacity: 0; } 
            to { transform: translateX(0); opacity: 1; } 
          }
          .animate-slideIn { animation: slideIn 0.3s ease-out; }
      `}</style>

      {/* Header and Sidebar are assumed to have their own responsive styling */}
      <Header />
      <Sidebar />

      <main
        className={`pt-16 transition-all duration-300 ${
          // UPDATED: This is the critical change for responsiveness.
          // On 'lg' screens and up, the margin is 64 when open.
          // On screens smaller than 'lg', the margin is always 0,
          // allowing the sidebar to overlay the content.
          sidebarOpen ? "lg:ml-64" : "ml-0"
        } p-4 sm:p-6`} // UPDATED: Responsive padding
      >
        {/* UPDATED: Added a wrapper with your 'fadeIn' animation */}
        <div className="animate-fadeIn">
          {/* Nested Routes render here */}
          <Outlet />
        </div>
      </main>

      <NotificationContainer />
    </div>
  );
};

export default AuthenticatedLayout;
