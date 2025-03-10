// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // Define the protected path prefixes
  const protectedPaths = [
    '/update-details',
    '/change-password',
    '/employee',
    '/admin',
    '/sysadmin',
    '/superadmin'
  ];

  // If the current path is not protected, continue.
  if (!protectedPaths.some((path) => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  // Check for a cookie named "token"
  const token = request.cookies.get('token');
  if (!token) {
    // Choose the appropriate login route based on path
    let loginPath = '/login';
    if (pathname.startsWith('/admin') || pathname.startsWith('/sysadmin')) {
      loginPath = '/sysadmin/login';
    } else if (pathname.startsWith('/superadmin')) {
      loginPath = '/superadmin/login';
    } else if (pathname.startsWith('/employee')) {
      loginPath = '/login'; // normal users
    }
    const url = request.nextUrl.clone();
    url.pathname = loginPath;
    return NextResponse.redirect(url);
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/update-details/:path*',
    '/change-password/:path*',
    '/employee/:path*',
    '/admin/:path*',
    '/sysadmin/:path*',
    '/superadmin/:path*'
  ],
};