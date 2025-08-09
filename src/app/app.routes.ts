import { Routes } from '@angular/router';
import { OperationComponent } from './operations/operation/operation.component';
import { RecordsComponent } from './records/records/records.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateOperationComponent } from './operations/operation/create-operation.component';
import { authGuard } from './core/auth.guard';

export const routes: Routes = [
  { path: '', component: OperationComponent, canActivate: [authGuard] },
  { path: 'records', component: RecordsComponent, canActivate: [authGuard] },
  { path: 'operations/create', component: CreateOperationComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '' }
];
