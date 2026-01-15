/**
 * E2E Tests - Authentication Flow
 */

import { device, element, by, expect as detoxExpect } from 'detox';

describe('Authentication Flow', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show onboarding screen on first launch', async () => {
    await detoxExpect(element(by.text('Secure Your Passwords'))).toBeVisible();
  });

  it('should complete onboarding and navigate to register', async () => {
    // Skip onboarding
    await element(by.text('Skip')).tap();
    
    // Should show register screen
    await detoxExpect(element(by.text('Create Account'))).toBeVisible();
  });

  it('should register a new user', async () => {
    // Navigate to register
    await element(by.text('Skip')).tap();
    
    // Fill in registration form
    await element(by.id('register-name-input')).typeText('Test User');
    await element(by.id('register-email-input')).typeText('test@example.com');
    await element(by.id('register-password-input')).typeText('SecurePass123!');
    await element(by.id('register-confirm-password-input')).typeText('SecurePass123!');
    
    // Submit
    await element(by.id('register-submit-button')).tap();
    
    // Should navigate to vault
    await detoxExpect(element(by.text('My Vault'))).toBeVisible();
  });

  it('should login an existing user', async () => {
    // Navigate to login
    await element(by.text('Skip')).tap();
    await element(by.text('Already have an account? Sign In')).tap();
    
    // Fill in login form
    await element(by.id('login-email-input')).typeText('test@example.com');
    await element(by.id('login-password-input')).typeText('SecurePass123!');
    
    // Submit
    await element(by.id('login-submit-button')).tap();
    
    // Should navigate to vault
    await detoxExpect(element(by.text('My Vault'))).toBeVisible();
  });

  it('should show error for invalid credentials', async () => {
    // Navigate to login
    await element(by.text('Skip')).tap();
    await element(by.text('Already have an account? Sign In')).tap();
    
    // Fill in wrong credentials
    await element(by.id('login-email-input')).typeText('wrong@example.com');
    await element(by.id('login-password-input')).typeText('wrongpassword');
    
    // Submit
    await element(by.id('login-submit-button')).tap();
    
    // Should show error
    await detoxExpect(element(by.text('Invalid credentials'))).toBeVisible();
  });

  it('should logout successfully', async () => {
    // Login first
    await element(by.text('Skip')).tap();
    await element(by.text('Already have an account? Sign In')).tap();
    await element(by.id('login-email-input')).typeText('test@example.com');
    await element(by.id('login-password-input')).typeText('SecurePass123!');
    await element(by.id('login-submit-button')).tap();
    
    // Navigate to settings
    await element(by.id('settings-tab')).tap();
    
    // Logout
    await element(by.id('logout-button')).tap();
    
    // Should navigate to login
    await detoxExpect(element(by.text('Sign In'))).toBeVisible();
  });
});
