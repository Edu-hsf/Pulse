import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().nullish(),
  passwordHash: z.string().min(1),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  passwordHash: z.string().min(1),
});

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  avatar: z.string().optional(),
  passwordHash: z.string().optional(),
  deletedAt: z.coerce.date().optional().optional(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;