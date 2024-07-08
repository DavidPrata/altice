import { CommonModule, NgFor } from '@angular/common';
import { Component, Input, Output, input } from '@angular/core';
import { Form } from '../../models/form.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
})
export class TableComponent {
  @Input() data: any;
  @Output() selectedCity: Form | null = null;
}
