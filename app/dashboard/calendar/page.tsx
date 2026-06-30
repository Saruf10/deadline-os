"use client";

import { useEffect, useMemo, useState } from "react";

import {
  Calendar,
  dateFnsLocalizer,
} from "react-big-calendar";

import "react-big-calendar/lib/css/react-big-calendar.css";

import {
  format,
  parse,
  startOfWeek,
  getDay,
} from "date-fns";

import { enUS } from "date-fns/locale";

import { useAuth } from "@/contexts/AuthContext";
import { getTasks } from "@/lib/firestore";
import { Task } from "@/types/task";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarPage() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    async function load() {
      if (!user) return;

      const data = await getTasks(user.uid);

      setTasks(data);
    }

    load();
  }, [user]);

  const events = useMemo(() => {
    return tasks.map((task) => ({
      title: task.title,
      start: new Date(task.deadline),
      end: new Date(task.deadline),
      resource: task,
    }));
  }, [tasks]);

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-4xl font-bold">
          Calendar
        </h1>

        <p className="mt-2 text-muted-foreground">
          View all your scheduled tasks.
        </p>
      </div>

      <div className="rounded-3xl border bg-card p-6">

        <div style={{ height: 700 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
          />
        </div>

      </div>

    </div>
  );
}