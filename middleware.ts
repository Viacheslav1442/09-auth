import { NextRequest, NextResponse } from "next/server";

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


    const sessionRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/session`, {
        headers: { cookie: req.headers.get("cookie") ?? "" },
    }).catch(() => null);

    const authorized = !!(sessionRes && sessionRes.ok && sessionRes.headers.get("content-type")?.includes("application/json"));

    if (isPrivatePath(pathname) && !authorized) {
        const url = new URL("/sign-in", req.url);
        return NextResponse.redirect(url);
    }
    if (isAuthPage(pathname) && authorized) {
        const url = new URL("/profile", req.url);
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)"],
};
