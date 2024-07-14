import dbConnect from "@/lib/dbConnect";
import { getServerSession } from "next-auth/next";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel, { Message } from "@/models/User";
import { currentPage, pageLimit } from "@/constants/pagaination";


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

        const searchParams = request.nextUrl.searchParams;

        const page = searchParams.has("page") ? Number(searchParams.get("page")) : currentPage;
        const limit = searchParams.has("limit") ? Number(searchParams.get("limit")) : pageLimit;

        const skip = (page - 1) * limit;

        const user = await UserModel.findOne({ _id });

        if (!user) {
            return NextResponse.json(
                { success: false, message: 'User not found' },
                { status: 404 }
            );
        }

        const totalPages = Math.ceil(user.messages.length / limit);

        const messages: Message[] = user.messages.slice(skip, skip + limit).sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
        return NextResponse.json(
            { successs: true, messages, totalPages },
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