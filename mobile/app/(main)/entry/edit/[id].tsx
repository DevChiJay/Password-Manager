/**
 * Edit Entry Screen
 * Edit existing password entry
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Ionicons } from '@expo/vector-icons';

import { useEntry, useEntries } from '@/hooks/useEntries';
import { passwordEntryUpdateSchema, type PasswordEntryUpdateInput } from '@/schemas';
import { getErrorMessage } from '@/utils/errorHandling';
import PasswordGenerator from '@/components/vault/PasswordGenerator';

export default function EditEntryScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const entryId = params.id as string;

  const { entry, isLoading } = useEntry(entryId);
  const { updateEntry, isUpdating } = useEntries();
  const [showPassword, setShowPassword] = useState(false);
  const [showGenerator, setShowGenerator] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<PasswordEntryUpdateInput>({
    resolver: zodResolver(passwordEntryUpdateSchema),
  });

  useEffect(() => {
    if (entry) {
      reset({
        website_name: entry.website_name,
        website_url: entry.website_url || '',
        login_email_or_username: entry.login_email_or_username,
        notes: entry.notes || '',
      });
    }
  }, [entry, reset]);

  const onSubmit = async (data: PasswordEntryUpdateInput) => {
    try {
      // Only send changed fields
      const updates: PasswordEntryUpdateInput = {};
      if (data.website_name && data.website_name !== entry?.website_name) {
        updates.website_name = data.website_name;
      }
      if (data.website_url !== entry?.website_url) {
        updates.website_url = data.website_url || undefined;
      }
      if (data.login_email_or_username && data.login_email_or_username !== entry?.login_email_or_username) {
        updates.login_email_or_username = data.login_email_or_username;
      }
      if (data.password) {
        updates.password = data.password;
      }
      if (data.notes !== entry?.notes) {
        updates.notes = data.notes || undefined;
      }

      if (Object.keys(updates).length === 0) {
        Alert.alert('No Changes', 'No changes were made to the entry');
        return;
      }

      await updateEntry({ id: entryId, data: updates });
      Alert.alert('Success', 'Password entry updated successfully', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    }
  };

  const handleUseGeneratedPassword = (password: string) => {
    setValue('password', password);
    setShowGenerator(false);
    Alert.alert('Success', 'Password applied to form');
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366f1" />
      </View>
    );
  }

  if (!entry) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="close" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Entry not found</Text>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Password</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Form */}
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website Name</Text>
            <Controller
              control={control}
              name="website_name"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.website_name && styles.inputError]}
                  placeholder="e.g., Google, Facebook"
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  editable={!isUpdating}
                />
              )}
            />
            {errors.website_name && (
              <Text style={styles.errorText}>{errors.website_name.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Website URL (Optional)</Text>
            <Controller
              control={control}
              name="website_url"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.website_url && styles.inputError]}
                  placeholder="https://example.com"
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  keyboardType="url"
                  autoCapitalize="none"
                  editable={!isUpdating}
                />
              )}
            />
            {errors.website_url && (
              <Text style={styles.errorText}>{errors.website_url.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username / Email</Text>
            <Controller
              control={control}
              name="login_email_or_username"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.input, errors.login_email_or_username && styles.inputError]}
                  placeholder="username or email"
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  autoCapitalize="none"
                  editable={!isUpdating}
                />
              )}
            />
            {errors.login_email_or_username && (
              <Text style={styles.errorText}>
                {errors.login_email_or_username.message}
              </Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <View style={styles.passwordLabelRow}>
              <Text style={styles.label}>New Password (Optional)</Text>
              <TouchableOpacity
                onPress={() => setShowGenerator(!showGenerator)}
                style={styles.generateButton}
              >
                <Ionicons name="key-outline" size={16} color="#6366f1" />
                <Text style={styles.generateText}>
                  {showGenerator ? 'Hide' : 'Generate'}
                </Text>
              </TouchableOpacity>
            </View>
            
            <Text style={styles.hint}>Leave blank to keep current password</Text>

            {showGenerator && (
              <View style={styles.generatorContainer}>
                <PasswordGenerator onUsePassword={handleUseGeneratedPassword} />
              </View>
            )}

            <View style={styles.passwordContainer}>
              <Controller
                control={control}
                name="password"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      errors.password && styles.inputError,
                    ]}
                    placeholder="Enter new password"
                    placeholderTextColor="#9ca3af"
                    value={value}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    editable={!isUpdating}
                  />
                )}
              />
              <TouchableOpacity
                style={styles.eyeIcon}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={24}
                  color="#6b7280"
                />
              </TouchableOpacity>
            </View>
            {errors.password && (
              <Text style={styles.errorText}>{errors.password.message}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Notes (Optional)</Text>
            <Controller
              control={control}
              name="notes"
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={[styles.textArea, errors.notes && styles.inputError]}
                  placeholder="Add notes..."
                  placeholderTextColor="#9ca3af"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={!isUpdating}
                />
              )}
            />
            {errors.notes && (
              <Text style={styles.errorText}>{errors.notes.message}</Text>
            )}
          </View>

          <TouchableOpacity
            style={[styles.submitButton, isUpdating && styles.submitButtonDisabled]}
            onPress={handleSubmit(onSubmit)}
            disabled={isUpdating}
          >
            {isUpdating ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text style={styles.submitButtonText}>Update Password</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  hint: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
  },
  passwordLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#eef2ff',
    borderRadius: 6,
  },
  generateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6366f1',
    marginLeft: 4,
  },
  generatorContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 50,
  },
  eyeIcon: {
    position: 'absolute',
    right: 12,
    top: 13,
  },
  textArea: {
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#111827',
    backgroundColor: '#ffffff',
  },
  errorText: {
    fontSize: 12,
    color: '#ef4444',
    marginTop: 4,
  },
  submitButton: {
    height: 50,
    backgroundColor: '#6366f1',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
