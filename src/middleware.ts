import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  console.log("middleware on demand");
  if (request.nextUrl.pathname.startsWith("/products/1004")) {
    console.log("middleware: redirect pathURL");
    return NextResponse.redirect(new URL("/products", request.url));
  }
}

export const config = {
  matcher: [
    "/products/:path*", // middleware runs on specific paths
  ],
};
