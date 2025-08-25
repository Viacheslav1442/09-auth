import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { parse } from 'cookie';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

type Props = {
    params: { id: string };
};

export async function GET(request: NextRequest, { params }: Props) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const { id } = params;

        const res = await api(`/notes/${id}`, {
            headers: { Cookie: cookieHeader },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: Props) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const { id } = params;

        const res = await api.delete(`/notes/${id}`, {
            headers: { Cookie: cookieHeader },
        });

        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        if (isAxiosError(error)) {
            logErrorResponse(error.response?.data);
            return NextResponse.json(
                { error: error.message, response: error.response?.data },
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, { params }: Props) {
    try {
        const cookieHeader = request.headers.get('cookie') || '';
        const { id } = params;
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
                { status: error.status || 500 }
            );
        }
        logErrorResponse({ message: (error as Error).message });
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
