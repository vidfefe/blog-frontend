import { z } from "zod";

export const postSchema = z.object({
  title: z.string().min(1, "Title is required"),
  tags: z.string().optional(),
  text: z.string().min(1, "Text is required"),
  imageUrl: z.string().url("Image URL must be valid"),
});

export type PostFormValues = z.infer<typeof postSchema>;
