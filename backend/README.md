# Backend API Setup & Frontend Integration

This backend replaces the Appwrite service. Follow the instructions below to run it and integrate with your Next.js frontend.

## 1. Backend Setup

1.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    *   Update `.env` with your values:
        *   `MONGO_URI`: Your MongoDB connection string.
        *   `JWT_SECRET`: A secure random string.
        *   `GOOGLE_CLIENT_ID`: The SAME Client ID used in your frontend Google Auth.

4.  **Run the Server:**
    *   Development mode:
        ```bash
        npm run dev
        ```
    *   Production mode:
        ```bash
        npm start
        ```

## 2. Frontend Integration (Next.js)

Since you are removing Appwrite, you need to update your API calls to point to this new backend (e.g., `http://localhost:5000/api`).

### A. Environment Variables (`.env.local`)

Add the backend URL to your frontend `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### B. Google Auth Integration (`context/AuthContext.tsx`)

Modify your `loginWithGoogle` or the callback where you receive the `credential` (ID token) from Google. Instead of calling Appwrite, call your backend:

```javascript
// Example of sending the Google ID token to backend
const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ idToken: googleIdTokenFromFrontend }),
});

const data = await response.json();

if (response.ok) {
  // Store the backend JWT token
  localStorage.setItem('token', data.token);
  // Set user state...
}
```

### C. Authenticated Requests

For any request that requires login (like creating an applicant), include the JWT in the header:

```javascript
const token = localStorage.getItem('token');

const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/applicants`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`, // <--- IMPORTANT
  },
  body: JSON.stringify(formData),
});
```

### D. Replaces Appwrite SDK

*   Remove `appwrite` imports.
*   Replace `databases.createDocument` with `fetch(..., { method: 'POST' })`.
*   Replace `databases.listDocuments` with `fetch(..., { method: 'GET' })`.

## 3. Endpoints

### Auth
*   `POST /api/auth/register` - Email/Password registration
*   `POST /api/auth/login` - Email/Password login
*   `POST /api/auth/google` - Google ID Token login (Returns JWT)
*   `GET /api/auth/me` - Get current user (Requires Token)

### Applicants
*   `POST /api/applicants` - Create application (Requires Token)
*   `GET /api/applicants/my` - Get logged-in user's applications (Requires Token)
*   `GET /api/applicants` - Get all applications (Admin only)
*   `PATCH /api/applicants/:id/status` - Update status (Admin only)
