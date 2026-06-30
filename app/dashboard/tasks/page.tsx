import TaskList from "@/components/dashboard/task-list";

export default function TasksPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Tasks
        </h1>

        <p className="mt-2 text-muted-foreground">
          View, search, filter and manage all your tasks.
        </p>
      </div>

      <TaskList />
    </div>
  );
}