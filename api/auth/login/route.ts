import { NextRequest, NextResponse } from 'next/server';
import { api } from '@/lib/api/api';
import { cookies } from 'next/headers';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';


export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const apiRes = await api.post("auth/login", body);

        const setCookie = apiRes.headers["set-cookie"];


        const response = NextResponse.json(apiRes.data, { status: apiRes.status });

        if (setCookie) {
            const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
            for (const cookieStr of cookieArray) {
                const parsed = parse(cookieStr);
                const options = {
                    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                    path: parsed.Path,
                    maxAge: parsed["Max-Age"] ? Number(parsed["Max-Age"]) : undefined,
                };

                if (parsed.accessToken) {
                    response.cookies.set("accessToken", parsed.accessToken, options);
                }
                if (parsed.refreshToken) {
                    response.cookies.set("refreshToken", parsed.refreshToken, options);
                }
            }
        }

        return response;
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status }
            );
        }

        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}