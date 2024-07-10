import { z } from "zod";
const MAX_FILE_SIZE = 5120000; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const avatarImageSchema = z.object({
    file: z
        .any()
        .refine((imageFiles) => imageFiles?.length >= 1, 'Image is required.')
        .refine((imageFiles) => imageFiles?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 5MB.")
        .refine(
            (imageFiles) => ACCEPTED_IMAGE_TYPES.includes(imageFiles?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})