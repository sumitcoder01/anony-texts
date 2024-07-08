import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../[...nextauth]/options";
import { getServerSession } from "next-auth";
import UserModel from "@/models/User";
import { sendEmail } from "@/lib/sendEmail";


export async function PUT(request: NextRequest) {
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
        const { email, username } = await request.json();

        const user = await UserModel.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        if (user.username !== username) {
            const existingUserWithUsername = await UserModel.findOne({ username });
            if (existingUserWithUsername && user.email !== existingUserWithUsername.email) {
                return NextResponse.json(
                    { success: false, message: 'username already taken' },
                    { status: 404 }
                );
            }
        }

        if (user.email !== email) {
            const existingUserWithEmail = await UserModel.findOne({ email });
            if (existingUserWithEmail && user.username !== existingUserWithEmail.username) {
                return NextResponse.json(
                    { success: false, message: 'email already taken' },
                    { status: 404 }
                );
            }
        }

        if (user.email === email) {
            await UserModel.findByIdAndUpdate(_id, { username });
            return NextResponse.json(
                { success: true, message: 'profile details updated' },
                { status: 201 }
            );
        }

        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
        const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

        await UserModel.findByIdAndUpdate(_id, { email, username, isVerified: false, verifyCode, verifyCodeExpiry });

        // Send verification email
        const subject = "OTP for Email Verification";
        const emailResponse = await sendEmail(
            email,
            subject,
            username,
            verifyCode
        );

        if (!emailResponse.success) {
            return NextResponse.json(
                {
                    success: false,
                    message: emailResponse.message,
                },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: 'profile details updated. Please verify your email.',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error updating profile:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Error updating profile',
            },
            { status: 500 }
        );
    }

}