import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username must not contain special characters');

export const registerSchema = z.object({
    username: usernameValidation,

    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters' }),
    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters' })
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords don't match",
            path: ['confirmPassword'],
        });
    }
});