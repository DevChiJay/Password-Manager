/**
 * Settings Screen
 * Comprehensive app settings and preferences
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  Modal,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useAuth';
import { biometricService } from '@/services/biometric';
import { settingsStorage } from '@/services/storage/settingsStorage';

export default function SettingsScreen() {
  const router = useRouter();
  const { user, logout } = useAuth();

  // Settings state
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [clipboardTimeout, setClipboardTimeout] = useState(30); // seconds
  const [showTimeoutModal, setShowTimeoutModal] = useState(false);
  const [tempTimeout, setTempTimeout] = useState('30');

  // Load settings on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      // Check biometric support
      const supported = await biometricService.isSupported();
      setBiometricSupported(supported);

      if (supported) {
        const enabled = await biometricService.isBiometricLoginEnabled();
        setBiometricEnabled(enabled);
      }

      // Load clipboard timeout
      const timeout = await settingsStorage.getClipboardTimeout();
      setClipboardTimeout(timeout);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

  const handleBiometricToggle = async (value: boolean) => {
    try {
      if (!biometricSupported) {
        Alert.alert(
          'Not Supported',
          'Biometric authentication is not available on this device.'
        );
        return;
      }

      if (value) {
        // Check if biometrics are enrolled
        const enrolled = await biometricService.isEnrolled();
        if (!enrolled) {
          Alert.alert(
            'Not Enrolled',
            'Please set up biometric authentication in your device settings first.'
          );
          return;
        }

        // Authenticate before enabling
        const authenticated = await biometricService.authenticate(
          'Authenticate to enable biometric login'
        );

        if (authenticated) {
          await biometricService.enableBiometricLogin();
          setBiometricEnabled(true);
          Alert.alert(
            'Enabled',
            'Biometric authentication has been enabled. You can now use fingerprint or face recognition to unlock the app.'
          );
        }
      } else {
        await biometricService.disableBiometricLogin();
        setBiometricEnabled(false);
        Alert.alert('Disabled', 'Biometric authentication has been disabled.');
      }
    } catch (error) {
      console.error('Biometric toggle error:', error);
      Alert.alert('Error', 'Failed to toggle biometric authentication');
    }
  };

  const handleClipboardTimeoutPress = () => {
    setTempTimeout(clipboardTimeout.toString());
    setShowTimeoutModal(true);
  };

  const handleSaveClipboardTimeout = async () => {
    const timeout = parseInt(tempTimeout, 10);
    
    if (isNaN(timeout) || timeout < 5 || timeout > 300) {
      Alert.alert('Invalid Value', 'Please enter a value between 5 and 300 seconds.');
      return;
    }

    try {
      await settingsStorage.setClipboardTimeout(timeout);
      setClipboardTimeout(timeout);
      setShowTimeoutModal(false);
      Alert.alert('Success', `Clipboard will auto-clear after ${timeout} seconds`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save clipboard timeout');
    }
  };

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Logout',
        style: 'destructive',
        onPress: async () => {
          await logout();
          router.replace('/(auth)/login');
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      {/* User Profile Section */}
      <View style={styles.section}>
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Ionicons name="person" size={32} color="#6366F1" />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user?.username || 'User'}</Text>
            <Text style={styles.profileEmail}>{user?.email}</Text>
          </View>
        </View>
      </View>

      {/* Security Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Security</Text>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="finger-print" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Biometric Authentication</Text>
              <Text style={styles.settingDescription}>
                {biometricSupported
                  ? 'Use fingerprint or face recognition'
                  : 'Not available on this device'}
              </Text>
            </View>
          </View>
          <Switch
            value={biometricEnabled}
            onValueChange={handleBiometricToggle}
            disabled={!biometricSupported}
            trackColor={{ false: '#D1D5DB', true: '#A5B4FC' }}
            thumbColor={biometricEnabled ? '#6366F1' : '#F3F4F6'}
          />
        </View>

        <TouchableOpacity style={styles.settingItem} onPress={handleClipboardTimeoutPress}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="copy" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Clipboard Auto-Clear</Text>
              <Text style={styles.settingDescription}>{clipboardTimeout} seconds</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* About */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="information-circle" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>App Version</Text>
              <Text style={styles.settingDescription}>1.0.0</Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="document-text" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Privacy Policy</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="document" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Terms of Service</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <View style={styles.settingIcon}>
              <Ionicons name="code" size={20} color="#6366F1" />
            </View>
            <View style={styles.settingText}>
              <Text style={styles.settingLabel}>Open Source Licenses</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
        </TouchableOpacity>
      </View>

      {/* Danger Zone */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: '#EF4444' }]}>Danger Zone</Text>

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <View style={styles.settingInfo}>
            <View style={[styles.settingIcon, { backgroundColor: '#FEE2E2' }]}>
              <Ionicons name="log-out" size={20} color="#EF4444" />
            </View>
            <View style={styles.settingText}>
              <Text style={[styles.settingLabel, { color: '#EF4444' }]}>Logout</Text>
              <Text style={styles.settingDescription}>Sign out of your account</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#EF4444" />
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>sVault - Secure Password Manager</Text>
        <Text style={styles.footerText}>© 2026 All rights reserved</Text>
      </View>

      {/* Clipboard Timeout Modal */}
      <Modal
        visible={showTimeoutModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimeoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clipboard Auto-Clear</Text>
            <Text style={styles.modalDescription}>
              Set how long copied passwords remain in clipboard (5-300 seconds)
            </Text>
            
            <TextInput
              style={styles.modalInput}
              value={tempTimeout}
              onChangeText={setTempTimeout}
              keyboardType="number-pad"
              placeholder="Enter seconds"
              placeholderTextColor="#9CA3AF"
              maxLength={3}
            />

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonCancel]}
                onPress={() => setShowTimeoutModal(false)}
              >
                <Text style={styles.modalButtonTextCancel}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.modalButtonSave]}
                onPress={handleSaveClipboardTimeout}
              >
                <Text style={styles.modalButtonTextSave}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  section: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6B7280',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#6B7280',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  settingIcon: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingText: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    color: '#6B7280',
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  footerText: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#111827',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonCancel: {
    backgroundColor: '#F3F4F6',
  },
  modalButtonSave: {
    backgroundColor: '#6366F1',
  },
  modalButtonTextCancel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  modalButtonTextSave: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});