import { z } from "zod";
import { conversationParticipantResponseSchema } from "./conversationParticipant";
import { createMessageAttachmentSchema, messageAttachmentResponseSchema } from "./messageAttachment";

export const messageResponseSchema = z.object({
  id: z.number(),
  participant: conversationParticipantResponseSchema,
  content: z.string().min(1).max(4000).optional(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().optional(),
  attachment: messageAttachmentResponseSchema.optional(),
});

export const createMessageSchema = z.object({
  createdBy: z.number('O campo "createdAt" deve ser um número.'),
  conversationId: z.number('O campo "conversationId" deve ser um número.'),
  content: z.string('O campo "content" deve ser uma string.').max(4096, 'A mensagem deve ter no máximo 4096 caracteres.').optional(),
  attachment: createMessageAttachmentSchema.optional(),
}).strict();

export const updateMessageSchema = z.object({
  content: z.string('O campo "content" deve ser uma string.').max(4096, 'A mensagem deve ter no máximo 4096 caracteres.').optional(),
  deletedAt: z.coerce.date('O campo "deletedAt" deve ser uma data.').optional(),
}).strict();

export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessageSchema>;