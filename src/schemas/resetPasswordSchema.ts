import { z } from 'zod';
import { passwordValidation } from './registerSchema';

export const resetPasswordSchema = z.object({
    oldPassword: passwordValidation
    password: passwordValidation,
    confirmPassword: passwordValidation
}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Passwords don't match",
            path: ['confirmPassword'],
        });
    }
});