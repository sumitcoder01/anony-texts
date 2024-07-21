import { Password_Regex, Username_Regex } from '@/constants/regex';
import { z } from 'zod';

export const usernameValidation = z
    .string()
    .min(2, 'Username must be at least 2 characters')
    .max(20, 'Username must be no more than 20 characters')
    .regex(Username_Regex, 'Username must not contain special characters');

export const passwordValidation = z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .regex(Password_Regex, 'Password  must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number');

export const registerSchema = z.object({
    username: usernameValidation,

    email: z.string().email({ message: 'Invalid email address' }),
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

export const usernameSchema = z.object({
    username: usernameValidation
});