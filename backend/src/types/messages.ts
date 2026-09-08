import { z } from "zod";

export const messagesSchema = z.object({
    id: z.number(),
    participantId: z.number(),
    conversationId: z.number(),
    content: z.string().min(1).max(4000).nullable(),
    createdAt: z.coerce.date(),
    deletedAt: z.coerce.date().nullable(),
});

export const createMessagesSchema = z.object({
  participantId: z.number(),
  conversationId: z.number(),
  content: z.string().nullable(),
});

export const updateMessagesSchema = z.object({
  content: z.string().nullable(),
  deletedAt: z.coerce.date().nullable(),
});

export type Message = z.infer<typeof messagesSchema>;
export type CreateMessageDTO = z.infer<typeof createMessagesSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessagesSchema>;