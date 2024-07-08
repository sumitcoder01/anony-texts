import { z } from 'zod'

export const identifierValidation = z.string().min(2, 'identifier must be at least 2 characters');

export const loginSchema = z.object({
    identifier: identifierValidation,
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});