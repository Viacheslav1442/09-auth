import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const apiRes = await api.post('auth/register', body);

        const setCookie = apiRes.headers['set-cookie'];

        const res = NextResponse.json(apiRes.data, { status: apiRes.status });

        if (setCookie) {
            const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
            for (const cookieStr of cookieArray) {
                const parsed = parse(cookieStr);

                const options = {
                    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                    path: parsed.Path,
                    maxAge: Number(parsed['Max-Age']),
                };

                if (parsed.accessToken) res.cookies.set('accessToken', parsed.accessToken, options);
                if (parsed.refreshToken) res.cookies.set('refreshToken', parsed.refreshToken, options);
            }
        }

        return res;
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
