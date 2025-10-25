import React, { useState, useEffect, memo } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../features/auth/AuthSlice";
import { fetchColleges } from "../../features/college/CollegeSlice";
import {
  GraduationCap,
  Briefcase,
  Building2,
  User,
  Hash,
  Mail,
  Lock,
  ChevronDown,
  Phone,
  MapPin,
  BookOpen,
  IdCard,
} from "lucide-react";

const ROLES = {
  STUDENT: "student",
  TEACHER: "teacher",
  COLLEGE: "college",
};

// Memoized InputField
const InputField = memo(function InputField({
  icon: Icon,
  name,
  type,
  placeholder,
  value,
  onChange,
  error,
  required = false,
}) {
  return (
    <div className="relative">
      <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder-slate-400 ${
          error ? "border-red-500 focus:ring-red-500" : "border-slate-300"
        }`}
        required={required}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
});

export default function UnifiedRegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRole, setSelectedRole] = useState(ROLES.STUDENT);
  const [colleges, setColleges] = useState([]);
  const [formData, setFormData] = useState({
    collegeId: "",
    name: "",
    rollNumber: "",
    studentClass: "",
    email: "",
    password: "",
    teacherId: "",
    subject: "",
    address: "",
    contact: "",
  });

  const [errors, setErrors] = useState({});

  // Fetch colleges
  useEffect(() => {
    dispatch(fetchColleges())
      .unwrap()
      .then((data) => {
        setColleges(data || []);
        if (data && data.length > 0) {
          setFormData((prev) => ({
            ...prev,
            collegeId: prev.collegeId || data[0].id,
          }));
        }
      })
      .catch(() => setColleges([]));
  }, [dispatch]);

  // Reset role-specific fields
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      rollNumber: "",
      studentClass: "",
      teacherId: "",
      subject: "",
      address: "",
      contact: "",
      collegeId:
        selectedRole === ROLES.COLLEGE
          ? ""
          : prev.collegeId || (colleges[0] && colleges[0].id),
    }));
    setErrors({});
  }, [selectedRole, colleges]);

  // Validation rules
  const validateField = (name, value) => {
    switch (name) {
      case "name":
        if (!value) return "Name is required";
        if (value.length < 3) return "Name must be at least 3 characters";
        break;
      case "email":
        if (!value) return "Email is required";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return "Invalid email format";
        break;
      case "password":
        if (!value) return "Password is required";
        if (value.length < 6) return "Password must be at least 6 characters";
        break;
      case "rollNumber":
        if (selectedRole === ROLES.STUDENT && !value) return "Roll number is required";
        break;
      case "studentClass":
        if (selectedRole === ROLES.STUDENT && !value) return "Class is required";
        break;
      case "teacherId":
        if (selectedRole === ROLES.TEACHER && !value) return "Teacher ID is required";
        break;
      case "subject":
        if (selectedRole === ROLES.TEACHER && !value) return "Subject is required";
        break;
      case "address":
        if (selectedRole === ROLES.COLLEGE && !value) return "Address is required";
        break;
      case "contact":
        if (selectedRole === ROLES.COLLEGE && !value) return "Contact number is required";
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(value)) return "Invalid phone number";
        break;
      case "collegeId":
        if (selectedRole !== ROLES.COLLEGE && !value) return "Please select a college";
        break;
      default:
        return "";
    }
    return "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
  };

  const validateAllFields = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateAllFields()) return;

    let payload = {};
    let endpoint = "";

    switch (selectedRole) {
      case ROLES.STUDENT:
        endpoint = "/student/register";
        payload = {
          collegeId: formData.collegeId,
          name: formData.name,
          rollNumber: formData.rollNumber,
          studentClass: formData.studentClass,
          email: formData.email,
          password: formData.password,
        };
        break;

      case ROLES.TEACHER:
        endpoint = "/teacher/register";
        payload = {
          collegeId: formData.collegeId,
          name: formData.name,
          teacherId: formData.teacherId,
          subject: formData.subject,
          email: formData.email,
          password: formData.password,
        };
        break;

      case ROLES.COLLEGE:
        endpoint = "/college/register";
        payload = {
          name: formData.name,
          address: formData.address,
          contact: formData.contact,
          email: formData.email,
          password: formData.password,
        };
        break;

      default:
        return;
    }

    dispatch(registerUser({ role: selectedRole, endpoint, data: payload }))
      .unwrap()
      .then(() => navigate("/login"))
      .catch((err) => console.error("Registration failed:", err));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-4">
      <div className="w-full max-w-xl p-6 sm:p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-slate-200">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center text-purple-700">
          Create Your iAttend Account
        </h1>

        {/* Role Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { key: ROLES.STUDENT, icon: GraduationCap, label: "Student" },
            { key: ROLES.TEACHER, icon: Briefcase, label: "Teacher" },
            { key: ROLES.COLLEGE, icon: Building2, label: "College" },
          ].map(({ key, icon: Icon, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedRole(key)}
              className={`p-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
                selectedRole === key
                  ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md ring-2 ring-purple-300 ring-offset-1"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              <Icon className="h-5 w-5" /> {label}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {selectedRole !== ROLES.COLLEGE && (
            <div>
              <label htmlFor="college-select" className="block text-sm font-medium text-slate-700 mb-1">
                Select College
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  id="college-select"
                  name="collegeId"
                  value={formData.collegeId}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg bg-slate-50 appearance-none focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all ${
                    errors.collegeId ? "border-red-500 focus:ring-red-500" : "border-slate-300"
                  }`}
                  required
                >
                  <option value="" disabled>
                    Choose your College
                  </option>
                  {colleges.length === 0 ? (
                    <option disabled>Loading colleges...</option>
                  ) : (
                    colleges.map((clg) => <option key={clg.id} value={clg.id}>{clg.name}</option>)
                  )}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                {errors.collegeId && <p className="text-red-500 text-xs mt-1">{errors.collegeId}</p>}
              </div>
            </div>
          )}

          <InputField icon={User} name="name" type="text" placeholder="Full Name" value={formData.name} onChange={handleChange} error={errors.name} />

          {selectedRole === ROLES.STUDENT && (
            <>
              <InputField icon={Hash} name="rollNumber" type="text" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} error={errors.rollNumber} />
              <InputField icon={GraduationCap} name="studentClass" type="text" placeholder="Class (e.g., B.Tech CSE)" value={formData.studentClass} onChange={handleChange} error={errors.studentClass} />
            </>
          )}

          {selectedRole === ROLES.TEACHER && (
            <>
              <InputField icon={IdCard} name="teacherId" type="text" placeholder="Teacher ID" value={formData.teacherId} onChange={handleChange} error={errors.teacherId} />
              <InputField icon={BookOpen} name="subject" type="text" placeholder="Subject Taught" value={formData.subject} onChange={handleChange} error={errors.subject} />
            </>
          )}

          {selectedRole === ROLES.COLLEGE && (
            <>
              <InputField icon={MapPin} name="address" type="text" placeholder="College Address" value={formData.address} onChange={handleChange} error={errors.address} />
              <InputField icon={Phone} name="contact" type="tel" placeholder="Contact Number" value={formData.contact} onChange={handleChange} error={errors.contact} />
            </>
          )}

          <InputField icon={Mail} name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleChange} error={errors.email} />
          <InputField icon={Lock} name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} error={errors.password} />

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-semibold rounded-lg hover:from-purple-700 hover:to-indigo-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2"
          >
            Register Account
          </button>
        </form>

        <p className="text-center text-sm text-slate-600">
          Already have an account?{" "}
          <a href="/login" className="text-purple-600 hover:text-purple-700 font-medium transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}
