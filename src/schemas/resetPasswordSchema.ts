import { z } from 'zod';

export const resetPasswordSchema = z.object({
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