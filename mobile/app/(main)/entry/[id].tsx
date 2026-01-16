/**
 * Entry Detail Screen
 * View password entry details with reveal option
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { useEntry, useRevealPassword, useEntries } from '@/hooks/useEntries';
import { clipboardManager } from '@/utils/clipboard';
import { formatDate } from '@/utils/helpers';
import { getErrorMessage } from '@/utils/errorHandling';

export default function EntryDetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const entryId = params.id as string;

  const { entry, isLoading } = useEntry(entryId);
  const { reveal, isRevealing, revealedEntry } = useRevealPassword(entryId);
  const { deleteEntry, isDeleting } = useEntries();

  const [passwordRevealed, setPasswordRevealed] = useState(false);

  const handleRevealPassword = async () => {
    if (passwordRevealed) {
      setPasswordRevealed(false);
      return;
    }

    try {
      await reveal();
      setPasswordRevealed(true);
    } catch (error) {
      Alert.alert('Error', getErrorMessage(error));
    }
  };

  const handleCopyUsername = async () => {
    if (entry) {
      await clipboardManager.copyUsername(entry.login_email_or_username);
      Alert.alert('Copied', 'Username copied to clipboard');
    }
  };

  const handleCopyPassword = async () => {
    if (revealedEntry) {
      await clipboardManager.copyPassword(revealedEntry.password);
      Alert.alert('Copied', 'Password copied to clipboard (will clear in 30s)');
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Password',
      `Are you sure you want to delete "${entry?.website_name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteEntry(entryId);
              router.back();
            } catch (error) {
              Alert.alert('Error', getErrorMessage(error));
            }
          },
        },
      ]
    );
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
            <Ionicons name="arrow-back" size={24} color="#111827" />
          </TouchableOpacity>
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Entry not found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#111827" />
        </TouchableOpacity>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={() => router.push(`/(main)/entry/edit/${entryId}`)}
            style={styles.headerButton}
          >
            <Ionicons name="create-outline" size={24} color="#6366f1" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleDelete}
            style={styles.headerButton}
            disabled={isDeleting}
          >
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Website Info */}
        <View style={styles.section}>
          <View style={styles.iconContainer}>
            <Ionicons name="globe" size={48} color="#6366f1" />
          </View>
          <Text style={styles.websiteName}>{entry.website_name}</Text>
          {entry.website_url && (
            <Text style={styles.websiteUrl}>{entry.website_url}</Text>
          )}
        </View>

        {/* Username/Email */}
        <View style={styles.fieldSection}>
          <View style={styles.fieldHeader}>
            <Text style={styles.fieldLabel}>Username / Email</Text>
            <TouchableOpacity onPress={handleCopyUsername}>
              <Ionicons name="copy-outline" size={20} color="#6366f1" />
            </TouchableOpacity>
          </View>
          <Text style={styles.fieldValue}>{entry.login_email_or_username}</Text>
        </View>

        {/* Password */}
        <View style={styles.fieldSection}>
          <View style={styles.fieldHeader}>
            <Text style={styles.fieldLabel}>Password</Text>
            <View style={styles.passwordActions}>
              <TouchableOpacity
                onPress={handleRevealPassword}
                style={styles.actionButton}
                disabled={isRevealing}
              >
                {isRevealing ? (
                  <ActivityIndicator size="small" color="#6366f1" />
                ) : (
                  <Ionicons
                    name={passwordRevealed ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6366f1"
                  />
                )}
              </TouchableOpacity>
              {passwordRevealed && (
                <TouchableOpacity onPress={handleCopyPassword} style={styles.actionButton}>
                  <Ionicons name="copy-outline" size={20} color="#6366f1" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <Text style={styles.fieldValue}>
            {passwordRevealed && revealedEntry
              ? revealedEntry.password
              : '••••••••••••'}
          </Text>
        </View>

        {/* Notes */}
        {entry.notes && (
          <View style={styles.fieldSection}>
            <Text style={styles.fieldLabel}>Notes</Text>
            <Text style={styles.fieldValue}>{entry.notes}</Text>
          </View>
        )}

        {/* Metadata */}
        <View style={styles.metadataSection}>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Created</Text>
            <Text style={styles.metadataValue}>{formatDate(entry.created_at)}</Text>
          </View>
          <View style={styles.metadataRow}>
            <Text style={styles.metadataLabel}>Last Updated</Text>
            <Text style={styles.metadataValue}>{formatDate(entry.updated_at)}</Text>
          </View>
          {entry.last_accessed && (
            <View style={styles.metadataRow}>
              <Text style={styles.metadataLabel}>Last Accessed</Text>
              <Text style={styles.metadataValue}>{formatDate(entry.last_accessed)}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  content: {
    padding: 24,
  },
  section: {
    alignItems: 'center',
    marginBottom: 24,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#eef2ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  websiteName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  websiteUrl: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  fieldSection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  fieldHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  fieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
    textTransform: 'uppercase',
  },
  fieldValue: {
    fontSize: 16,
    color: '#111827',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  passwordActions: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 12,
  },
  metadataSection: {
    marginTop: 24,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  metadataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  metadataLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  metadataValue: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
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
