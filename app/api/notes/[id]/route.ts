import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';


function getIdFromRequest(request: NextRequest) {
    const pathname = request.nextUrl.pathname;
    const parts = pathname.split('/');
    return parts[parts.length - 1];
}

export async function GET(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const res = await api.get(`/notes/${id}`, {
            headers: { Cookie: cookieHeader },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.response?.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const res = await api.delete(`/notes/${id}`, {
            headers: { Cookie: cookieHeader },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.response?.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    const id = getIdFromRequest(request);

    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const body = await request.json();

        const res = await api.patch(`/notes/${id}`, body, {
            headers: { Cookie: cookieHeader },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.response?.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
