import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { OperationService } from '../operation.service';

@Component({
  standalone: true,
  selector: 'app-operation',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Perform Operation</h2>
    <form [formGroup]="performForm" (ngSubmit)="perform()">
      <select formControlName="type" required>
        <option value="ADDITION">Addition</option>
        <option value="SUBTRACTION">Subtraction</option>
        <option value="MULTIPLICATION">Multiplication</option>
        <option value="DIVISION">Division</option>
        <option value="SQUARE_ROOT">Square Root</option>
        <option value="RANDOM_STRING">Random String</option>
      </select>
      <input type="number" formControlName="input" />
      <button type="submit" [disabled]="performForm.invalid">Execute</button>
    </form>
    <div *ngIf="result">Result: {{ result }}</div>

    <hr />

    <h2>Create Operation (type + cost)</h2>
    <form [formGroup]="createForm" (ngSubmit)="create()">
      <select formControlName="type" required>
        <option value="ADDITION">Addition</option>
        <option value="SUBTRACTION">Subtraction</option>
        <option value="MULTIPLICATION">Multiplication</option>
        <option value="DIVISION">Division</option>
        <option value="SQUARE_ROOT">Square Root</option>
        <option value="RANDOM_STRING">Random String</option>
      </select>
      <input type="number" formControlName="cost" />
      <button type="submit" [disabled]="createForm.invalid">Create</button>
    </form>
    <div *ngIf="createMsg">{{ createMsg }}</div>
  `
})
export class OperationComponent implements OnInit {
  performForm!: FormGroup;
  createForm!: FormGroup;
  result?: string;
  createMsg = '';

  constructor(private fb: FormBuilder, private ops: OperationService) {}

  ngOnInit(): void {
    this.performForm = this.fb.group({
      type: ['ADDITION', Validators.required],
      input: [0, Validators.required]
    });
    this.createForm = this.fb.group({
      type: ['ADDITION', Validators.required],
      cost: [1, [Validators.required, Validators.min(0)]]
    });
  }

  perform() {
    if (this.performForm.invalid) return;
    const { type, input } = this.performForm.value;
    this.ops.perform(type, Number(input)).subscribe({
      next: (r: { result: string | undefined; }) => this.result = r.result,
      error: () => this.result = 'Operation failed'
    });
  }

  create() {
    if (this.createForm.invalid) return;
    const { type, cost } = this.createForm.value;
    this.ops.create(type, Number(cost)).subscribe({
      next: () => this.createMsg = 'Operation created',
      error: () => this.createMsg = 'Create failed'
    });
  }
}
