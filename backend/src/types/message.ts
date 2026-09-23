import { z } from "zod";
import { conversationParticipantResponseSchema } from "./conversationParticipant";
import { createMessageAttachmentSchema, messageAttachmentResponseSchema } from "./messageAttachment";

export const messageResponseSchema = z.object({
  id: z.number(),
  participant: conversationParticipantResponseSchema,
  content: z.string().nullable(),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable(),
  attachment: messageAttachmentResponseSchema.nullable(),
});

export const createMessageSchema = z.object({
  createdBy: z.number('O campo "createdBy" deve ser um número.').positive('O campo "createdBy" deve ser maior que 0'),
  conversationId: z.number('O campo "conversationId" deve ser um número.').positive('O campo "conversationId" deve ser maior que 0'),
  content: z.string('O campo "content" deve ser uma string.').trim().min(1, 'O conteúdo da mensagem deve ter no mínimo 1 caracter.').max(4096, 'A mensagem deve ter no máximo 4096 caracteres.').optional(),
  attachment: createMessageAttachmentSchema.optional(),
}).strict().refine(data => data.content || data.attachment, { error: 'A mensagem deve ter ao menos um texto ou um anexo.' });

export const updateMessageSchema = z.object({
  content: z.string('O campo "content" deve ser uma string.').trim().min(1, 'O conteúdo da mensagem deve ter no mínimo 1 caracter.').max(4096, 'A mensagem deve ter no máximo 4096 caracteres.').optional(),
  deletedAt: z.coerce.date('O campo "deletedAt" deve ser uma data.').optional(),
}).strict();

export type MessageResponse = z.infer<typeof messageResponseSchema>;
export type CreateMessageDTO = z.infer<typeof createMessageSchema>;
export type UpdateMessageDTO = z.infer<typeof updateMessageSchema>;