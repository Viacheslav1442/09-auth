import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function POST(req: NextRequest) {
    try {

        const cookieHeader = req.headers.get("cookie") || "";
        const parsedCookies = parse(cookieHeader);

        const accessToken = parsedCookies.accessToken;
        const refreshToken = parsedCookies.refreshToken;

        // Відправляємо logout на бекенд
        await api.post(
            "auth/logout",
            null,
            {
                headers: {
                    Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
                },
            }
        );


        const response = NextResponse.json(
            { message: "Logged out successfully" },
            { status: 200 }
        );

        response.cookies.set("accessToken", "", { path: "/", maxAge: 0 });
        response.cookies.set("refreshToken", "", { path: "/", maxAge: 0 });

        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
