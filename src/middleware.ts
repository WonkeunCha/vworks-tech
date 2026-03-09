import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 루트 접속 시 /ko로 리다이렉트
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ko", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/(ko|en)/:path*"],
};
