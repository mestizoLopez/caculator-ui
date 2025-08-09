# Calculator UI – Angular Frontend

## Overview
This is the Angular frontend for the Calculator application.  
It communicates with the Spring Boot backend over REST and supports authentication via JWT.

The UI allows users to register, log in, perform calculator operations, and view/delete their operation history.

---

## Features
- **Register** a new account
- **Login** with JWT-based authentication
- **Perform operations** (Addition, Subtraction, Multiplication, Division, Square Root, Random String)
- **View history** of performed operations
- **Delete records** (soft delete)
- **Material UI** styling

---

## Project Structure
```
src/
│
├── app/
│   ├── core/            # Services, interceptors
│   ├── auth/            # Login/Register components
│   ├── operations/      # Create and perform operations
│   ├── records/         # Record list & delete
│   ├── shared/          # Shared services and models
│   └── app.routes.ts    # Routing configuration
│
├── assets/              # Static assets
├── environments/        # Environment config
└── main.ts              # Application bootstrap
```

---

## Authentication Flow
1. **Register** via `/auth/register` page → API: `/api/v1/auth/register`
2. **Login** via `/auth/login` page → API: `/api/v1/auth/login`  
   - JWT token is saved in `localStorage`
3. **HttpInterceptor** attaches `Authorization: Bearer <token>` to all secured requests
4. If token expires, user is redirected to login

---

## API Integration
The frontend expects the backend running at the URL set in `src/environments/environment.ts`:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

---

## Setup & Running

### Prerequisites
- Node.js (LTS recommended)
- Angular CLI

### Install dependencies
```bash
npm install
```

### Run dev server
```bash
ng serve
```
The app will be available at `http://localhost:4200`.

---

## Components

### Auth
- **RegisterComponent**: Form to create account
- **LoginComponent**: Form to login and save JWT token

### Operations
- **CreateOperationComponent**: Create new operation type (admin use)
- **OperationComponent**: Perform an operation and view result

### Records
- **RecordListComponent**: Paginated list of user operations
- **Delete** button calls API to soft delete

---

## Material UI
- Angular Material components are used for inputs, tables, buttons
- Installed via:
```bash
ng add @angular/material
```

---

## Example `.env` (environment.ts)
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

---

## CORS
Ensure backend allows CORS from `http://localhost:4200` for all required endpoints.

---

## Troubleshooting
- **401 Unauthorized**: Ensure token is in localStorage and HttpInterceptor is active
- **CORS errors**: Check backend CORS configuration in `SecurityConfig`
- **H2 data reset**: Register/login again if backend restarts

