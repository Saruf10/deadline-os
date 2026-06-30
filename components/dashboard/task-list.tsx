"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/AuthContext";
import {
  completeTask,
  getTasks,
  removeTask,
} from "@/lib/firestore";

import { Task } from "@/types/task";

import {
  CheckCircle,
  Circle,
  Trash2,
  Clock,
  CalendarDays,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function TaskList() {
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [priorityFilter, setPriorityFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  async function loadTasks() {
    if (!user) return;

    try {
      const data = await getTasks(user.uid);
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTasks();
  }, [user]);

  async function toggleComplete(task: Task) {
    if (!task.id) return;

    await completeTask(task.id, !task.completed);

    loadTasks();
  }

  async function deleteTask(id?: string) {
    if (!id) return;

    if (!confirm("Delete this task?")) return;

    await removeTask(id);

    loadTasks();
  }

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    const matchesStatus =
      statusFilter === "All" ||
      (statusFilter === "Completed" && task.completed) ||
      (statusFilter === "Pending" && !task.completed);

    return (
      matchesSearch &&
      matchesPriority &&
      matchesStatus
    );
  });


  const completedCount = tasks.filter(
    (t) => t.completed
  ).length;

  const pendingCount =
    tasks.length - completedCount;


  if (loading) {
    return (
      <div className="flex h-56 items-center justify-center rounded-3xl border bg-card">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="rounded-3xl border bg-card p-8 shadow-sm">

      <div className="mb-8 flex items-center gap-3">
        <Sparkles className="h-7 w-7 text-primary" />

        <div>
          <h2 className="text-2xl font-bold">
            Today's Tasks
          </h2>

          <p className="text-sm text-muted-foreground">
            Stay focused and complete your priorities.
          </p>
        </div>
      </div>


      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <Input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={priorityFilter}
          onChange={(e) =>
            setPriorityFilter(e.target.value)
          }
          className="rounded-xl border p-3"
        >
          <option>All</option>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="rounded-xl border p-3"
        >
          <option>All</option>
          <option>Completed</option>
          <option>Pending</option>
        </select>

      </div>


      <div className="mb-8 grid gap-4 md:grid-cols-3">

        <div className="rounded-2xl border p-5">
          <p className="text-sm text-muted-foreground">
            Total
          </p>

          <h2 className="text-3xl font-bold">
            {tasks.length}
          </h2>
        </div>


        <div className="rounded-2xl border p-5">
          <p className="text-sm text-muted-foreground">
            Completed
          </p>

          <h2 className="text-3xl font-bold text-green-600">
            {completedCount}
          </h2>
        </div>


        <div className="rounded-2xl border p-5">
          <p className="text-sm text-muted-foreground">
            Pending
          </p>

          <h2 className="text-3xl font-bold text-orange-500">
            {pendingCount}
          </h2>
        </div>

      </div>


      {filteredTasks.length === 0 ? (

        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed py-14 text-center">

          <Sparkles className="mb-4 h-10 w-10 text-muted-foreground" />

          <h3 className="text-xl font-semibold">
            No matching tasks found
          </h3>

          <p className="mt-2 max-w-sm text-muted-foreground">
            Try changing your search or filters,
            or create a new task.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {filteredTasks.map((task) => (

            <div
              key={task.id}
              className={`rounded-2xl border bg-background p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                task.completed
                  ? "opacity-70"
                  : ""
              }`}
            >

              <div className="flex items-start justify-between">

                <div className="flex gap-4">

                  <button
                    onClick={() =>
                      toggleComplete(task)
                    }
                    className="mt-1 transition hover:scale-110"
                  >

                    {task.completed ? (

                      <CheckCircle className="h-7 w-7 text-green-600" />

                    ) : (

                      <Circle className="h-7 w-7 text-muted-foreground" />

                    )}

                  </button>


                  <div>

                    <h3
                      className={`text-xl font-semibold ${
                        task.completed
                          ? "line-through text-muted-foreground"
                          : ""
                      }`}
                    >
                      {task.title}
                    </h3>


                    <p className="mt-2 max-w-xl leading-7 text-muted-foreground">
                      {task.description || "No description provided."}
                    </p>


                    <div className="mt-5 flex flex-wrap gap-3">

                      <span className="flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm">
                        <CalendarDays className="h-4 w-4" />
                        {task.deadline}
                      </span>


                      <span className="flex items-center gap-2 rounded-full bg-muted px-3 py-2 text-sm">
                        <Clock className="h-4 w-4" />
                        {task.estimatedDuration} mins
                      </span>


                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          task.priority === "High"
                            ? "bg-red-100 text-red-700"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-700"
                        }`}
                      >
                        {task.priority} Priority
                      </span>


                    </div>

                  </div>

                </div>


                <button
                  onClick={() =>
                    deleteTask(task.id)
                  }
                  className="rounded-xl p-3 transition hover:bg-red-100 hover:text-red-600"
                >
                  <Trash2 className="h-5 w-5" />
                </button>


              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}