import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel, { Message } from "@/models/User";


export async function GET(request: NextRequest) {
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

        const user = await UserModel.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }
        
        const messages: Message[] = user.messages;

        return NextResponse.json(
            { successs: true, messages },
            { status: 200 }
        );

    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return Response.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}