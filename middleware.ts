import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req) {
        const { pathname } = req.nextUrl;
        const token = req.nextauth.token;

        const publicPaths = ["/", "/auth"];
        const isPublic =
            publicPaths.includes(pathname) ||
            pathname.startsWith("/api/blog") ||
            pathname.startsWith("/api/auth") || 
            pathname.startsWith("/blog");

        if (!token && !isPublic) {
            return NextResponse.redirect(new URL("/auth", req.url));
        }

        return NextResponse.next();
    }
);
    

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};