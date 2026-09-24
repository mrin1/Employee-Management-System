export interface Employee {
  id: number;
  name: string;
  email: string;
  phone: string;
  department: string;
}
export interface DashboardProps {
  darkMode: boolean;
}


export interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  darkMode: boolean;
}


export interface EmployeeFormProps {
  onSubmit: (data: Omit<Employee, 'id'>) => void;
  editingEmployee: Employee | null;
  onCancelEdit: () => void;
  darkMode: boolean;
}