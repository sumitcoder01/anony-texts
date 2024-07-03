import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    await dbConnect();

    try {
        const { username, code } = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodedUsername });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the code is correct and not expired
        const isValid = user.verifyCode === code && (new Date(user.verifyCodeExpiry) > new Date());

        if (isValid) {
            // Update the user's verification status
            user.isVerified = true;
            await user.save();

            return NextResponse.json(
                { success: true, message: 'Account verified successfully' },
                { status: 200 }
            );
        }
        else {
            return NextResponse.json(
                { success: false, message: 'Incorrect verification code , sign up again to get a new code.' },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Error verifying user:', error);
        return NextResponse.json(
            { success: false, message: 'Error verifying user' },
            { status: 500 }
        );
    }
}