import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkSession } from "./lib/api/serverApi";

export async function middleware(req: NextRequest) {
    let authorized = false;

    try {
        const cookieHeader = req.headers.get("cookie") || "";


        const session = await checkSession(cookieHeader);


        if (session.status === 200) {


            authorized = true;
        }
    } catch (error) {
        console.error("Session check failed:", error);
    }

    if (!authorized) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}
