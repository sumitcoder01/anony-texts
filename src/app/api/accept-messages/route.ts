import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/options';
import UserModel from "@/models/User";

export async function POST(request: NextRequest) {
    await dbConnect();
    try {
        // Check if the user is authenticated
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { _id } = session.user;
        const { acceptMessages } = await request.json();

        // Update the user's message acceptance status
        const user = await UserModel.findByIdAndUpdate(_id, { isAcceptingMessages: acceptMessages }, { new: true });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unable to find user to update message acceptance status' },
                { status: 404 }
            );
        }
        // Successfully updated message acceptance status
        return NextResponse.json(
            {
                success: true,
                message: 'Message acceptance status updated successfully',
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error updating message acceptance status:', error);

        return NextResponse.json(
            { success: false, message: 'Error updating message acceptance status' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    await dbConnect();
    try {
        // Get the user session
        const session = await getServerSession(authOptions);

        // Check if the user is authenticated
        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { _id } = session.user;
        // Retrieve the user from the database using the ID
        const user = await UserModel.findById(_id);

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Unable to find user' },
                { status: 404 }
            );
        }
        // Return the user's message acceptance status
        return NextResponse.json(
            {
                success: true,
                isAcceptingMessages: user.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error retrieving message acceptance status:', error);
        return NextResponse.json(
            { success: false, message: 'Error retrieving message acceptance status' },
            { status: 500 }
        );
    }
}