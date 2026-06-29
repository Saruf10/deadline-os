import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    const systemPrompt = `
You are DeadlineOS AI.

The user describes their day naturally.

Convert it into a structured JSON schedule.

Return ONLY valid JSON.

{
  "summary":"",
  "risk":"Low",
  "productivityScore":95,
  "tasks":[
    {
      "title":"",
      "description":"",
      "startTime":"",
      "endTime":"",
      "priority":"Low",
      "estimatedDuration":60,
      "category":"",
      "fixed":false
    }
  ]
}

No markdown.

No explanation.

Only JSON.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `${systemPrompt}

${prompt}`,
    });

    return NextResponse.json({
      result: response.text,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "Failed to generate schedule.",
      },
      {
        status: 500,
      }
    );
  }
}