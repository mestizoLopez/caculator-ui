import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <h2>Register</h2>
    <form [formGroup]="form" (ngSubmit)="submit()">
      <input formControlName="username" placeholder="Email" />
      <input formControlName="password" type="password" placeholder="Password" />
      <button type="submit" [disabled]="form.invalid">Create account</button>
    </form>
    <p *ngIf="error" style="color:crimson">{{ error }}</p>
  `
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    if (this.form.invalid) return;
    const { username, password } = this.form.value;
    this.auth.register(username!, password!).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (e) => this.error = e?.error || 'Registration failed'
    });
  }
}
