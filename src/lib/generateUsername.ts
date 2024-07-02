import { generateFromEmail } from "unique-username-generator";

export type createUserNameProps = {
    email: string;
}

export const createUserName = ({ email }: createUserNameProps): string => {
    const username: string = generateFromEmail(
        email,
        10
    );
    return username;
}