# secVault Mobile App - User Guide

## Getting Started

### Installation
1. Download secVault from the App Store (iOS) or Google Play Store (Android)
2. Open the app and complete the onboarding tutorial
3. Create your account with a strong master password

### Creating Your First Password Entry

1. Tap the **"+"** button at the bottom of the screen
2. Fill in the entry details:
   - **Title**: Name of the account (e.g., "Gmail")
   - **Username**: Your email or username
   - **Password**: Your password (or generate a strong one)
   - **URL**: Website URL (optional)
   - **Notes**: Additional information (optional)
   - **Category**: Select a category (optional)
3. Tap **"Save"** to store the entry

## Features

### Password Generator
Generate strong, secure passwords:

1. When creating/editing an entry, tap the **"Generate"** button
2. Customize settings:
   - Length (8-128 characters)
   - Include uppercase letters
   - Include lowercase letters
   - Include numbers
   - Include symbols
3. Tap **"Generate"** to create a password
4. Tap **"Use Password"** to fill the entry

### Password Strength Indicator
- Real-time strength analysis as you type
- Color-coded strength meter:
  - 🔴 Red: Very Weak
  - 🟠 Orange: Weak
  - 🟡 Yellow: Fair
  - 🟢 Green: Good
  - 🔵 Blue: Very Strong
- Suggestions for improvement

### Searching and Filtering

**Search**:
1. Tap the search bar at the top
2. Type to filter entries by title, username, or URL
3. Results update in real-time

**Filter by Category**:
1. Tap the **"Filter"** button
2. Select categories to show
3. Apply filter to view matching entries

**Sort Options**:
- A-Z (alphabetically)
- Recently Added
- Recently Modified
- Most Used

### Copying Passwords

1. Tap on a password entry
2. Tap the **"Copy Password"** button
3. Password is copied to clipboard for 30 seconds
4. A countdown timer shows time remaining
5. After 30 seconds, clipboard is automatically cleared

### Biometric Authentication

Enable Face ID or Fingerprint:
1. Go to **Settings**
2. Toggle **"Biometric Authentication"**
3. Follow the prompts to set up
4. Now unlock the app with your face or fingerprint

### Security Insights

View your password security dashboard:
1. Go to **Settings** → **Security Insights**
2. See statistics:
   - Total passwords
   - Weak passwords (needs improvement)
   - Reused passwords (security risk)
   - Old passwords (last changed > 90 days)
3. Tap each category to see affected entries
4. Update weak/reused/old passwords

### Export Data

Backup your vault:
1. Go to **Settings** → **Export Data**
2. Choose format:
   - **JSON**: Full data with metadata
   - **CSV**: Spreadsheet format
3. Tap **"Export"**
4. Choose where to save the file
5. **Note**: Exported file is not encrypted - keep it secure!

### Import Data

Import passwords from another service:
1. Go to **Settings** → **Import Data**
2. Tap **"Select File"**
3. Choose your CSV file
4. Preview the import
5. Tap **"Import"** to add entries
6. **Supported formats**:
   - secVault CSV
   - Generic CSV (title, username, password, url, notes)

### Bulk Operations

Manage multiple entries at once:
1. Tap **"Select"** in the vault
2. Select multiple entries (checkboxes appear)
3. Choose an action:
   - **Delete**: Remove selected entries
   - **Move**: Change category
   - **Export**: Export selected entries only
4. Confirm the action

### Offline Mode

secVault works offline:
- View all your passwords without internet
- Create/edit/delete entries offline
- Changes sync when you're back online
- Orange banner shows when offline

### Screenshot Protection (Android)

Your data is protected from screenshots:
- Screenshots are blocked in the app
- Screen recording is prevented
- Screen appears blank in app switcher
- **Note**: iOS has system-level screenshot prevention

## Security Best Practices

### Master Password
- Use a strong, unique password (16+ characters)
- Never reuse your master password
- Don't share it with anyone
- Consider using a passphrase (e.g., "correct-horse-battery-staple")

### Two-Factor Authentication
- Enable 2FA on your secVault account
- Use an authenticator app (not SMS)
- Save backup codes in a secure location

### Regular Maintenance
1. Review **Security Insights** monthly
2. Update weak passwords
3. Change passwords for important accounts every 3-6 months
4. Remove old/unused accounts

### Data Backup
- Export your vault monthly
- Store backup in a secure location (encrypted USB, cloud storage)
- Test restore process occasionally

## Troubleshooting

### Can't Login
- Verify your email and password
- Check if Caps Lock is on
- Try "Forgot Password" to reset
- Ensure you have internet connection

### App is Slow
- Close other apps
- Restart the app
- Clear app cache (Settings → Clear Cache)
- Update to latest version

### Biometric Not Working
- Ensure biometric is set up in phone settings
- Re-enable in app settings
- Restart the app
- Check for iOS/Android updates

### Lost Master Password
- Unfortunately, we cannot recover your master password
- This is by design for security
- You'll need to reset your account (all data will be lost)
- Always keep a secure backup

### Sync Issues
- Check internet connection
- Try manual sync (pull to refresh)
- Sign out and sign back in
- Contact support if issue persists

## Privacy & Security

### Encryption
- All data encrypted with AES-256
- Encryption happens on your device
- We never see your unencrypted data
- Master password never leaves your device

### Data Storage
- Local database on your device
- Encrypted cloud backup
- Zero-knowledge architecture
- We can't access your passwords

### Privacy Policy
- We don't sell your data
- Minimal data collection
- Anonymous usage analytics only
- GDPR compliant

## Support

### Contact Us
- Email: support@secvault.app
- Twitter: @secvault
- Help Center: help.secvault.app

### Feedback
We love hearing from you! Share your ideas:
- In-app feedback (Settings → Send Feedback)
- App Store/Play Store reviews
- Feature requests on our website

### Updates
- Enable automatic updates
- Check changelog for new features
- Follow us for update announcements

## FAQ

**Q: Is secVault open source?**
A: Yes! Our code is available on GitHub for transparency and security audits.

**Q: Can you recover my password?**
A: No, we use zero-knowledge encryption. We cannot access or recover your passwords.

**Q: Is my data backed up?**
A: Yes, encrypted backups are stored in the cloud. You can also export local backups.

**Q: How secure is secVault?**
A: We use military-grade AES-256 encryption, industry best practices, and regular security audits.

**Q: Can I use secVault on multiple devices?**
A: Yes! Your vault syncs across all your devices automatically.

**Q: Is there a desktop app?**
A: Currently mobile only, but web app is coming soon!

---

**Thank you for using secVault! Stay secure! 🔐**
