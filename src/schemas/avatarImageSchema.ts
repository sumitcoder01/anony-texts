import { z } from "zod";
const MAX_FILE_SIZE = 10240000; // 10MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const avatarImageSchema = z.object({
    file: z
        .custom<FileList>()
        .refine((imageFiles) => imageFiles?.length >= 1, 'Image is required.')
        .refine((imageFiles) => imageFiles?.[0]?.size <= MAX_FILE_SIZE, "Max image size is 10MB.")
        .refine(
            (imageFiles) => ACCEPTED_IMAGE_TYPES.includes(imageFiles?.[0]?.type),
            "Only .jpg, .jpeg, .png and .webp formats are supported."
        )
})