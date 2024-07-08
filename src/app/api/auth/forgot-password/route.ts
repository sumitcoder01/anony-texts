import dbConnect from "@/lib/dbConnect";
import { sendEmail } from "@/lib/sendEmail";
import UserModel from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        const { identifier } = await request.json();

        const user = await UserModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier },
            ],
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const verifyCodeExpiry = new Date();
        verifyCodeExpiry.setHours(verifyCodeExpiry.getHours() + 1);
        user.verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyCodeExpiry = verifyCodeExpiry;
        await user.save();

        // Send verification email
        const subject = "OTP for Forgot Password";
        const emailResponse = await sendEmail(
            user.email,
            subject,
            user.username,
            user.verifyCode
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
                message: 'OTP is sent to your register email.',
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error forgetting password:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Error forgetting password',
            },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest) {
    await dbConnect();
    try {
        const { code, identifier, password } = await request.json();

        const user = await UserModel.findOne({
            $or: [
                { email: identifier },
                { username: identifier },
            ]
        })

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the code is correct and not expired
        const isValid = user.verifyCode === code && (new Date(user.verifyCodeExpiry) > new Date());

        if (!isValid) {
            return NextResponse.json(
                { success: false, message: 'Incorrect verification code.' },
                { status: 400 }
            );
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        user.password = hashedPassword;
        await user.save();

        return NextResponse.json(
            {
                success: true,
                message: 'password updated.',
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error updating password:', error);
        return NextResponse.json(
            {
                success: false,
                message: 'Error updating password',
            },
            { status: 500 }
        );
    }
}