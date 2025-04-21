import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Project from '@/lib/models/Project';

export async function POST(request: Request) {

    await dbConnect();
    const body = await request.json();

    const saveResponse = await Project.create(body);

    return NextResponse.json(
        { message: 'Projecct created successfully' },
        { status: 201 }
    );

}