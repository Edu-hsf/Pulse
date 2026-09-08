import { z } from "zod";
import { conversationParticipantSchema } from "./conversationParticipant";
import { messageAttachment } from "./messageAttachment";

export const messageSchema = z.object({
    id: z.number(),
    participantId: z.number(),
    conversationId: z.number(),
    content: z.string().min(1).max(4000).optional(),
    createdAt: z.coerce.date(),
    deletedAt: z.coerce.date().optional(),
});

export const createMessageSchema = z.object({
  participantId: z.number(),
  conversationId: z.number(),
  content: z.string().optional(),
});

export const updateMessageSchema = z.object({
  content: z.string().optional(),
  deletedAt: z.coerce.date().optional(),
});

export const messageResponseSchema = z.object({
  id: z.number(),
  participant: conversationParticipantSchema,
  conversationId: z.number(),
  content: z.string().min(1).max(4000).optional(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
  attachment: messageAttachment.optional(),
})

export type Message = z.infer<typeof messageSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessageSchema>;