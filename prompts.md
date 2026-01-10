# Password Manager Frontend - Implementation Plan

## Project Overview
Build a beautiful, modern password manager frontend using:
- **Framework**: Vite + React + TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **State Management**: React Query (TanStack Query) + Zustand
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod validation
- **HTTP Client**: Axios

## API Endpoints Reference
Based on the backend API structure:

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login and get JWT token
- `GET /auth/me` - Get current user info
- `POST /auth/refresh` - Refresh access token

### Password Entries (CRUD)
- `POST /entries` - Create new password entry
- `GET /entries?page=1&page_size=50` - List entries (paginated)
- `GET /entries/{entry_id}` - Get specific entry
- `PUT /entries/{entry_id}` - Update entry
- `DELETE /entries/{entry_id}` - Delete entry
- `GET /entries/{entry_id}/reveal` - Reveal decrypted password

### Search
- `GET /search/website?q={query}&page=1&page_size=50` - Search by website name/URL
- `GET /search/email?q={query}&page=1&page_size=50` - Search by email/username

### Utilities
- `POST /generate-password` - Generate secure password

---

## Phase 1: Project Setup & Core Infrastructure

### 1.1 Initialize Vite Project
```bash
npm create vite@latest frontend -- --template react-ts
npm install
```

### 1.2 Install Core Dependencies
```bash
# UI & Styling
npm install tailwindcss postcss autoprefixer
npm install -D @tailwindcss/forms @tailwindcss/typography
npx tailwindcss init -p

# Shadcn UI Setup
npx shadcn@latest init

# Routing
npm install react-router-dom

# State Management & Data Fetching
npm install @tanstack/react-query
npm install zustand
npm install axios

# Forms & Validation
npm install react-hook-form @hookform/resolvers zod

# Icons & Utilities
npm install lucide-react
npm install clsx tailwind-merge
npm install date-fns

# Additional UI Libraries
npm install sonner # Toast notifications
npm install @radix-ui/react-slot
```

### 1.3 Setup Shadcn UI Components
Install required Shadcn components:
```bash
npx shadcn-ui@latest add button
npx shadcn-ui@latest add input
npx shadcn-ui@latest add label
npx shadcn-ui@latest add card
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add table
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add avatar
npx shadcn-ui@latest add separator
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add switch
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add skeleton
```

### 1.4 Project Structure
Create the following folder structure:
```
src/
├── api/                    # API client and endpoints
│   ├── client.ts          # Axios instance with interceptors
│   ├── auth.ts            # Auth API calls
│   ├── entries.ts         # Password entries API calls
│   └── types.ts           # API response types
├── components/            # Reusable components
│   ├── ui/               # Shadcn UI components
│   ├── layout/           # Layout components
│   │   ├── DashboardLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── auth/             # Auth components
│   │   ├── LoginForm.tsx
│   │   └── RegisterForm.tsx
│   ├── entries/          # Password entry components
│   │   ├── EntryTable.tsx
│   │   ├── EntryRow.tsx
│   │   ├── CreateEntryModal.tsx
│   │   ├── EditEntryModal.tsx
│   │   ├── RevealPasswordModal.tsx
│   │   └── DeleteConfirmDialog.tsx
│   └── shared/           # Shared components
│       ├── SearchBar.tsx
│       ├── Pagination.tsx
│       └── PasswordStrengthIndicator.tsx
├── hooks/                # Custom React hooks
│   ├── useAuth.ts        # Auth state & operations
│   ├── useEntries.ts     # Entries queries & mutations
│   └── useDebounce.ts    # Debounce hook for search
├── stores/               # Zustand stores
│   ├── authStore.ts      # Auth state (token, user)
│   └── uiStore.ts        # UI state (modals, sidebar)
├── pages/                # Page components
│   ├── LoginPage.tsx
│   ├── RegisterPage.tsx
│   └── DashboardPage.tsx
├── lib/                  # Utilities
│   ├── utils.ts          # Helper functions
│   └── queryClient.ts    # React Query setup
├── schemas/              # Zod validation schemas
│   ├── auth.schema.ts
│   └── entry.schema.ts
├── types/                # TypeScript types
│   └── index.ts
├── App.tsx               # Main app with routes
└── main.tsx              # Entry point
```

### 1.5 Configure TailwindCSS
Update `tailwind.config.js` with custom theme colors for password manager:
- Primary: Blue/Indigo for trust
- Accent: Purple for premium feel
- Success: Green for password strength
- Danger: Red for delete actions

### 1.6 Environment Variables
Create `.env` file:
```env
VITE_API_BASE_URL=http://localhost:8000/api/v1/password-manager
```

### 1.7 Setup Axios Client
- Create axios instance with base URL
- Add request interceptor to attach JWT token
- Add response interceptor for error handling and token refresh
- Handle 401 errors (redirect to login)

### 1.8 Setup React Query
- Configure QueryClient with default options
- Setup query cache time and stale time
- Configure error handling

---

## Phase 2: Authentication & Authorization

### 2.1 Create Type Definitions
Define TypeScript interfaces for:
- `User` - user object structure
- `LoginRequest` - login form data
- `RegisterRequest` - registration form data
- `TokenResponse` - JWT token response
- `AuthState` - authentication state

### 2.2 Auth Store (Zustand)
Create `authStore.ts`:
- State: `user`, `token`, `isAuthenticated`
- Actions: `setAuth`, `clearAuth`, `setUser`
- Persist token in localStorage
- Hydrate on app load

### 2.3 Auth API Layer
Create `api/auth.ts`:
- `login(email, password)` - POST /auth/login
- `register(userData)` - POST /auth/register
- `getCurrentUser()` - GET /auth/me
- `refreshToken()` - POST /auth/refresh
- `logout()` - Clear local storage

### 2.4 Auth Validation Schemas
Create Zod schemas in `schemas/auth.schema.ts`:
- `loginSchema` - email (valid email), password (min 8 chars)
- `registerSchema` - email, username (optional), password (min 8 + complexity)
- Password must include: uppercase, lowercase, number, special char

### 2.5 Custom Auth Hook
Create `hooks/useAuth.ts`:
- `useLogin()` mutation - handle login, store token, redirect
- `useRegister()` mutation - handle registration
- `useLogout()` - clear auth state, redirect to login
- `useCurrentUser()` query - fetch user data on mount
- Auto-fetch user on app load if token exists

### 2.6 Login Page
Create `pages/LoginPage.tsx`:
- Beautiful centered card design
- Logo and app name at top
- Email and password inputs
- "Remember me" checkbox (optional)
- Submit button with loading state
- Link to register page
- Error messages from API
- Form validation with react-hook-form + Zod

### 2.7 Register Page
Create `pages/RegisterPage.tsx`:
- Similar design to login
- Email, username (optional), password, confirm password
- Password strength indicator (visual bar)
- Show password requirements
- Submit button with loading state
- Link to login page
- Form validation

### 2.8 Protected Routes
Create route protection:
- `ProtectedRoute` component - check auth, redirect if not logged in
- Wrap dashboard route with protection
- Public routes: `/login`, `/register`
- Protected routes: `/dashboard`

### 2.9 Automatic Token Refresh
Implement token refresh logic:
- Check token expiration on app focus
- Refresh token if expiring within 5 minutes
- Handle refresh failures (logout user)

---

## Phase 3: Dashboard Core Features

### 3.1 Dashboard Layout
Create `components/layout/DashboardLayout.tsx`:
- Two-column layout (sidebar + main content)
- Sidebar (left): Logo, navigation, user profile
- Main area (right): Navbar + content area
- Responsive design (collapsible sidebar on mobile)

### 3.2 Navbar Component
Create `components/layout/Navbar.tsx`:
- Search bar (prominent, centered)
- "New Password" button (primary CTA)
- User dropdown menu (right):
  - User avatar/initials
  - Email display
  - Settings option
  - Logout button

### 3.3 Sidebar Component
Create `components/layout/Sidebar.tsx`:
- App logo and name
- Navigation items:
  - All Passwords (default)
  - Favorites (future)
  - Recently Used (future)
  - Trash (future)
- Password count badge
- Theme toggle (future)
- Collapse/expand button

### 3.4 Password Entry Types
Define TypeScript types in `types/index.ts`:
- `PasswordEntry` interface matching API response
- `PasswordEntryCreate` for create form
- `PasswordEntryUpdate` for update form
- `PaginatedResponse<T>` for list responses

### 3.5 Entries API Layer
Create `api/entries.ts`:
- `getEntries(page, pageSize)` - GET /entries
- `getEntryById(id)` - GET /entries/{id}
- `createEntry(data)` - POST /entries
- `updateEntry(id, data)` - PUT /entries/{id}
- `deleteEntry(id)` - DELETE /entries/{id}
- `revealPassword(id)` - GET /entries/{id}/reveal
- `searchByWebsite(query, page, pageSize)` - GET /search/website
- `searchByEmail(query, page, pageSize)` - GET /search/email
- `generatePassword(options)` - POST /generate-password

### 3.6 Entries Validation Schemas
Create `schemas/entry.schema.ts`:
- `createEntrySchema` - all required fields
- `updateEntrySchema` - all optional fields
- Validation rules:
  - website_name: required, min 1 char
  - website_url: optional, valid URL format
  - login_email_or_username: required
  - password: required, min 8 chars
  - notes: optional, max 500 chars

### 3.7 Custom Entries Hook
Create `hooks/useEntries.ts`:
- `useEntries(page, pageSize)` query - fetch entries list
- `useEntry(id)` query - fetch single entry
- `useCreateEntry()` mutation - create entry
- `useUpdateEntry()` mutation - update entry
- `useDeleteEntry()` mutation - delete entry
- `useRevealPassword(id)` mutation - reveal password
- `useSearchWebsite(query)` query - search by website
- `useSearchEmail(query)` query - search by email
- `useGeneratePassword()` mutation - generate password
- Include optimistic updates and cache invalidation

### 3.8 Dashboard Page Structure
Create `pages/DashboardPage.tsx`:
- Import DashboardLayout
- State management:
  - Current page number
  - Page size (default 50)
  - Search query
  - Active search type (website/email/none)
- Render EntryTable with current data
- Handle modal states (create/edit/reveal/delete)

### 3.9 Search Bar Component
Create `components/shared/SearchBar.tsx`:
- Input with search icon
- Debounced search (500ms delay)
- Dropdown to select search type:
  - Search by website (default)
  - Search by email/username
- Clear button when search is active
- Loading indicator during search
- Emit search query to parent component

### 3.10 Search Implementation
In DashboardPage:
- Use `useDebounce` hook for search query
- Switch between queries based on search state:
  - No search: use `useEntries()`
  - Website search: use `useSearchWebsite(query)`
  - Email search: use `useSearchEmail(query)`
- Display search results count
- "Clear search" button to reset

---

## Phase 4: Entry Management & Polish

### 4.1 Entry Table Component
Create `components/entries/EntryTable.tsx`:
- Responsive table with columns:
  - Website (icon + name)
  - URL (truncated with tooltip)
  - Login/Username
  - Last Modified (relative time)
  - Actions (buttons)
- Loading skeleton states
- Empty state with illustration and CTA
- Use Shadcn Table component

### 4.2 Entry Row Component
Create `components/entries/EntryRow.tsx`:
- Display entry data
- Action buttons:
  - Copy username (with toast confirmation)
  - Reveal password (eye icon)
  - Edit (pencil icon)
  - Delete (trash icon)
- Hover effects and animations
- Website favicon display (using external service)

### 4.3 Pagination Component
Create `components/shared/Pagination.tsx`:
- Previous/Next buttons
- Page numbers (show current ± 2 pages)
- Jump to first/last page
- Total entries count
- Items per page selector (10, 25, 50, 100)
- Disable buttons appropriately

### 4.4 Create Entry Modal
Create `components/entries/CreateEntryModal.tsx`:
- Shadcn Dialog component
- Form fields:
  - Website name (required)
  - Website URL (optional)
  - Email/Username (required)
  - Password (required)
  - Notes (optional textarea)
- Password field features:
  - Show/hide toggle
  - "Generate Password" button
  - Password strength indicator
  - Copy to clipboard button
- Form validation with Zod
- Submit with loading state
- Success toast and modal close
- Reset form on close

### 4.5 Password Generator in Modal
Integrate in CreateEntryModal:
- "Generate Password" button next to password input
- Click to open popover/dropdown with options:
  - Length slider (8-128, default 16)
  - Checkboxes: symbols, numbers, uppercase, lowercase
  - "Generate" button
  - Display generated password
  - "Use this password" button to fill form field
- Show password strength for generated password

### 4.6 Edit Entry Modal
Create `components/entries/EditEntryModal.tsx`:
- Similar to CreateEntryModal
- Pre-fill form with existing entry data
- Load entry data when modal opens
- All fields editable except user_id
- Update mutation on submit
- Success toast and refresh list

### 4.7 Reveal Password Modal
Create `components/entries/RevealPasswordModal.tsx`:
- Clean, focused design
- Display:
  - Website name as title
  - Username/email
  - Password in large, monospace font
  - Copy button next to password
  - "Revealed at" timestamp
- Auto-hide password after 30 seconds (with countdown)
- Warning message about security
- Option to extend visibility
- Mask password by default, click to reveal

### 4.8 Delete Confirmation Dialog
Create `components/entries/DeleteConfirmDialog.tsx`:
- Shadcn AlertDialog component
- Show website name in warning message
- "This action cannot be undone" warning
- Danger-styled "Delete" button
- Cancel button
- Delete mutation on confirm
- Success toast

### 4.9 Password Strength Indicator
Create `components/shared/PasswordStrengthIndicator.tsx`:
- Visual bar (red → yellow → green)
- Text label (Weak/Medium/Strong/Very Strong)
- Based on password_strength from API
- Real-time calculation for new passwords
- Criteria checklist:
  - Length ≥ 8 characters
  - Contains uppercase
  - Contains lowercase
  - Contains numbers
  - Contains symbols

### 4.10 Copy to Clipboard
Implement copy functionality:
- Use Clipboard API
- Toast notification on successful copy
- Different messages: "Username copied", "Password copied"
- Fallback for older browsers
- Error handling

### 4.11 Toast Notifications
Setup Sonner toasts:
- Success: Entry created, updated, deleted
- Error: API errors, validation errors
- Info: Copied to clipboard, password revealed
- Position: top-right
- Custom styling to match theme

### 4.12 Loading States
Implement comprehensive loading states:
- Table skeleton (shimmer effect)
- Modal loading spinner on submit
- Button loading states (spinner + disabled)
- Search loading indicator
- Suspense boundaries for code splitting

### 4.13 Error Handling
Implement error boundaries and handling:
- API error messages displayed in toast
- Form validation errors under fields
- Network error handling (retry option)
- 404 errors (entry not found)
- 401 errors (redirect to login)

### 4.14 Empty States
Create beautiful empty states:
- No entries: Illustration + "Create your first password" CTA
- Search no results: "No matches found" message
- Network error: Retry button

### 4.15 Responsive Design
Ensure mobile responsiveness:
- Sidebar collapses to hamburger menu on mobile
- Table converts to card layout on small screens
- Stack form fields vertically on mobile
- Touch-friendly button sizes
- Mobile-optimized modals (full screen on mobile)

### 4.16 Keyboard Shortcuts
Add keyboard shortcuts:
- `Ctrl/Cmd + K` - Focus search
- `Ctrl/Cmd + N` - New entry
- `Escape` - Close modals
- `Enter` - Submit forms
- Arrow keys - Navigate table (future)

### 4.17 Performance Optimizations
- Memoize expensive components
- Virtual scrolling for large lists (future)
- Lazy load modals
- Debounce search input
- Optimize re-renders with React.memo
- Code splitting by route

### 4.18 Security Features
- HTTPS enforcement check
- Auto-logout after inactivity (30 min)
- Clear sensitive data from memory
- Secure token storage
- CSP headers (via Vite config)
- No password logging in console

### 4.19 Final Polish
- Smooth animations (Framer Motion or CSS)
- Micro-interactions (button hovers, clicks)
- Consistent spacing and sizing
- Dark mode support (optional but recommended)
- Favicon and page titles
- Loading screen on app initialization

### 4.20 Testing & Documentation
- Test all CRUD operations
- Test authentication flow
- Test search functionality
- Test responsive design
- Add README with setup instructions
- Add screenshots to README
- Environment variables documentation

---

## Implementation Order Summary

### Day 1: Foundation (Phase 1)
- Project setup and dependencies
- Folder structure
- Axios client and API types
- React Query setup

### Day 2: Authentication (Phase 2)
- Auth store and hooks
- Login page
- Register page
- Protected routes

### Day 3: Dashboard Layout (Phase 3.1-3.3)
- Dashboard layout
- Navbar
- Sidebar
- Basic routing

### Day 4: Data Layer (Phase 3.4-3.7)
- Entry types and schemas
- Entries API layer
- Custom hooks
- React Query integration

### Day 5: Table & Search (Phase 3.8-3.10, 4.1-4.3)
- Dashboard page structure
- Entry table
- Search bar
- Pagination

### Day 6: Create & Generate (Phase 4.4-4.5)
- Create entry modal
- Password generator
- Form validation

### Day 7: Edit & Reveal (Phase 4.6-4.7)
- Edit entry modal
- Reveal password modal
- Copy functionality

### Day 8: Delete & Polish (Phase 4.8-4.20)
- Delete confirmation
- Loading states
- Error handling
- Final polish and testing

---

## Key Design Principles

1. **Security First**: Never log sensitive data, auto-clear clipboard, session timeout
2. **User Experience**: Instant feedback, loading states, error messages, success confirmations
3. **Performance**: Debounce, pagination, memoization, code splitting
4. **Accessibility**: Keyboard navigation, ARIA labels, focus management
5. **Responsive**: Mobile-first design, touch-friendly, adaptive layouts
6. **Modern**: Latest React patterns, TypeScript, composition, hooks
7. **Maintainable**: Clear folder structure, separation of concerns, reusable components

---

## Color Scheme Suggestion

```js
// tailwind.config.js
colors: {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    // ... blue/indigo shades
    900: '#1e3a8a',
  },
  accent: {
    // Purple shades for CTAs
  },
  success: {
    // Green for strong passwords
  },
  danger: {
    // Red for delete actions
  }
}
```

---

## Ready to Implement!

Once you confirm this plan, we'll proceed phase by phase to build a production-ready password manager frontend with excellent UX, security, and maintainability.
