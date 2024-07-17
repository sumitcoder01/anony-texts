import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import { deleteFromCloudinary, uploadToCloudinary } from "@/lib/cloudinary";
import fs from "fs";
import UserModel from "@/models/User";
import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/options";


export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { _id } = session.user;

        const form = await request.formData();
        const file = form.get("file") as File;

        const user = await UserModel.findById(_id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const filePath = `public/uploads/${file.name}`;
        fs.writeFileSync(filePath, buffer);

        const { secure_url, public_id } = await uploadToCloudinary(filePath);

        fs.unlinkSync(filePath);

        await UserModel.findByIdAndUpdate(_id, { avatar: { secure_url, public_id } });

        if(user.avatar && user.avatar.public_id) await deleteFromCloudinary(user.avatar.public_id);

        return NextResponse.json(
            {
                success: true,
                message: "avatar updated",
                secure_url,
                public_id
            },
            { status: 201 }
        );
    } catch (error) {
        console.log("Error on uploading image " + error);
        return NextResponse.json(
            {
                success: false,
                message: "Error on uploading image"
            },
            { status: 500 }
        );
    }
}
