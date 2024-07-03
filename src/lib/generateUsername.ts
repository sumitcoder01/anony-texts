import { generateFromEmail } from "unique-username-generator";


export const createUserName = (email: string): string => {
    const username: string = generateFromEmail(
        email,
        10
    );
    return username;
}