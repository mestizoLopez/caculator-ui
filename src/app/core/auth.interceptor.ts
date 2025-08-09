// src/app/core/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log('[authInterceptor]', req.method, req.url, 'token?', !!token);
  if (token) {
    req = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
    // show exactly what we send
    console.log('[authInterceptor] Authorization:', req.headers.get('Authorization'));
  }
  return next(req);
};
