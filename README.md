# SecVault - Password Manager

A full-stack secure password management solution with web and mobile applications.

## Project Structure

```
password-manager/
├── frontend/          # Web application (React + Vite)
├── mobile/           # Mobile app (Expo + React Native)
└── backend/          # API server (planned)
```

## Applications

### 🌐 Web Application
Modern web interface for password management.

**Tech Stack:** React, TypeScript, Vite, TailwindCSS, Firebase

**Location:** [`frontend/`](./frontend)

```bash
cd frontend
npm install
npm run dev
```

---

### 📱 Mobile Application
Cross-platform mobile app with biometric authentication.

**Tech Stack:** Expo, React Native, TypeScript, React Query

**Location:** [`mobile/`](./mobile)

```bash
cd mobile
npm install
npm start
```

**Build & Deploy:** See [mobile/BUILD-STEPS.md](./mobile/BUILD-STEPS.md)

---

## Features

- 🔐 Secure password storage
- 📱 Cross-platform (Web & Mobile)
- 🔒 Biometric authentication (mobile)
- 🌙 Dark mode support
- 📋 Clipboard management
- 🔄 Offline-first architecture
- 🔑 Password generator
- 📤 Import/Export functionality

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd password-manager
   ```

2. **Choose your platform:**
   - Web: Follow instructions in [`frontend/README.md`](./frontend/README.md)
   - Mobile: Follow instructions in [`mobile/README.md`](./mobile/README.md)

## Development

### Prerequisites
- Node.js 18+ 
- npm or yarn
- (Mobile) Expo CLI for mobile development

### Environment Setup

Each application requires its own environment configuration:

- **Frontend:** Create `.env` based on Firebase configuration
- **Mobile:** Create `.env` with API endpoints

## Documentation

- [Development Plan](./SECVAULT_DEVELOPMENT_PLAN.md)
- [Mobile Build Guide](./mobile/BUILD-STEPS.md)
- [Mobile User Guide](./mobile/USER_GUIDE.md)

## License

Private project - All rights reserved

## Security

This is a password management application. Please ensure:
- Never commit secrets or API keys
- Use environment variables for sensitive data
- Follow security best practices
- Keep dependencies updated
