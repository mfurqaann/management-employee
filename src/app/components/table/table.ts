import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-table',
  imports: [RouterModule],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class TableComponent {
  @Input() paginatedEmployees: any[] = [];

  @Output() sort = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();


  onSort(field: string) {
    this.sort.emit(field);
  }

  onEdit(username: string) {
    this.edit.emit(username);
  }

  onDelete(username: string) {
    this.delete.emit(username);
  }

  formatCurrency(value: number): string {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(value);
  }

}
