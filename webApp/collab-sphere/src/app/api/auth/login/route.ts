// src/app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { SignJWT } from 'jose';
import dbConnect from '@/lib/dbConnect';
import User from '@/lib/models/User';

// Generate JWT token
async function generateToken(payload: any) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
  
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('1d') // Token expires in 1 day
    .sign(secret);
  
  return token;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Create token payload
    const tokenPayload = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    // Generate token
    const token = await generateToken(tokenPayload);
    
    // Set cookie
    const cookiesStore = await cookies();
    cookiesStore.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day in seconds
      sameSite: 'lax',
    });
    
    // Return user data without password
    return NextResponse.json({
        message: 'Login successful',
        user: {
          id: user._id.toString(),  // Convert ObjectId to string
          name: user.name,
          email: user.email,
          role: user.role,
        }
      });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}