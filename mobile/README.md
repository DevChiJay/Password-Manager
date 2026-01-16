# Svault Mobile

Secure password manager mobile app built with Expo and React Native.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on Android
npm run android

# Run on iOS
npm run ios
```

## Building & Deployment

See [BUILD-STEPS.md](./BUILD-STEPS.md) for complete EAS build and deployment instructions.

## Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

## Project Structure

- `app/` - Application screens and routes (Expo Router)
- `components/` - Reusable UI components
- `services/` - API clients and business logic
- `hooks/` - Custom React hooks
- `utils/` - Utility functions
- `types/` - TypeScript type definitions

## Documentation

- [User Guide](./USER_GUIDE.md)
- [Build & Deploy Guide](./BUILD-STEPS.md)

## Tech Stack

- Expo SDK 54
- React Native 19
- TypeScript
- Expo Router
- React Query
- Biometric Authentication
