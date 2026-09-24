import React, { useState, useEffect } from "react";
import type {
  DashboardProps,
  Employee,
} from "../typescript/interface/employee.interface";
import { EmployeeForm } from "../components/EmployeeForm";
import { EmployeeTable } from "../components/EmployeeTable";

const LOCAL_STORAGE_KEY = "workforce_hub_employees";

const initialSampleData: Employee[] = [
  {
    id: 1,
    name: "Rahul",
    email: "rahul@gmail.com",
    phone: "9876543210",
    department: "IT",
  },
  {
    id: 2,
    name: "Priya",
    email: "priya@gmail.com",
    phone: "9876543211",
    department: "HR",
  },
];

export const Dashboard: React.FC<DashboardProps> = ({ darkMode }) => {
  const [employees, setEmployees] = useState<Employee[]>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse local storage data", e);
      }
    }
    return initialSampleData;
  });

  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(employees));
  }, [employees]);

  const handleAddOrUpdateEmployee = (data: Omit<Employee, "id">) => {
    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) =>
          emp.id === editingEmployee.id ? { ...emp, ...data } : emp,
        ),
      );
      setEditingEmployee(null);
    } else {
      const newId =
        employees.length > 0 ? Math.max(...employees.map((e) => e.id)) + 1 : 1;
      const newEmployee: Employee = { id: newId, ...data };
      setEmployees((prev) => [newEmployee, ...prev]);
    }
  };

  const handleEdit = (employee: Employee) => {
    setEditingEmployee(employee);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: number) => {
    setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    if (editingEmployee?.id === id) {
      setEditingEmployee(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-1">
          <EmployeeForm
            onSubmit={handleAddOrUpdateEmployee}
            editingEmployee={editingEmployee}
            onCancelEdit={() => setEditingEmployee(null)}
            darkMode={darkMode}
          />
        </div>
        <div className="lg:col-span-2">
          <EmployeeTable
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
};
