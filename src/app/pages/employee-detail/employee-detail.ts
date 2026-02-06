
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { Employee } from '../../types';

@Component({
  selector: 'app-employee-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './employee-detail.html'
})
export class EmployeeDetailComponent implements OnInit {
  employee?: Employee;

  constructor(private route: ActivatedRoute, private router: Router, private service: EmployeeService) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (username) {
      this.employee = this.service.getEmployee(username);
    }

    console.log(username)
  }

  formatCurrency(number: number) {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
  }

  formatDate(date?: string) {
    return date ? new Date(date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
  }

  formatDateTime(date?: string) {
    return date ? new Date(date).toLocaleString('id-ID') : '';
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}
