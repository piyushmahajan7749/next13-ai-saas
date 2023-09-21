import * as z from "zod";

export const formSchema = z.object({
  prompt: z.string().min(1, {
    message: "Music prompt is required",
  }),
});

export interface User {
  name: string;
  description: string;
}

export interface Audience {
  // Define the structure of an audience document
  name: string;
  users: User[];
  // Add other fields as needed
  id: string; // This field will hold the document ID
}

export interface ConfigureMessageProps {
  audience?: Audience;
}

export interface ScheduleMessageProps {
  audience?: Audience;
}
