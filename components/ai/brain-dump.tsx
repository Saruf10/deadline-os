"use client";

import { useState } from "react";
import {
  Sparkles,
  Brain,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function BrainDump({
  onGenerate,
}: {
  onGenerate: (data: any) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  async function generate() {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/generate-schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await res.json();

      let parsed;

      try {
        const clean = data.result
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        parsed = JSON.parse(clean);
      } catch {
        alert("Gemini returned invalid JSON.");
        return;
      }

      onGenerate(parsed);
    } catch (err) {
      console.error(err);
      alert("Failed to generate schedule.");
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border bg-card p-8 shadow-sm">

      {/* Header */}

      <div className="mb-8 flex items-center gap-4">

        <div className="rounded-2xl bg-violet-100 p-3">
          <Brain className="h-7 w-7 text-violet-700" />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Schedule Generator
          </h2>

          <p className="mt-1 text-muted-foreground">
            Describe your day naturally and let Gemini create
            an optimized schedule.
          </p>
        </div>

      </div>

      {/* Textarea */}

      <Textarea
        rows={10}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="rounded-2xl text-base leading-7"
        placeholder={`Example:

Tomorrow I have college from 9AM–4PM.

Need 2 hours for DSA.

Hackathon submission before 2PM.

Gym for one hour.

Need 7 hours sleep.

Optimize my day while avoiding burnout.
`}
      />

      {/* Generate */}

      <Button
        onClick={generate}
        disabled={loading}
        className="mt-6 h-12 w-full rounded-xl text-base font-semibold transition-all hover:scale-[1.02]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Gemini is planning your day...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Generate Smart Schedule
          </>
        )}
      </Button>

    </div>
  );
}