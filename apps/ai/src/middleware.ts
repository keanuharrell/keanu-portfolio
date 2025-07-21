import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect the builder route
  if (pathname.startsWith('/builder')) {
    // In a real app, you'd check for authentication token
    // For demo purposes, we'll just show a login page
    const isAuthenticated = request.cookies.get('auth-token');
    
    if (!isAuthenticated) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/builder/:path*']
};