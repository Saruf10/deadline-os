"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { createTask } from "@/lib/firestore";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function AddTaskDialog() {
  const { user } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [duration, setDuration] = useState(60);

  async function handleCreate() {
    if (!title || !deadline) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      await createTask({
        userId: user.uid,
        title,
        description,
        deadline,
        priority: priority as "Low" | "Medium" | "High",
        estimatedDuration: duration,
        completed: false,
        aiRisk: 0,
        createdAt: Date.now(),
      });

      setTitle("");
      setDescription("");
      setDeadline("");
      setPriority("Medium");
      setDuration(60);

      alert("Task created successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to create task.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Task</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">

          <Input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select
            className="w-full rounded-md border p-2"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>

          <Input
            type="number"
            placeholder="Estimated Minutes"
            value={duration}
            onChange={(e) =>
              setDuration(Number(e.target.value))
            }
          />

          <Button
            className="w-full"
            onClick={handleCreate}
          >
            Save Task
          </Button>

        </div>
      </DialogContent>
    </Dialog>
  );
}