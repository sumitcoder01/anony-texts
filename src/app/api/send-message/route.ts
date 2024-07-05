import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/User";


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

        const { username, content } = await request.json();

        const user = await UserModel.findOne({ username });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        // Check if the user is accepting messages
        if (!user.isAcceptingMessages) {
            return NextResponse.json(
                { success: false, message: 'User is not accepting messages' },
                { status: 403 }
            );
        }

        const updatetUser = await UserModel.updateOne(
            { _id: user._id },
            { $push: { messages: { content } } },
            { new: true }
        );

        if (!updatetUser) {
            return NextResponse.json(
                { success: false, message: 'Unable to send message' },
                { status: 405 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Message sent successfully' },
            { status: 201 }
        );

    } catch (error) {
        console.error('Error adding message:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}