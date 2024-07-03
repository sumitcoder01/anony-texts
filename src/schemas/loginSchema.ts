import { z } from 'zod'

export const loginSchema = z.object({
    identifier: z.string().min(2, 'identifier must be at least 2 characters'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});