/**
 * Zod Validation Schemas
 * Matching Backend API Validation Requirements
 */

import { z } from 'zod';
import { SECURITY_CONFIG } from '../constants/config';

// ==================== Authentication Schemas ====================

export const userRegisterSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase())
    .refine((val) => val.length > 0, 'Email is required'),
  username: z
    .string()
    .min(1, 'Username must be at least 1 character')
    .max(50, 'Username must not exceed 50 characters')
    .optional()
    .or(z.literal('')),
  password: z
    .string()
    .min(SECURITY_CONFIG.PASSWORD_MIN_LENGTH, `Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters`)
    .max(SECURITY_CONFIG.PASSWORD_MAX_LENGTH, `Password must not exceed ${SECURITY_CONFIG.PASSWORD_MAX_LENGTH} characters`),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export const userLoginSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(1, 'Password is required'),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email address')
    .transform((val) => val.toLowerCase()),
});

export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  new_password: z
    .string()
    .min(SECURITY_CONFIG.PASSWORD_MIN_LENGTH, `Password must be at least ${SECURITY_CONFIG.PASSWORD_MIN_LENGTH} characters`)
    .max(SECURITY_CONFIG.PASSWORD_MAX_LENGTH, `Password must not exceed ${SECURITY_CONFIG.PASSWORD_MAX_LENGTH} characters`),
  confirmPassword: z.string(),
}).refine((data) => data.new_password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

// ==================== Password Entry Schemas ====================

export const passwordEntryCreateSchema = z.object({
  website_name: z
    .string()
    .min(1, 'Website name is required')
    .max(SECURITY_CONFIG.WEBSITE_NAME_MAX_LENGTH, `Website name must not exceed ${SECURITY_CONFIG.WEBSITE_NAME_MAX_LENGTH} characters`),
  website_url: z
    .string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  login_email_or_username: z
    .string()
    .min(1, 'Login email or username is required')
    .max(SECURITY_CONFIG.LOGIN_USERNAME_MAX_LENGTH, `Login must not exceed ${SECURITY_CONFIG.LOGIN_USERNAME_MAX_LENGTH} characters`),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters'),
  notes: z
    .string()
    .max(SECURITY_CONFIG.NOTES_MAX_LENGTH, `Notes must not exceed ${SECURITY_CONFIG.NOTES_MAX_LENGTH} characters`)
    .optional()
    .or(z.literal('')),
});

export const passwordEntryUpdateSchema = z.object({
  website_name: z
    .string()
    .min(1, 'Website name is required')
    .max(SECURITY_CONFIG.WEBSITE_NAME_MAX_LENGTH, `Website name must not exceed ${SECURITY_CONFIG.WEBSITE_NAME_MAX_LENGTH} characters`)
    .optional(),
  website_url: z
    .string()
    .url('Invalid URL format')
    .optional()
    .or(z.literal('')),
  login_email_or_username: z
    .string()
    .min(1, 'Login email or username is required')
    .max(SECURITY_CONFIG.LOGIN_USERNAME_MAX_LENGTH, `Login must not exceed ${SECURITY_CONFIG.LOGIN_USERNAME_MAX_LENGTH} characters`)
    .optional(),
  password: z
    .string()
    .min(3, 'Password must be at least 3 characters')
    .optional(),
  notes: z
    .string()
    .max(SECURITY_CONFIG.NOTES_MAX_LENGTH, `Notes must not exceed ${SECURITY_CONFIG.NOTES_MAX_LENGTH} characters`)
    .optional()
    .or(z.literal('')),
});

// ==================== Password Generation Schema ====================

export const generatePasswordSchema = z.object({
  length: z
    .number()
    .min(8, 'Password length must be at least 8')
    .max(128, 'Password length must not exceed 128')
    .optional()
    .default(16),
  include_symbols: z.boolean().optional().default(true),
  include_numbers: z.boolean().optional().default(true),
  include_uppercase: z.boolean().optional().default(true),
  include_lowercase: z.boolean().optional().default(true),
});

// ==================== Type Inference ====================

export type UserRegisterInput = z.infer<typeof userRegisterSchema>;
export type UserLoginInput = z.infer<typeof userLoginSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type PasswordEntryCreateInput = z.infer<typeof passwordEntryCreateSchema>;
export type PasswordEntryUpdateInput = z.infer<typeof passwordEntryUpdateSchema>;
export type GeneratePasswordInput = z.infer<typeof generatePasswordSchema>;
