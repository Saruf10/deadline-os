export interface ScheduleTask {
  title: string;

  description: string;

  startTime: string;

  endTime: string;

  priority: "Low" | "Medium" | "High" | "Critical";

  estimatedDuration: number;

  category: string;

  fixed: boolean;
}

export interface ScheduleResponse {
  summary: string;

  risk: "Low" | "Medium" | "High";

  productivityScore: number;

  tasks: ScheduleTask[];
}