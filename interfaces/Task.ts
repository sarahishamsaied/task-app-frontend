import { Moment } from "moment";
export interface Task {
  title: string;
  content: string;
  startDate: Date;
  endDate: Date;
  status: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export interface TaskWithId extends Task {
  id: string;
}
