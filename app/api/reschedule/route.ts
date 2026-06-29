import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const { task } = await req.json();

    const prompt = `
You are DeadlineOS AI.

The user missed this task.

Title: ${task.title}
Description: ${task.description}
Priority: ${task.priority}
Deadline: ${task.deadline}

Return ONLY valid JSON.

{
  "newDate":"YYYY-MM-DD",
  "reason":"..."
}

Rules:
- High -> tomorrow
- Medium -> within 2 days
- Low -> within 3 days

DO NOT use markdown.
DO NOT use \`\`\`json.
DO NOT explain anything.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    return NextResponse.json({
      result: response.text,
    });

  } catch (error: any) {
    console.error("RESCHEDULE API ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        error: error?.message || "Unknown error",
      },
      {
        status: 500,
      }
    );
  }
}