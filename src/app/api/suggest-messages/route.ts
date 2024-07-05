import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { prompt } from '@/constants/aiPromt';

export async function GET(_request: NextRequest) {
    try {
        const response = await streamText({
            model: openai('gpt-3.5-turbo-instruct'),
            prompt,
        });
        return response.toAIStreamResponse();
    } catch (error) {
        console.error('An unexpected error occurred:', error);
        return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 });
    }
}