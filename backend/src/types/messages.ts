import { z } from "zod";

export const messagesSchema = z.object({
    userId: z.number(),
    conversationId: z.number(),
    content: z.string().min(1).max(4000),
    createdAt: z.coerce.date(),
    deletedAt: z.coerce.date(),
});

export const createMessagesSchema = z.object({
  userId: z.number(),
  conversationId: z.number(),
  content: z.string(),
});

export const updateMessagesSchema = z.object({
  content: z.string(),
  deletedAt: z.coerce.date(),
});

export type Message = z.infer<typeof messagesSchema>;
export type CreateMessageDTO = z.infer<typeof createMessagesSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessagesSchema>;