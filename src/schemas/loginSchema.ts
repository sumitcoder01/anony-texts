import { z } from 'zod'
import { passwordValidation } from './registerSchema';

export const identifierValidation = z.string().min(2, 'identifier must be at least 2 characters');

export const loginSchema = z.object({
    identifier: identifierValidation,
    password: passwordValidation,
});