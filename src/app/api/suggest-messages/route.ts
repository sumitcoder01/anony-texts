import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { prompt } from '@/constants/aiPromt';

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function GET(_request: NextRequest) {
    try {
        const response = await openai.completions.create({
            model: 'gpt-3.5-turbo-instruct',
            max_tokens: 2000,
            stream: true,
            prompt,
        });
        const stream = OpenAIStream(response);
        return new StreamingTextResponse(stream);

    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            // OpenAI API error handling
            const { name, status, headers, message } = error;
            return NextResponse.json({ success: false, name, status, headers, message }, { status });
        } else {
            // General error handling
            console.error('An unexpected error occurred:', error);
            return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
        }
    }
}