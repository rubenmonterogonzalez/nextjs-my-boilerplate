import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth';

export async function middleware(request: NextRequest) {
  const protectedPaths = ['/platform']; 
  
  if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
    const authResponse = await auth();
    if (!authResponse) {
      const url = new URL('/login', request.nextUrl.origin);
      return NextResponse.redirect(url.toString());
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/',
    '/:path*',
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};