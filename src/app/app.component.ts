import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from './core/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav>
      <a routerLink="/">Operations</a>
      <a routerLink="/records">Records</a>
      <a routerLink="/operations/create" *ngIf="auth.isAuthenticated()">Create Operation</a>
      <span style="flex:1"></span>
      <a routerLink="/login" *ngIf="!auth.isAuthenticated()">Login</a>
      <a routerLink="/register" *ngIf="!auth.isAuthenticated()">Register</a>
      <button *ngIf="auth.isAuthenticated()" (click)="auth.logout()">Logout</button>
    </nav>
    <div class="container">
      <router-outlet></router-outlet>
    </div>
  `
})
export class AppComponent {
  constructor(public auth: AuthService) {}
}
