import z from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export type createUserSchema = z.infer<typeof createUserSchema>;