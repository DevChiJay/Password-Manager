import { z } from 'zod'

/**
 * Schema for creating a new password entry
 */
export const createEntrySchema = z.object({
  website_name: z
    .string()
    .min(1, 'Website name is required')
    .max(200, 'Website name is too long'),
  
  website_url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  login_email_or_username: z
    .string()
    .min(1, 'Email or username is required')
    .max(200, 'Email or username is too long'),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long'),
  
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .or(z.literal('')),
})

/**
 * Schema for updating an existing password entry
 */
export const updateEntrySchema = z.object({
  website_name: z
    .string()
    .min(1, 'Website name is required')
    .max(200, 'Website name is too long')
    .optional(),
  
  website_url: z
    .string()
    .url('Please enter a valid URL')
    .optional()
    .or(z.literal('')),
  
  login_email_or_username: z
    .string()
    .min(1, 'Email or username is required')
    .max(200, 'Email or username is too long')
    .optional(),
  
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .optional(),
  
  notes: z
    .string()
    .max(500, 'Notes must be less than 500 characters')
    .optional()
    .or(z.literal('')),
})

/**
 * Type inference from schemas
 */
export type CreateEntryFormData = z.infer<typeof createEntrySchema>
export type UpdateEntryFormData = z.infer<typeof updateEntrySchema>
