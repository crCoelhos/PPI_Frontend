export interface AuthContextType {
  token: string;
  setToken: (token: string) => void;
  children: React.ReactNode;
}

export interface UserData {
  id: number;
  name: string;
  cpf: string;
  email: string;
  contact: string;
  birthdate: string;
  hireDate: string;
  roleId: number;
  is_active: boolean;
  photo: string;
  document: string;
  sex: string;
  expertiseId: number;
  createdAt: string;
  updatedAt: string;
  role: {
    name: string;
  };
}

export interface CustomerData {
  id: number;
  businessName: string;
  cnpj: string;
  contactName: string;
  contactCpf: string;
  isActive: boolean;
  size: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExpertiseData {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  contact: string;
  expertiseId: number;
  is_active: boolean;
}

export interface HeadCell {
  disablePadding: boolean;
  id: keyof User;
  label: string;
  numeric: boolean;
}
export interface CustomersHeadCell {
  disablePadding: boolean;
  id: keyof CustomerData;
  label: string;
  numeric: boolean;
}
export interface Task {
  contractDate: string;
  contractDocument: string | null;
  createdAt: string;
  customerId: number;
  deadline: string;
  description: string;
  estimateValue: any;
  id: number;
  isActive: boolean;
  name: string;
  startDate: string;
  taskDomain: string;
  taskStatus: string;
  updatedAt: string;
  updatedDeadline: string | null;
  usertask: UserTask[] | null;
}

export interface UserTask {
  id: number;
  assignmentDate: string;
  is_active: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  taskId: number;
}

export interface TasksHeadCell {
  disablePadding: boolean;
  id: keyof Task;
  label: string;
  numeric: boolean;
}

export interface MetricData {
  completedTasksCount: number;
  canceledTasksCount: number;
  pausedTasksCount: number;
  doingTasksCount: number;
  overdueTasksCount: number;
}

export interface LastMonthBalanceData {
  completedTasksBalance: number;
  canceledTasksBalance: number;
  pausedTasksBalance: number;
  doingTasksBalance: number;
  overdueTasksBalance: number;
}
export interface ThisMonthBalanceData {
  completedTasksBalance: number;
  canceledTasksBalance: number;
  pausedTasksBalance: number;
  doingTasksBalance: number;
  overdueTasksBalance: number;
}
export interface LastMonthTaskCountData {
  completedTasksCount: number;
  canceledTasksCount: number;
  pausedTasksCount: number;
  doingTasksCount: number;
  overdueTasksCount: number;
}
export interface ThisMonthTaskCountData {
  completedTasksCount: number;
  canceledTasksCount: number;
  pausedTasksCount: number;
  doingTasksCount: number;
  overdueTasksCount: number;
}
