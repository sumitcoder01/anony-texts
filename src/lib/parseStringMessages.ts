import { specialChar } from "@/constants/aiPromt"

export const parseStringMessages = (message: string): string[] => {
    return message.split(specialChar);
}