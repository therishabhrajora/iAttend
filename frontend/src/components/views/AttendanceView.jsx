import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Loader, PenSquare, X, CheckCircle, Eye, Check } from "lucide-react";
import {
  fetchAttendanceRecords,
  updateAttendanceRecords,
} from "../../features/attendance/AttendanceSlice";
import { fetchStudents } from "../../features/students/StudentsSlice";

const AttendanceView = () => {
  const dispatch = useDispatch();
  const { records, loading } = useSelector((state) => state.attendance);
  const { list: students } = useSelector((state) => state.students);
  const user = useSelector((state) => state.auth.user);

  const [updating, setUpdating] = useState(false);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [isMarkingMode, setIsMarkingMode] = useState(false);
  const [editableRecords, setEditableRecords] = useState([]);
  const [initialRecords, setInitialRecords] = useState([]);
  const [viewingStudent, setViewingStudent] = useState(null);

  // Fetch data when date changes
  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchAttendanceRecords(selectedDate));
  }, [dispatch, selectedDate]);

  // Mark mode toggle
  const handleMarkModeToggle = () => {
    if (isMarkingMode) {
      setIsMarkingMode(false);
      setEditableRecords([]);
      setInitialRecords([]);
    } else {
      // Merge students with records
      const mergedRecords = students
        
        .map((student) => {
          const existingRecord = records.find(
            (r) =>
              r.student.id === student.id &&
              r.subject.toLowerCase() === user.subject.toLowerCase()
          );
          return existingRecord
            ? existingRecord
            : {
                studentId: student.id,
                studentName: student.name,
                rollNumber: student.rollNumber,
                subject: user.subject,
                status: "absent",
              };
        });

        console.log("Merged Records for Marking:", mergedRecords);
      setEditableRecords(mergedRecords);
      setInitialRecords(JSON.parse(JSON.stringify(mergedRecords)));
      setIsMarkingMode(true);
    }
  };

  // Toggle student status
  const handleStatusToggle = (studentId) => {
    setEditableRecords((prev) =>
      prev.map((r) =>
        (r.studentId || r.student?.id) === studentId
          ? { ...r, status: r.status === "present" ? "absent" : "present" }
          : r
      )
    );
  };

  // Detect changes
  const hasChanges = useMemo(
    () => JSON.stringify(initialRecords) !== JSON.stringify(editableRecords),
    [initialRecords, editableRecords]
  );

  // Submit changes
  const handleSubmitChanges = async () => {
    const payload = editableRecords.map((r) => ({
      studentId: r.studentId || r.student?.id,
      teacherId: user.id,
      subject: user.subject,
      date: selectedDate,
      status: r.status,
    }));

    try {
      setUpdating(true);
      await dispatch(updateAttendanceRecords(payload)).unwrap();
      await dispatch(fetchAttendanceRecords(selectedDate)).unwrap();
      alert("✅ Attendance updated successfully!");
      setIsMarkingMode(false);
    } catch (err) {
      console.error("Update error:", err);
      alert("❌ Failed to update attendance.");
    } finally {
      setUpdating(false);
    }
  };

  // Modal handling
  const handleViewAttendance = (record) => setViewingStudent(record);
  const closeModal = () => setViewingStudent(null);

  // List to display depending on marking mode
  // console.log(editableRecords)
  const listToDisplay = useMemo(() => {
    if (isMarkingMode) {
      return editableRecords;
    } else {
      return records.filter(
        (r) => r.subject?.toLowerCase() === user.subject.toLowerCase()
      );
    }
  }, [isMarkingMode, editableRecords, records, user.subject]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="w-8 h-8 animate-spin text-purple-600" />
      </div>
    );

  return (
    <div className="space-y-6 mt-16">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h3 className="text-lg font-semibold text-slate-900">
            Attendance Records ({selectedDate})
          </h3>
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg bg-slate-50 text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleMarkModeToggle}
              className={`flex items-center gap-2 px-4 py-2 text-white font-medium rounded-lg transition-all shadow-md ${
                isMarkingMode
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }`}
            >
              {isMarkingMode ? <X className="w-4 h-4" /> : <PenSquare className="w-4 h-4" />}
              {isMarkingMode ? "Cancel" : "Mark Attendance"}
            </button>

            {isMarkingMode && (
              <button
                onClick={handleSubmitChanges}
                disabled={!hasChanges || updating}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed shadow-md"
              >
                {updating ? <Loader className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                {updating ? "Submitting..." : "Submit Changes"}
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Roll No.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">
                  Subject
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                  Status
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-slate-500 uppercase">
                  View
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {listToDisplay.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-slate-500 py-4 text-sm">
                    No students found for your subject.
                  </td>
                </tr>
              ) : (
                listToDisplay.map((record) => (
                  <tr key={record.id || record.studentId} className="hover:bg-slate-50">
                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {record.studentName || record.student?.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">
                      {record.rollNumber || record.student?.rollNumber}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{record.subject}</td>
                    <td className="px-6 py-4 text-center">
                      {isMarkingMode ? (
                        <button
                          onClick={() => handleStatusToggle(record.studentId || record.student?.id)}
                          className={`p-2 rounded-full border transition-all ${
                            record.status === "present"
                              ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                              : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300"
                          }`}
                        >
                          <Check className="w-4 h-4" />
                        </button>
                      ) : (
                        <span
                          className={`px-3 py-1 text-xs font-semibold rounded-full ${
                            record.status === "present"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {record.status}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleViewAttendance(record)}
                        className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-6 w-[90%] sm:w-[400px] shadow-xl relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-semibold text-slate-900 mb-3">Attendance Details</h3>
            <p className="text-sm text-slate-700">
              <b>Name:</b> {viewingStudent.studentName || viewingStudent.student?.name}
            </p>
            <p className="text-sm text-slate-700">
              <b>Roll No:</b> {viewingStudent.rollNumber || viewingStudent.student?.rollNumber}
            </p>
            <p className="text-sm text-slate-700">
              <b>Subject:</b> {viewingStudent.subject}
            </p>
            <p className="text-sm text-slate-700">
              <b>Status:</b>{" "}
              <span className={`font-semibold ${viewingStudent.status === "present" ? "text-green-600" : "text-red-600"}`}>
                {viewingStudent.status}
              </span>
            </p>
            <div className="mt-4 text-right">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AttendanceView;
