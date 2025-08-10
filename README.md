# Frontend - Calculator App (Angular)

This is the **Angular frontend** for the Calculator application.  
It connects to the backend (Spring Boot, JWT-secured) and allows users to:
- Register and log in
- Perform mathematical operations (addition, subtraction, multiplication, division, square root, random string)
- View and manage their operation history (records)

---

## 📦 Tech Stack
- Angular (latest)
- Angular Material (UI components)
- JWT Authentication
- Reactive Forms
- TypeScript

---

## 📂 Project Structure
```
src/
  app/
    core/            -> Core services (AuthService, AuthInterceptor, guards)
    auth/            -> Login & Register components
    operations/      -> Components for performing operations
    records/         -> Components for viewing/deleting operation records
    shared/          -> Shared UI components & models
  assets/            -> Static assets
  environments/      -> Environment configs (dev/prod API URLs)
```

---

## ⚙️ Environment Configuration
API endpoints are configured in:
```
src/environments/environment.ts
src/environments/environment.prod.ts
```

Example:
```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api/v1'
};
```

---

## 🚀 Development Setup

1️⃣ **Install dependencies**
```bash
npm install
```

2️⃣ **Run in development mode**
```bash
ng serve
```
Frontend will be available at:  
➡️ `http://calculator-ui.s3-website-us-east-1.amazonaws.com/`

---

## 🛠 Building for Production
```bash
ng build --configuration production
```
Output will be in the `dist/` folder.

---

## 🔐 Authentication
- The frontend authenticates against the backend using **JWT tokens**.
- After login, the token is stored in `localStorage`.
- `AuthInterceptor` automatically adds the `Authorization: Bearer <token>` header to every request.

---

## 📡 API Integration
The frontend communicates with the backend API via HTTP calls using Angular's `HttpClient`.  
Endpoints (example):
- `POST /auth/register` - Create account
- `POST /auth/login` - Authenticate and get JWT
- `GET /operations` - List operations
- `POST /operations/perform` - Perform an operation
- `GET /records` - Get user records
- `DELETE /records/{id}` - Delete a record

---
