/**
 * Password Generator Component
 * Generate secure passwords with customizable options
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';

import { passwordGeneratorService } from '@/services/api';
import { clipboardManager } from '@/utils/clipboard';
import { getPasswordStrengthColor, getPasswordStrengthLabel } from '@/utils/passwordStrength';
import { PasswordStrength } from '@/types';

interface PasswordGeneratorProps {
  onUsePassword: (password: string) => void;
}

export default function PasswordGenerator({ onUsePassword }: PasswordGeneratorProps) {
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState('');
  const [strength, setStrength] = useState<PasswordStrength | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    handleGenerate();
  }, []);

  const handleGenerate = async () => {
    if (!includeSymbols && !includeNumbers && !includeUppercase && !includeLowercase) {
      Alert.alert('Error', 'Please select at least one character type');
      return;
    }

    setIsGenerating(true);
    try {
      const result = await passwordGeneratorService.generatePassword({
        length,
        include_symbols: includeSymbols,
        include_numbers: includeNumbers,
        include_uppercase: includeUppercase,
        include_lowercase: includeLowercase,
      });
      setGeneratedPassword(result.password);
      setStrength(result.strength);
    } catch (error) {
      Alert.alert('Error', 'Failed to generate password');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    if (generatedPassword) {
      await clipboardManager.copy(generatedPassword);
      Alert.alert('Copied', 'Password copied to clipboard');
    }
  };

  const handleUse = () => {
    if (generatedPassword) {
      onUsePassword(generatedPassword);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Password Generator</Text>

      {/* Generated Password Display */}
      <View style={styles.passwordDisplay}>
        <Text style={styles.password} numberOfLines={1}>
          {isGenerating ? 'Generating...' : generatedPassword || '••••••••••••'}
        </Text>
        {strength && (
          <View
            style={[
              styles.strengthBadge,
              { backgroundColor: getPasswordStrengthColor(strength) },
            ]}
          >
            <Text style={styles.strengthText}>{getPasswordStrengthLabel(strength)}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleGenerate}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <ActivityIndicator size="small" color="#6366f1" />
          ) : (
            <Ionicons name="refresh" size={24} color="#6366f1" />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={handleCopy}>
          <Ionicons name="copy-outline" size={24} color="#6366f1" />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.useButton, !generatedPassword && styles.useButtonDisabled]}
          onPress={handleUse}
          disabled={!generatedPassword}
        >
          <Text style={styles.useButtonText}>Use Password</Text>
        </TouchableOpacity>
      </View>

      {/* Length Slider */}
      <View style={styles.option}>
        <View style={styles.optionHeader}>
          <Text style={styles.optionLabel}>Length</Text>
          <Text style={styles.optionValue}>{length}</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={8}
          maximumValue={128}
          step={1}
          value={length}
          onValueChange={setLength}
          onSlidingComplete={handleGenerate}
          minimumTrackTintColor="#6366f1"
          maximumTrackTintColor="#d1d5db"
        />
      </View>

      {/* Character Type Options */}
      <View style={styles.optionsGrid}>
        <View style={styles.switchOption}>
          <Text style={styles.switchLabel}>Uppercase (A-Z)</Text>
          <Switch
            value={includeUppercase}
            onValueChange={(value) => {
              setIncludeUppercase(value);
              setTimeout(handleGenerate, 100);
            }}
            trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
            thumbColor={includeUppercase ? '#6366f1' : '#f4f4f5'}
          />
        </View>

        <View style={styles.switchOption}>
          <Text style={styles.switchLabel}>Lowercase (a-z)</Text>
          <Switch
            value={includeLowercase}
            onValueChange={(value) => {
              setIncludeLowercase(value);
              setTimeout(handleGenerate, 100);
            }}
            trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
            thumbColor={includeLowercase ? '#6366f1' : '#f4f4f5'}
          />
        </View>

        <View style={styles.switchOption}>
          <Text style={styles.switchLabel}>Numbers (0-9)</Text>
          <Switch
            value={includeNumbers}
            onValueChange={(value) => {
              setIncludeNumbers(value);
              setTimeout(handleGenerate, 100);
            }}
            trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
            thumbColor={includeNumbers ? '#6366f1' : '#f4f4f5'}
          />
        </View>

        <View style={styles.switchOption}>
          <Text style={styles.switchLabel}>Symbols (!@#$)</Text>
          <Switch
            value={includeSymbols}
            onValueChange={(value) => {
              setIncludeSymbols(value);
              setTimeout(handleGenerate, 100);
            }}
            trackColor={{ false: '#d1d5db', true: '#a5b4fc' }}
            thumbColor={includeSymbols ? '#6366f1' : '#f4f4f5'}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  passwordDisplay: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  password: {
    fontSize: 18,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    color: '#111827',
    marginBottom: 8,
  },
  strengthBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  strengthText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
    textTransform: 'uppercase',
  },
  actions: {
    flexDirection: 'row',
    marginBottom: 24,
    alignItems: 'center',
  },
  actionButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  useButton: {
    flex: 1,
    height: 48,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  useButtonDisabled: {
    opacity: 0.5,
  },
  useButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  option: {
    marginBottom: 20,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  optionValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  optionsGrid: {
    gap: 12,
  },
  switchOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  switchLabel: {
    fontSize: 14,
    color: '#374151',
  },
});
