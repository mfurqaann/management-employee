
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { EmployeeService } from '../../services/employee-service';
import { GROUPS, STATUSES } from '../../types';

@Component({
  selector: 'app-add-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  templateUrl: './add-employee.html'
})
export class AddEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  today = new Date().toISOString().split('T')[0];
  statuses = STATUSES;
  groups = GROUPS;
  showGroupDropdown = false;
  groupSearch = '';

  constructor(private fb: FormBuilder, private service: EmployeeService, private router: Router) {
  }

  ngOnInit(): void {
     this.employeeForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      birthDate: ['', Validators.required],
      basicSalary: ['', [Validators.required, Validators.min(0)]],
      status: ['', Validators.required],
      group: ['', Validators.required],
      description: [new Date().toISOString().slice(0, 16), Validators.required]
    });
  }

  get filteredGroups() {
    return this.groups.filter(g => g.toLowerCase().includes(this.groupSearch.toLowerCase()));
  }

  selectGroup(g: string) {
    this.employeeForm.get('group')?.setValue(g);
    this.showGroupDropdown = false;
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.service.addEmployee(this.employeeForm.value);
      this.router.navigate(['/employees']);
    }
  }
}
