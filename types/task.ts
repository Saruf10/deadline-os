export interface Task {
  id?: string;

  userId: string;

  title: string;

  description: string;

  deadline: string;

  priority: "Low" | "Medium" | "High";

  estimatedDuration: number;

  completed: boolean;

  aiRisk: number;

  createdAt: number;

  startTime?: string;

  endTime?: string;

  generatedByAI?: boolean;
}