import { NextRequest, NextResponse } from "next/server";
import { api } from "../../api";
import { parse } from "cookie";
import { isAxiosError } from "axios";
import { logErrorResponse } from "../../_utils/utils";

export async function GET(req: NextRequest) {
    try {

        const cookieHeader = req.headers.get("cookie") || "";
        const parsedCookies = parse(cookieHeader);

        const accessToken = parsedCookies.accessToken;
        const refreshToken = parsedCookies.refreshToken;

        if (accessToken) return NextResponse.json({ success: true });

        if (refreshToken) {
            const apiRes = await api.get("auth/session", {
                headers: { Cookie: cookieHeader },
            });

            const setCookie = apiRes.headers["set-cookie"];
            const response = NextResponse.json({ success: true }, { status: 200 });

            if (setCookie) {
                const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
                for (const cookieStr of cookieArray) {
                    const parsed = parse(cookieStr);
                    const options = {
                        path: parsed.Path || "/",
                        httpOnly: true,
                        expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                        maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
                    };
                    if (parsed.accessToken) response.cookies.set("accessToken", parsed.accessToken, options);
                    if (parsed.refreshToken) response.cookies.set("refreshToken", parsed.refreshToken, options);
                }
            }

            return response;
        }

        return NextResponse.json({ success: false }, { status: 200 });
    } catch (error) {
        if (isAxiosError(error)) logErrorResponse(error.response?.data);
        else logErrorResponse({ message: (error as Error).message });

        return NextResponse.json({ success: false }, { status: 200 });
    }
}
