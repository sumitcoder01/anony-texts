import { generateFromEmail } from "unique-username-generator";
import { useId } from "react";


export const createUserName = (email: string): string => {
    const username: string = generateFromEmail(
        email,
        7
    );
    return username + useId;
}