import type { Employee } from '../interface/employee.interface';

export type EmployeeFormValues = Omit<Employee, 'id'>;
