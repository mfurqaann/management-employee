
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { Employee, FilterState } from '../../types';
import { TableComponent } from '../../components/table/table';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, TableComponent],
  templateUrl: './employee-list.html'
})
export class EmployeeListComponent implements OnInit {
  filters!: FilterState;
  employees: Employee[] = [];
  filteredEmployee: Employee[] = [];
  paginatedEmployees: Employee[] = [];
  notification: { message: string, type: string } | null = null;

  constructor(private service: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.service.filterState$.subscribe(f => {
      this.filters = f;
      console.log(f)
      this.loadData();
    });
  }

  loadData() {
    this.employees = this.service.getEmployees();
    this.applyFilters();
  }

  applyFilters() {
    this.filteredEmployee = this.employees.filter(e => {
      const userNameMatch = e.username.toLowerCase().includes(this.filters.searchUsername.toLowerCase());
      const emailMatch = e.email.toLowerCase().includes(this.filters.searchEmail.toLowerCase());
      return userNameMatch && emailMatch;
    });

    this.filteredEmployee.sort((a, b) => {
      const empA = a[this.filters.sortBy];
      const empB = b[this.filters.sortBy];
      const order = this.filters.sortOrder === 'asc' ? 1 : -1;
      return empA > empB ? order : -order;
    });

    const start = (this.filters.page - 1) * this.filters.pageSize;
    this.paginatedEmployees = this.filteredEmployee.slice(start, start + this.filters.pageSize);
  }

  onFilterChange() {
    this.service.updateFilters({ page: 1 });
  }

  onPage(p: number) {
    this.service.updateFilters({ page: p });
  }

  onSort(key: keyof Employee) {
    const order = this.filters.sortBy === key && this.filters.sortOrder === 'asc' ? 'desc' : 'asc';
    this.service.updateFilters({ sortBy: key, sortOrder: order });
  }

  onDelete(username: string) {
    if (confirm(`Delete ${username}?`)) {
      this.service.deleteEmployee(username);
      this.dummyModal('Delete', username, 'red');
      this.loadData();
    }
  }

  dummyModal(action: string, user: string, type: string) {
    this.notification = { message: `${action} action performed on ${user}`, type };
    setTimeout(() => this.notification = null, 3000);
  }

  resetFilters() {
    this.service.updateFilters({ searchUsername: '', searchEmail: '', page: 1 });
  }

  get totalPages() {
    return Math.ceil(this.filteredEmployee.length / this.filters.pageSize) || 1;
  }

  formatCurrency(n: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n);
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
