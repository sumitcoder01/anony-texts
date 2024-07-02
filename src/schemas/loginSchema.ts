import { z } from 'zod'

export const LoginSchema = z.object({
    identifier: z.string().min(2, 'Username must be at least 2 characters')
        .max(20, 'Username must be no more than 20 characters'),
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});