import React, { useState, useEffect } from "react";
import type { EmployeeFormProps } from "../typescript/interface/employee.interface";
import { employeeValidationSchema } from "../validation/validation";
import { UserPlus, Edit3, XCircle } from "lucide-react";

export const EmployeeForm: React.FC<EmployeeFormProps> = ({
  onSubmit,
  editingEmployee,
  onCancelEdit,
  darkMode,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "IT",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (editingEmployee) {
      setFormData({
        name: editingEmployee.name,
        email: editingEmployee.email,
        phone: editingEmployee.phone,
        department: editingEmployee.department,
      });
      setErrors({});
      setTouched({});
    } else {
      setFormData({ name: "", email: "", phone: "", department: "IT" });
    }
  }, [editingEmployee]);

  const validateField = async (name: string, value: string) => {
    try {
      await (
        employeeValidationSchema.fields[
          name as keyof typeof employeeValidationSchema.fields
        ] as any
      ).validate(value);
      setErrors((prev) => ({ ...prev, [name]: "" }));
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, [name]: err.message }));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await employeeValidationSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
      if (!editingEmployee) {
        setFormData({ name: "", email: "", phone: "", department: "IT" });
        setTouched({});
      }
    } catch (err: any) {
      const validationErrors: Record<string, string> = {};
      err.inner.forEach((error: any) => {
        if (error.path) validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      setTouched({ name: true, email: true, phone: true, department: true });
    }
  };

  return (
    <div
      className={`${darkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-slate-200 text-slate-900 shadow-xl"} border rounded-2xl p-6 transition-colors duration-300 relative overflow-hidden`}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 to-purple-500" />
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          {editingEmployee ? (
            <Edit3 className="w-5 h-5 text-amber-500" />
          ) : (
            <UserPlus className="w-5 h-5 text-indigo-500" />
          )}
          <h2 className="text-lg font-semibold">
            {editingEmployee ? "Edit Employee Record" : "Add New Employee"}
          </h2>
        </div>
        {editingEmployee && (
          <button
            type="button"
            onClick={onCancelEdit}
            className={`${darkMode ? "bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700" : "bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200"} flex items-center space-x-1 text-xs px-2.5 py-1.5 rounded-lg border transition`}
          >
            <XCircle className="w-3.5 h-3.5" />
            <span>Cancel Edit</span>
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            className={`block text-xs font-medium ${darkMode ? "text-zinc-300" : "text-slate-700"} mb-1`}
          >
            Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Mrinmoy Ghosh"
            className={`w-full border rounded-xl px-3.5 py-2.5 text-sm transition ${
              darkMode
                ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500"
            } ${errors.name && touched.name ? "border-rose-500" : ""}`}
          />
          {errors.name && touched.name && (
            <p className="text-xs text-rose-500 mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-xs font-medium ${darkMode ? "text-zinc-300" : "text-slate-700"} mb-1`}
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder=" mrinmoy@gmail.com"
            className={`w-full border rounded-xl px-3.5 py-2.5 text-sm transition ${
              darkMode
                ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500"
            } ${errors.email && touched.email ? "border-rose-500" : ""}`}
          />
          {errors.email && touched.email && (
            <p className="text-xs text-rose-500 mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-xs font-medium ${darkMode ? "text-zinc-300" : "text-slate-700"} mb-1`}
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            onBlur={handleBlur}
            maxLength={10}
            placeholder="10-digit mobile number"
            className={`w-full border rounded-xl px-3.5 py-2.5 text-sm transition ${
              darkMode
                ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500"
            } ${errors.phone && touched.phone ? "border-rose-500" : ""}`}
          />
          {errors.phone && touched.phone && (
            <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>
          )}
        </div>

        <div>
          <label
            className={`block text-xs font-medium ${darkMode ? "text-zinc-300" : "text-slate-700"} mb-1`}
          >
            Department
          </label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            onBlur={handleBlur}
            className={`w-full border rounded-xl px-3.5 py-2.5 text-sm transition ${
              darkMode
                ? "bg-zinc-950 border-zinc-800 text-white focus:border-indigo-500"
                : "bg-slate-50 border-slate-300 text-slate-900 focus:border-indigo-500"
            }`}
          >
            <option value="IT">IT</option>
            <option value="HR">HR</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Operations">Operations</option>
          </select>
        </div>

        <button
          type="submit"
          className={`w-full py-3 rounded-xl font-medium text-sm text-white shadow-lg transition flex items-center justify-center space-x-2 ${
            editingEmployee
              ? "bg-amber-600 hover:bg-amber-500 shadow-amber-600/20"
              : "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/20"
          }`}
        >
          {editingEmployee ? (
            <Edit3 className="w-4 h-4" />
          ) : (
            <UserPlus className="w-4 h-4" />
          )}
          <span>
            {editingEmployee ? "Update Employee Details" : "Save Employee"}
          </span>
        </button>
      </form>
    </div>
  );
};
