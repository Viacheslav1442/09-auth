import { NextRequest, NextResponse } from "next/server";
import { checkSession } from "./lib/api/serverApi";

const PRIVATE_PREFIXES = ["/profile", "/notes"];
const AUTH_PAGES = ["/sign-in", "/sign-up"];

function isPrivatePath(pathname: string) {
    return PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
}

function isAuthPage(pathname: string) {
    return AUTH_PAGES.includes(pathname);
}

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;


    if (
        pathname.startsWith("/api") ||
        pathname.startsWith("/_next") ||
        pathname.startsWith("/public") ||
        pathname === "/favicon.ico"
    ) {
        return NextResponse.next();
    }


    const accessToken = req.cookies.get("accessToken")?.value;
    const refreshToken = req.cookies.get("refreshToken")?.value;

    const response = NextResponse.next();
    let authorized = false;

    if (accessToken || refreshToken) {
        try {
            const cookieHeader = `accessToken=${accessToken ?? ""}; refreshToken=${refreshToken ?? ""}`;


            const session = await checkSession(cookieHeader);

            if (session.valid) {
                authorized = true;


                session.cookies.forEach((c) => {
                    response.cookies.set(c.name, c.value ?? "", {
                        ...c.options,
                        httpOnly: true,
                        path: "/",
                    });
                });
            }
        } catch (error) {
            console.error("Middleware session check failed:", error);
        }
    }


    if (isPrivatePath(pathname) && !authorized) {
        return NextResponse.redirect(new URL("/sign-in", req.url));
    }


    if (isAuthPage(pathname) && authorized) {
        return NextResponse.redirect(new URL("/profile", req.url));
    }

    return response;
}


export const config = {
    matcher: ["/profile/:path*", "/notes/:path*", "/sign-in", "/sign-up"],
};
