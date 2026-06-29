"use client";

import { useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import {
  getMissedTasks,
  updateTask,
} from "@/lib/firestore";

import { Button } from "@/components/ui/button";

import {
  Sparkles,
  Loader2,
  ShieldCheck,
} from "lucide-react";

export default function AIRescue() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function rescueTasks() {
    if (!user) return;

    setLoading(true);
    setMessage("");

    try {
      const missed = await getMissedTasks(user.uid);

      if (missed.length === 0) {
        setMessage("🎉 Great! You have no missed tasks.");
        setLoading(false);
        return;
      }

      let updated = 0;

      for (const task of missed) {
        const res = await fetch("/api/reschedule", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });

        if (!res.ok) continue;

        const data = await res.json();

        const clean = data.result
          .replace(/```json/g, "")
          .replace(/```/g, "")
          .trim();

        const parsed = JSON.parse(clean);

        if (task.id) {
          await updateTask(task.id, {
            deadline: parsed.newDate,
          });

          updated++;
        }
      }

      setMessage(
        `✅ AI successfully optimized ${updated} task${
          updated > 1 ? "s" : ""
        }.`
      );
    } catch (err) {
      console.error(err);

      setMessage(
        "❌ Unable to reschedule tasks. Please try again."
      );
    }

    setLoading(false);
  }

  return (
    <div className="rounded-3xl border bg-gradient-to-r from-violet-50 to-indigo-50 p-8 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-4">

        <div className="rounded-2xl bg-violet-100 p-3">
          <ShieldCheck className="h-7 w-7 text-violet-700" />
        </div>

        <div>
          <h2 className="text-2xl font-bold">
            AI Rescue Mode
          </h2>

          <p className="text-sm text-slate-600">
            Detect overdue tasks and intelligently rebuild your schedule.
          </p>
        </div>

      </div>

      <p className="leading-7 text-slate-700">
        If you've missed deadlines, DeadlineOS uses Gemini AI to
        automatically create a better schedule while keeping your
        priorities in mind.
      </p>

      <Button
        onClick={rescueTasks}
        disabled={loading}
        className="mt-6 h-12 rounded-xl px-6 text-base font-semibold transition-all hover:scale-[1.02]"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            AI is rebuilding your schedule...
          </>
        ) : (
          <>
            <Sparkles className="mr-2 h-5 w-5" />
            Reschedule with AI
          </>
        )}
      </Button>

      {message && (
        <div className="mt-6 rounded-2xl border border-green-200 bg-green-50 p-4">
          <p className="font-medium text-green-700">
            {message}
          </p>
        </div>
      )}

    </div>
  );
}