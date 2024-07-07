import { z } from "zod";
import { usernameValidation } from "./registerSchema";


export const updateUserSchema = z.object({
    username: usernameValidation,
    email: z.string().email({ message: 'Invalid email address' }),
});