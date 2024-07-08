import { z } from "zod";
import { identifierValidation } from "./loginSchema";

export const identifierSchema = z.object({
    identifier: identifierValidation
});

export const forgotPasswordSchema = z.object({
    code: z.string().length(6, 'Verification code must be 6 digits'),
    identifier: identifierValidation,
    password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
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