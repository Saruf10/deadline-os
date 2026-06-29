import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY!,
});

export async function generateSchedule(
  prompt: string
) {
  const systemPrompt = `
You are an expert AI Productivity Planner.

The user will describe their day naturally.

Your job is to return ONLY valid JSON.

Return this structure:

{
 "summary":"",
 "risk":"Low | Medium | High",
 "productivityScore":95,
 "tasks":[
   {
     "title":"",
     "description":"",
     "startTime":"",
     "endTime":"",
     "priority":"Low|Medium|High|Critical",
     "estimatedDuration":60,
     "category":"",
     "fixed":false
   }
 ]
}

Do NOT write markdown.

Do NOT explain.

Return JSON only.
`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `${systemPrompt}\n\n${prompt}`,
  });

  return response.text;
}