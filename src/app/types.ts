
export interface Employee {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  basicSalary: number;
  status: string;
  group: string;
  description: string;
}

export interface FilterState {
  searchUsername: string;
  searchEmail: string;
  page: number;
  pageSize: number;
  sortBy: keyof Employee;
  sortOrder: 'asc' | 'desc';
}

export const GROUPS = [
  'Human Resources', 'Software Engineering', 'Marketing', 'Finance', 'Operations',
  'Product Management', 'Sales', 'Customer Success', 'Design', 'Quality Assurance'
];

export const STATUSES = ['Active', 'On Leave', 'Resigned', 'Probation'];
