/**
 * E2E Tests - Vault Management
 */

import { device, element, by, expect as detoxExpect } from 'detox';

describe('Vault Management', () => {
  beforeAll(async () => {
    await device.launchApp();
    
    // Login first
    await element(by.text('Skip')).tap();
    await element(by.text('Already have an account? Sign In')).tap();
    await element(by.id('login-email-input')).typeText('test@example.com');
    await element(by.id('login-password-input')).typeText('SecurePass123!');
    await element(by.id('login-submit-button')).tap();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should show empty state when no passwords exist', async () => {
    await detoxExpect(element(by.text('No Passwords Yet'))).toBeVisible();
    await detoxExpect(element(by.text('Add Password'))).toBeVisible();
  });

  it('should add a new password', async () => {
    // Tap add button
    await element(by.id('add-password-button')).tap();
    
    // Fill in form
    await element(by.id('entry-title-input')).typeText('Gmail');
    await element(by.id('entry-username-input')).typeText('user@gmail.com');
    await element(by.id('entry-password-input')).typeText('MyPassword123!');
    await element(by.id('entry-url-input')).typeText('https://gmail.com');
    
    // Save
    await element(by.id('save-entry-button')).tap();
    
    // Should show in list
    await detoxExpect(element(by.text('Gmail'))).toBeVisible();
  });

  it('should search for passwords', async () => {
    // Add some entries first
    await element(by.id('add-password-button')).tap();
    await element(by.id('entry-title-input')).typeText('Facebook');
    await element(by.id('entry-username-input')).typeText('user@example.com');
    await element(by.id('entry-password-input')).typeText('Pass123!');
    await element(by.id('save-entry-button')).tap();
    
    // Search
    await element(by.id('search-input')).typeText('Gmail');
    
    // Should show Gmail, not Facebook
    await detoxExpect(element(by.text('Gmail'))).toBeVisible();
    await detoxExpect(element(by.text('Facebook'))).not.toBeVisible();
  });

  it('should copy password to clipboard', async () => {
    // Tap on entry
    await element(by.text('Gmail')).tap();
    
    // Copy password
    await element(by.id('copy-password-button')).tap();
    
    // Should show success message
    await detoxExpect(element(by.text('Password copied'))).toBeVisible();
  });

  it('should edit a password', async () => {
    // Tap on entry
    await element(by.text('Gmail')).tap();
    
    // Tap edit
    await element(by.id('edit-entry-button')).tap();
    
    // Update title
    await element(by.id('entry-title-input')).clearText();
    await element(by.id('entry-title-input')).typeText('Gmail Updated');
    
    // Save
    await element(by.id('save-entry-button')).tap();
    
    // Should show updated title
    await detoxExpect(element(by.text('Gmail Updated'))).toBeVisible();
  });

  it('should delete a password', async () => {
    // Tap on entry
    await element(by.text('Gmail Updated')).tap();
    
    // Tap delete
    await element(by.id('delete-entry-button')).tap();
    
    // Confirm deletion
    await element(by.text('Delete')).tap();
    
    // Should not be visible
    await detoxExpect(element(by.text('Gmail Updated'))).not.toBeVisible();
  });

  it('should filter passwords by category', async () => {
    // Add entries with categories
    await element(by.id('add-password-button')).tap();
    await element(by.id('entry-title-input')).typeText('Twitter');
    await element(by.id('entry-category-select')).tap();
    await element(by.text('Social Media')).tap();
    await element(by.id('save-entry-button')).tap();
    
    // Apply filter
    await element(by.id('filter-button')).tap();
    await element(by.text('Social Media')).tap();
    
    // Should show filtered entries
    await detoxExpect(element(by.text('Twitter'))).toBeVisible();
  });

  it('should generate a strong password', async () => {
    // Tap add button
    await element(by.id('add-password-button')).tap();
    
    // Open password generator
    await element(by.id('generate-password-button')).tap();
    
    // Generate password
    await element(by.id('generate-button')).tap();
    
    // Use generated password
    await element(by.id('use-password-button')).tap();
    
    // Password field should be filled
    await detoxExpect(element(by.id('entry-password-input'))).not.toHaveText('');
  });
});
