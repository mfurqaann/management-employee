
import { Injectable } from '@angular/core';
import { Employee, FilterState } from '../types';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly STORAGE_KEY = 'data';
  private employees: Employee[] = [];
  
  public filterState$ = new BehaviorSubject<FilterState>({
    searchUsername: '',
    searchEmail: '',
    page: 1,
    pageSize: 10,
    sortBy: 'username',
    sortOrder: 'asc'
  });

  constructor() {
    this.loadData();
  }

  private loadData() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored && stored !== 'undefined' && stored !== 'null') {
        this.employees = JSON.parse(stored);
      } else {
        this.employees = this.generateDummyData();
        this.saveToStorage();
      }
    } catch (e) {
      console.error(e);
      this.employees = this.generateDummyData();
      this.saveToStorage();
    }
  }

  private generateDummyData(): Employee[] {
  const namaDepan = ['Budi', 'Siti', 'Andi', 'Rina', 'Dedi', 'Ayu', 'Agus', 'Putri', 'Rizki', 'Dewi'];
  const namaBelakang = ['Santoso', 'Wijaya', 'Pratama', 'Saputra', 'Hidayat', 'Nugroho', 'Utami', 'Wibowo', 'Setiawan', 'Lestari'];
  const groupList = [
    'HRD',
    'Engineering',
    'Finance',
    'Marketing',
    'Operations',
    'Product',
    'Sales',
    'Customer Support',
    'Design',
    'QA'
  ];

  const result: Employee[] = [];

  for (let i = 0; i < 100; i++) {
    const depan = namaDepan[Math.floor(Math.random() * namaDepan.length)];
    const belakang = namaBelakang[i % namaBelakang.length];

    const tahunLahir = 1985 + (i % 15);
    const bulan = Math.floor(Math.random() * 12);
    const tanggal = (i % 27) + 1;

    result.push({
      username: depan.toLowerCase() + '_' + i,
      firstName: depan,
      lastName: belakang,
      email: `${depan.toLowerCase()}.${belakang.toLowerCase()}${i}@company.co.id`,
      birthDate: new Date(tahunLahir, bulan, tanggal).toISOString(),
      basicSalary: 4500000 + i * 125000,
      status: i % 7 === 0 ? 'Probation' : 'Active',
      group: groupList[Math.floor(Math.random() * groupList.length)],
      description: 'dummy data employee'
    });
  }

  return result;
}


  private saveToStorage() {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.employees));
  }

  getEmployees() {
    return [...this.employees];
  }

  getEmployee(username: string) {
    return this.employees.find(e => e.username === username);
  }

  addEmployee(emp: Employee) {
    this.employees.push(emp);
    this.saveToStorage();
  }

  deleteEmployee(username: string) {
    this.employees = this.employees.filter(e => e.username !== username);
    this.saveToStorage();
  }

  updateFilters(filters: Partial<FilterState>) {
    this.filterState$.next({ ...this.filterState$.value, ...filters });
  }
}

