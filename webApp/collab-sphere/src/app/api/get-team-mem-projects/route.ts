import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Project from "@/lib/models/Project";

export async function GET(): Promise<NextResponse> {
    try {
        await dbConnect();
        const data = await Project.find({ role: "TeamMember" });
        console.log("Got team members: " + data);
        return NextResponse.json(data);
    } catch (error) {
        return NextResponse.json(
            { message: 'Error fetching data' },
            { status: 500 }
        );
    }
}