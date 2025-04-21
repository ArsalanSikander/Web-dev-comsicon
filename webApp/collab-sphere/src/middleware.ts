// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

// Paths that don't require authentication
const publicPaths = ['/login', '/signup', '/'];

// Verify the JWT token
async function verifyToken(token: string) {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'fallback_secret_for_development_only');
    const { payload } = await jwtVerify(token, secret);
    return { verified: true, payload };
  } catch (error) {
    return { verified: false, payload: null };
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Check if the path is public
  if (publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'))) {
    return NextResponse.next();
  }

  // Get token from cookies
  const token = request.cookies.get('authToken')?.value;

  // If no token, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Verify token
  const { verified, payload } = await verifyToken(token);

  if (!verified || !payload) {
    // Clear invalid token and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('authToken');
    return response;
  }

  // Role-based access control
  const role = payload.role as string;
  
  // Manager routes
  if (pathname.startsWith('/manager') && role !== 'Manager') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }
  
  // Team member routes
  if (pathname.startsWith('/team-member') && role !== 'TeamMember') {
    return NextResponse.redirect(new URL('/unauthorized', request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     * - api routes that don't need auth (login, signup)
     */
    '/((?!_next/static|_next/image|favicon.ico|public|api/auth/login|api/auth/signup).*)',
  ],
};