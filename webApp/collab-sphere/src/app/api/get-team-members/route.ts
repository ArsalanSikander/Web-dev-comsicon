import { NextResponse } from "next/server";
import User from "@/lib/models/User";
import dbConnect from "@/lib/dbConnect";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        const data = await User.find({role : "TeamMember"});
        console.log("Got team members: " + data);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data' },
            { status: 500 }
        );
    }
}