import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  avatar: z.string().nullish(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullish(),
});

export const createUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(1),
}).strict();

export const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.email().optional(),
  avatar: z.string().optional(),
  passwordHash: z.string().optional(),
  deletedAt: z.coerce.date().optional(),
}).strict();

export const userWithPasswordSchema = z.object({
  id: z.number(),
  name: z.string(),
  deletedAt: z.coerce.date().nullable(),
  passwordHash: z.string(),
})

export const userPayloadSchema = z.object({
  id: z.number(),
  name: z.string(),
})

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserWithPassword = z.infer<typeof userWithPasswordSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;