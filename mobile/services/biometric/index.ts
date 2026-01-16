/**
 * Biometric Authentication Service
 * Manages fingerprint/Face ID authentication
 */

import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SECURITY_CONFIG } from '../../constants/config';

class BiometricService {
  /**
   * Check if device supports biometric authentication
   */
  async isSupported(): Promise<boolean> {
    try {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      return compatible;
    } catch (error) {
      console.error('Error checking biometric support:', error);
      return false;
    }
  }

  /**
   * Check if biometrics are enrolled on device
   */
  async isEnrolled(): Promise<boolean> {
    try {
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      return enrolled;
    } catch (error) {
      console.error('Error checking biometric enrollment:', error);
      return false;
    }
  }

  /**
   * Get available biometric types
   */
  async getAvailableTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    try {
      return await LocalAuthentication.supportedAuthenticationTypesAsync();
    } catch (error) {
      console.error('Error getting biometric types:', error);
      return [];
    }
  }

  /**
   * Authenticate user with biometrics
   */
  async authenticate(promptMessage = 'Authenticate to access your vault'): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage,
        cancelLabel: 'Cancel',
        disableDeviceFallback: false,
        requireConfirmation: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }

  /**
   * Check if biometric login is enabled for the app
   */
  async isBiometricLoginEnabled(): Promise<boolean> {
    try {
      const enabled = await AsyncStorage.getItem(SECURITY_CONFIG.BIOMETRIC_ENABLED_KEY);
      return enabled === 'true';
    } catch (error) {
      console.error('Error checking biometric login status:', error);
      return false;
    }
  }

  /**
   * Enable biometric login
   */
  async enableBiometricLogin(): Promise<void> {
    try {
      await AsyncStorage.setItem(SECURITY_CONFIG.BIOMETRIC_ENABLED_KEY, 'true');
    } catch (error) {
      console.error('Error enabling biometric login:', error);
      throw new Error('Failed to enable biometric login');
    }
  }

  /**
   * Disable biometric login
   */
  async disableBiometricLogin(): Promise<void> {
    try {
      await AsyncStorage.setItem(SECURITY_CONFIG.BIOMETRIC_ENABLED_KEY, 'false');
    } catch (error) {
      console.error('Error disabling biometric login:', error);
      throw new Error('Failed to disable biometric login');
    }
  }

  /**
   * Check if biometric authentication is available and set up
   */
  async isAvailable(): Promise<boolean> {
    const supported = await this.isSupported();
    const enrolled = await this.isEnrolled();
    return supported && enrolled;
  }

  /**
   * Get biometric type name for display
   */
  async getBiometricTypeName(): Promise<string> {
    const types = await this.getAvailableTypes();
    
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      return 'Face ID';
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      return 'Fingerprint';
    } else if (types.includes(LocalAuthentication.AuthenticationType.IRIS)) {
      return 'Iris';
    }
    
    return 'Biometric';
  }
}

export { BiometricService };
export const biometricService = new BiometricService();
