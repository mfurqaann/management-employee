import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login').then((m) => m.LoginComponent),
  },
  {
    path: 'employees',
    loadComponent: () => import('./pages/employee-list/employee-list').then((m) => m.EmployeeListComponent),
  },
  {
    path: 'employee-detail/:username',
    loadComponent: () => import('./pages/employee-detail/employee-detail').then((m) => m.EmployeeDetailComponent),
  },
  {
    path: 'add-employee',
    loadComponent: () => import('./pages/add-employee/add-employee').then((m) => m.AddEmployeeComponent),
  },
];
