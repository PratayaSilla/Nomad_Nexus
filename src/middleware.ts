import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
    function middleware() {
        return NextResponse.next();
    },
    {
      callbacks: {
        authorized: ({ token, req }) => {
          const pathname = req.nextUrl.pathname;
  
          const publicPaths = ["/", "/auth", "/trips", "/about"];
          const isPublic =
            publicPaths.includes(pathname) ||
            pathname.startsWith("/api/auth") ||
            pathname.startsWith("/story") ||
            pathname.startsWith("/api/blog");
    
          return !!token || isPublic;
        },
      },
      pages: {
        signIn: "/auth", 
      },
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

