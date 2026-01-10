# Password Manager Frontend

A modern, secure password manager built with React, TypeScript, and TailwindCSS.

## 🚀 Tech Stack

- **Framework**: Vite + React 19 + TypeScript
- **Styling**: TailwindCSS v4 + Shadcn UI
- **State Management**: Zustand + React Query (TanStack Query)
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📁 Project Structure

```
frontend/
├── src/
│   ├── api/                    # API client and endpoints
│   │   ├── client.ts          # Axios instance with interceptors
│   │   ├── auth.ts            # Authentication API calls
│   │   └── entries.ts         # Password entries API calls
│   ├── components/            # React components
│   │   ├── ui/               # Shadcn UI components
│   │   ├── layout/           # Layout components
│   │   ├── auth/             # Auth components
│   │   ├── entries/          # Password entry components
│   │   └── shared/           # Shared components
│   ├── hooks/                # Custom React hooks
│   ├── stores/               # Zustand stores
│   ├── pages/                # Page components
│   ├── lib/                  # Utilities
│   │   ├── utils.ts          # Helper functions
│   │   └── queryClient.ts    # React Query setup
│   ├── schemas/              # Zod validation schemas
│   ├── types/                # TypeScript types
│   ├── App.tsx               # Main app with routes
│   └── main.tsx              # Entry point
├── public/                    # Static assets
├── .env                       # Environment variables
├── components.json            # Shadcn UI config
├── tailwind.config.ts         # Tailwind configuration
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite configuration
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8000`

### Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure environment variables**:
   
   The `.env` file is already configured:
   ```env
   VITE_API_BASE_URL=http://localhost:8000/api/v1/password-manager
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:5173`

4. **Build for production**:
   ```bash
   npm run build
   ```

5. **Preview production build**:
   ```bash
   npm run preview
   ```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📦 Phase 1 - Complete ✅

### What's Implemented:

1. ✅ **Project Setup**
   - Vite + React + TypeScript initialized
   - TailwindCSS v4 configured with custom theme
   - Shadcn UI components installed

2. ✅ **Dependencies Installed**
   - React Router for routing
   - React Query for data fetching
   - Zustand for state management
   - Axios for HTTP requests
   - React Hook Form + Zod for forms
   - Sonner for toast notifications
   - Lucide React for icons

3. ✅ **Project Structure**
   - Complete folder structure created
   - TypeScript types defined
   - API client with interceptors
   - React Query configuration

4. ✅ **API Layer**
   - Axios client with JWT token handling
   - Automatic token refresh on 401
   - Auth API endpoints (login, register, getCurrentUser, refresh)
   - Entries API endpoints (CRUD + search + reveal + generate)

5. ✅ **Configuration**
   - Environment variables setup
   - Path aliases configured (`@/*`)
   - Custom color scheme (primary, accent, success, danger)
   - PostCSS and TailwindCSS v4 configured

## 📦 Phase 2 - Complete ✅

### What's Implemented:

1. ✅ **Auth Store (Zustand)**
   - Persistent authentication state
   - Token and user data management
   - LocalStorage synchronization
   - State hydration on app load

2. ✅ **Auth Validation Schemas**
   - Login schema with email/password validation
   - Register schema with password complexity requirements
   - Password strength calculation helper
   - Zod schema validation

3. ✅ **Custom Auth Hooks**
   - `useLogin()` - Login mutation with auto-redirect
   - `useRegister()` - Register mutation with auto-login
   - `useLogout()` - Logout with state cleanup
   - `useCurrentUser()` - Fetch and cache user data
   - `useIsAuthenticated()` - Check auth status
   - `useUser()` - Get current user from store

4. ✅ **Login Page**
   - Beautiful centered card design
   - Email and password inputs with icons
   - Show/hide password toggle
   - Form validation with error messages
   - Loading states
   - Link to register page
   - Auto-redirect if already authenticated

5. ✅ **Register Page**
   - Similar design to login page
   - Email, username (optional), password, confirm password fields
   - Real-time password strength indicator
   - Password requirements checklist with checkmarks
   - Visual strength bar (red → yellow → green)
   - Form validation with detailed error messages
   - Auto-login after successful registration
   - Link to login page

6. ✅ **Protected Routes**
   - `ProtectedRoute` component for route protection
   - Auto-redirect to login if not authenticated
   - Loading state while checking auth
   - State hydration on component mount

7. ✅ **Routing**
   - Public routes: `/login`, `/register`
   - Protected routes: `/dashboard`
   - Default redirect to dashboard
   - Route protection with auth checks

8. ✅ **Dashboard Placeholder**
   - Temporary dashboard page showing user info
   - Logout functionality
   - Welcome message
   - Progress indicator for Phase 2 completion

## 🎨 Color Scheme

- **Primary** (Blue/Indigo): Trust and security
- **Accent** (Purple): Premium feel for CTAs
- **Success** (Green): Password strength indicators
- **Danger** (Red): Delete actions and warnings

## 🔐 API Integration

The frontend connects to the backend API with the following endpoints:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT
- `GET /auth/me` - Get current user
- `POST /auth/refresh` - Refresh token

### Password Entries
- `GET /entries` - List entries (paginated)
- `POST /entries` - Create entry
- `GET /entries/{id}` - Get entry
- `PUT /entries/{id}` - Update entry
- `DELETE /entries/{id}` - Delete entry
- `GET /entries/{id}/reveal` - Reveal password

### Search
- `GET /search/website?q={query}` - Search by website
- `GET /search/email?q={query}` - Search by email

### Utilities
- `POST /generate-password` - Generate secure password

## 🚧 Next Steps - Phase 3

Phase 3 will implement:
- Dashboard layout with sidebar & navbar
- Password entries table with pagination
- Search functionality (by website/email)
- Create, edit, delete, and reveal password modals
- Password generator
- Copy to clipboard functionality

## 📄 License

MIT
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
