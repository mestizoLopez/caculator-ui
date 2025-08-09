import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperationService } from '../operation.service';

@Component({
  standalone: true,
  selector: 'app-create-operation',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Create Operation</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <select formControlName="type" required>
        <option value="ADDITION">Addition</option>
        <option value="SUBTRACTION">Subtraction</option>
        <option value="MULTIPLICATION">Multiplication</option>
        <option value="DIVISION">Division</option>
        <option value="SQUARE_ROOT">Square Root</option>
        <option value="RANDOM_STRING">Random String</option>
      </select>
      <input type="number" formControlName="cost" />
      <button type="submit" [disabled]="form.invalid">Create</button>
    </form>
  `
})
export class CreateOperationComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private ops: OperationService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      type: ['ADDITION', Validators.required],
      cost: [1, [Validators.required, Validators.min(0)]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { type, cost } = this.form.value;
    this.ops.create(type!, Number(cost)).subscribe();
  }
}
