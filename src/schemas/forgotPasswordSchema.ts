import { z } from "zod";
import { identifierValidation } from "./loginSchema";
import { passwordValidation } from "./registerSchema";

export const identifierSchema = z.object({
    identifier: identifierValidation
});

export const forgotPasswordSchema = z.object({
    code: z.string().length(6, 'Verification code must be 6 digits'),
    identifier: identifierValidation,
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