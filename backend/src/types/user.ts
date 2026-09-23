import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.email(),
  avatar: z.url().nullable(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
});

export const createUserSchema = z.object({
  name: z.string('O campo "name" deve ser uma string.').trim().min(2, 'O campo "name" deve ter no mínimo 2 caracteres.'),
  email: z.email('O campo "email" deve ser um email válido.').trim().min(6, 'O campo "email" deve ter no mínimo 6 caracteres.'),
  password: z
    .string('O campo "password" deve ser uma string.')
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(100, "A senha é muito longa.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial."),
}).strict();

export const updateUserSchema = z.object({
  name: z.string('O campo "name" deve ser uma string.').trim().min(2, 'O campo "name" deve ter no mínimo 2 caracteres.').optional(),
  email: z.email('O campo "email" deve ser um email válido.').trim().min(6, 'O campo "email" deve ter no mínimo 6 caracteres.').optional(),
  avatar: z.url('O campo "URL" deve ser um URL válido.').nullish(),
  password: z.string('O campo "password" deve ser uma string.')
    .min(8, "A senha deve ter no mínimo 8 caracteres.")
    .max(100, "A senha é muito longa.")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula.")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula.")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número.")
    .regex(/[^A-Za-z0-9]/, "A senha deve conter pelo menos um caractere especial.")
    .optional(),
  deletedAt: z.coerce.date('O campo "deletedAt" deve ser uma data.').nullish(),
}).strict();

export const userWithPasswordSchema = z.object({
  id: z.number(),
  name: z.string(),
  deletedAt: z.coerce.date().nullable(),
  passwordHash: z.string(),
})

export const userPayloadSchema = z.object({
  sub: z.number(),
  name: z.string(),
})

export type UserResponse = z.infer<typeof userResponseSchema>;
export type UserWithPassword = z.infer<typeof userWithPasswordSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type UpdateUserDTO = z.infer<typeof updateUserSchema>;
export type UserPayload = z.infer<typeof userPayloadSchema>;