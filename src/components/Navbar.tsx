import React from "react";
import { Users, ShieldCheck, Sun, Moon } from "lucide-react";
import type { NavbarProps } from "../typescript/interface/employee.interface";

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  return (
    <header
      className={`${darkMode ? "bg-zinc-900 border-zinc-800" : "bg-white border-slate-200 shadow-sm"} border-b sticky top-0 z-30 transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/30">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h1
              className={`text-lg font-bold ${darkMode ? "text-white" : "text-slate-900"} tracking-wide`}
            >
              Employee Management System
            </h1>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div
            className={`hidden sm:flex items-center space-x-2 ${darkMode ? "bg-zinc-800/60 border-zinc-700/50 text-zinc-300" : "bg-slate-100 border-slate-200 text-slate-600"} px-3 py-1.5 rounded-full border text-xs font-medium`}
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Secure LocalStorage Active</span>
          </div>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2 rounded-xl border transition flex items-center space-x-2 text-xs font-medium ${
              darkMode
                ? "bg-zinc-800 border-zinc-700 text-amber-400 hover:bg-zinc-700"
                : "bg-slate-100 border-slate-200 text-indigo-600 hover:bg-slate-200"
            }`}
            title="Toggle Theme"
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4" />
                <span className="hidden md:inline">Light Mode</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4" />
                <span className="hidden md:inline">Dark Mode</span>
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
