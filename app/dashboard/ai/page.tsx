"use client";

import { useState } from "react";

import BrainDump from "@/components/ai/brain-dump";
import GeneratedSchedule from "@/components/ai/generated-schedule";

export default function AIPage() {
  const [schedule, setSchedule] =
    useState<any>(null);

  return (
    <div className="mx-auto max-w-5xl space-y-8 p-8">

      {!schedule ? (
        <BrainDump
          onGenerate={setSchedule}
        />
      ) : (
        <GeneratedSchedule
          schedule={schedule}
        />
      )}

    </div>
  );
}