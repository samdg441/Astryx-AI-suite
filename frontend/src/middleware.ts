import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import {
  AUTH_COOKIE_NAME,
  isLikelyJwt,
  parseAuthCookieValue,
} from '@/lib/authCookies';

const PROTECTED_PREFIXES = ['/dashboard', '/admin'];

function readAuthToken(request: NextRequest): string | null {
  const raw = parseAuthCookieValue(request.cookies.get(AUTH_COOKIE_NAME)?.value);
  if (!raw || !isLikelyJwt(raw)) return null;
  return raw;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = readAuthToken(request);

  const isProtected = PROTECTED_PREFIXES.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`)
  );

  if (isProtected && !token) {
    const url = request.nextUrl.clone();
    url.pathname = '/auth';
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  if (pathname === '/auth' && token) {
    const url = request.nextUrl.clone();
    url.pathname = '/dashboard';
    url.search = '';
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/auth'],
};
