import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/User";


export async function DELETE(request: NextRequest, { params }: { params: { messageId: string } }) {
    await dbConnect();
    try {
        const messageId = params.messageId;
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            return NextResponse.json(
                { success: false, message: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { _id } = session.user;

        const updateResult = await UserModel.updateOne(
            { _id },
            { $pull: { messages: { _id: messageId } } }
        );

        if (updateResult.modifiedCount === 0) {
            return NextResponse.json(
                { success: false, message: 'Message not found or already deleted' },
                { status: 404 }
            );
        }
        return NextResponse.json(
            { success: true, message: 'Message deleted' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error deleting message:', error);
        return NextResponse.json(
            { success: false, message: 'Error deleting message' },
            { status: 500 }
        );
    }
}