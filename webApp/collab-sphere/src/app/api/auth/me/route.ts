import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

interface JWTPayload {
  id: string;
  [key: string]: any;
}

async function verifyToken(token: string): Promise<{ verified: boolean; payload: JWTPayload | null }> {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    const { payload } = await jwtVerify(token, secret);
    return { verified: true, payload: payload as JWTPayload };
  } catch (error) {
    return { verified: false, payload: null };
  }
}

export async function GET(): Promise<NextResponse> {
  try {
    // Get token from cookies - fix: await the cookies()
    const cookieStore = await cookies();
    const token = cookieStore.get('authToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { message: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    const { verified, payload } = await verifyToken(token);
    
    if (!verified || !payload) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Get user from database (optional - to get latest user data)
    await dbConnect();
    const user = await User.findById(payload.id).select('-password');
    
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }
    
    // Fix: Ensure we properly convert ObjectId to string and set proper content type
    return NextResponse.json({
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}