import imageCompression, { Options } from 'browser-image-compression';

const options: Options = {
    maxSizeMB: 5,
}

export const handleImageCompression = async (file: File | null) => {
    try {
        if (!file) throw new Error("file does not exits")
        const compressedFile = await imageCompression(file, options);
        return compressedFile;
    } catch (error) {
        console.log(error);
        return null;
    }
}