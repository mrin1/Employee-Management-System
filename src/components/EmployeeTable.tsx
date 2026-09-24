import React, { useState } from "react";
import type { EmployeeTableProps } from "../typescript/interface/employee.interface";
import { Pencil, Trash2, Search, AlertCircle } from "lucide-react";

export const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
  darkMode,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);

  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div
      className={`${darkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-slate-200 text-slate-900 shadow-xl"} border rounded-2xl flex flex-col h-full transition-colors duration-300 overflow-hidden`}
    >
      <div
        className={`p-5 border-b ${darkMode ? "border-zinc-800" : "border-slate-200"} flex flex-col sm:flex-row items-center justify-between gap-4`}
      >
        <div>
          <h2 className="text-lg font-semibold">Employee Directory</h2>
          <p
            className={`text-xs ${darkMode ? "text-zinc-400" : "text-slate-500"}`}
          >
            Manage active staff records seamlessly
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search by name, email, dept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`w-full border rounded-xl pl-10 pr-4 py-2 text-sm transition ${
              darkMode
                ? "bg-zinc-950 border-zinc-800 text-white placeholder-zinc-600 focus:border-indigo-500"
                : "bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400 focus:border-indigo-500"
            }`}
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-1">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr
              className={`border-b ${darkMode ? "border-zinc-800 bg-zinc-950/50 text-zinc-400" : "border-slate-200 bg-slate-50 text-slate-600"} text-xs font-semibold uppercase tracking-wider`}
            >
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Name</th>
              <th className="py-3.5 px-4">Email</th>
              <th className="py-3.5 px-4">Phone</th>
              <th className="py-3.5 px-4">Department</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody
            className={`divide-y ${darkMode ? "divide-zinc-800/60" : "divide-slate-200"} text-sm`}
          >
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((emp) => (
                <tr
                  key={emp.id}
                  className={`${darkMode ? "hover:bg-zinc-800/40" : "hover:bg-slate-50"} transition group`}
                >
                  <td className="py-3.5 px-4 font-mono text-xs text-indigo-500">
                    #{emp.id}
                  </td>
                  <td className="py-3.5 px-4 font-medium">{emp.name}</td>
                  <td
                    className={`py-3.5 px-4 ${darkMode ? "text-zinc-300" : "text-slate-600"}`}
                  >
                    {emp.email}
                  </td>
                  <td
                    className={`py-3.5 px-4 font-mono text-xs ${darkMode ? "text-zinc-300" : "text-slate-600"}`}
                  >
                    {emp.phone}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-500 border border-indigo-500/20">
                      {emp.department}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => onEdit(emp)}
                        className={`p-1.5 rounded-lg border transition ${darkMode ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-amber-400 hover:bg-amber-500/20" : "bg-white border-slate-200 text-slate-600 hover:text-amber-600 hover:bg-amber-50"}`}
                        title="Edit Employee"
                      >
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(emp.id)}
                        className={`p-1.5 rounded-lg border transition ${darkMode ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-rose-400 hover:bg-rose-500/20" : "bg-white border-slate-200 text-slate-600 hover:text-rose-600 hover:bg-rose-50"}`}
                        title="Delete Employee"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className={`py-12 text-center ${darkMode ? "text-zinc-500" : "text-slate-400"}`}
                >
                  No employee records found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {deleteConfirmId !== null && (
        <div className="fixed inset-0 z-50 bg-zinc-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className={`${darkMode ? "bg-zinc-900 border-zinc-800 text-white" : "bg-white border-slate-200 text-slate-900 shadow-2xl"} border rounded-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in duration-200`}
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-rose-500/10 rounded-xl text-rose-500 border border-rose-500/20">
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Confirm Deletion</h3>
                <p
                  className={`text-xs ${darkMode ? "text-zinc-400" : "text-slate-500"}`}
                >
                  Action cannot be undone
                </p>
              </div>
            </div>
            <p
              className={`text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"} mb-6`}
            >
              Are you sure you want to remove this employee record from the
              system?
            </p>
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className={`flex-1 font-medium py-2.5 rounded-xl text-sm transition border ${darkMode ? "bg-zinc-800 border-zinc-700 text-zinc-300 hover:bg-zinc-700" : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200"}`}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onDelete(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="flex-1 bg-rose-600 hover:bg-rose-500 text-white font-medium py-2.5 rounded-xl text-sm transition shadow-lg shadow-rose-600/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
