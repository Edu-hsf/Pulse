import { z } from "zod";
import { conversationParticipantResponseSchema } from "./conversationParticipant";
import { messageAttachmentResponseSchema } from "./messageAttachment";

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
  participant: conversationParticipantResponseSchema,
  conversationId: z.number(),
  content: z.string().min(1).max(4000).optional(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
  attachment: messageAttachmentResponseSchema.optional(),
})

export type Message = z.infer<typeof messageSchema>;
export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessageSchema>;