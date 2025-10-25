import React from "react";
import {

  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
 
} from "recharts";


const AttendanceChart = React.memo(({ data }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Weekly Attendance Trend
    </h3>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis dataKey="day" stroke="#6b7280" />
        <YAxis stroke="#6b7280" />
        <Tooltip
          contentStyle={{
            backgroundColor: "white",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          }}
        />
        <Bar dataKey="present" fill="#10b981" radius={[8, 8, 0, 0]} />
        <Bar dataKey="absent" fill="#ef4444" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
));

export default AttendanceChart;
