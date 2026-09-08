import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().nullable(),
  passwordHash: z.string(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  passwordHash: z.string(),
});

export const updateUserSchema = z.object({
  name: z.string().nullable(),
  email: z.email().nullable(),
  avatar: z.string().nullable(),
  passwordHash: z.string().nullable(),
  deletedAt: z.coerce.date().nullable().nullable(),
});

export type User = z.infer<typeof userSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;