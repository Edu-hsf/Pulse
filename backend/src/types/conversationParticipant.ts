import z from "zod";
import { userResponseSchema } from "./user";

export const conversationParticipantResponseSchema = z.object({
    id: z.number(),
    user: userResponseSchema,
    joinedAt: z.coerce.date(),
    leftAt: z.coerce.date().nullable(),
    addBy: z.number().nullable(),
    removedBy: z.number().nullable(),
    role: z.enum(['admin', 'super_admin', 'member']).default('member'),
});

export const createConversationParticipantSchema = z.object({
    userId: z.number('O campo "userId" deve ser um número.').positive('O campo "userId" deve ser maior que 0'),
    conversationId: z.number('O campo "conversationId" deve ser um número.').positive('O campo "conversationId" deve ser maior que 0'),
    addBy: z.number('O campo "addBy" deve ser um número.').positive('O campo "addBy" deve ser maior que 0').optional(),
}).strict();

export const updateConversationParticipantSchema = z.object({
    leftAt: z.coerce.date('O campo "leftAt" deve ser uma data.').nullish(),
    removedBy: z.number('O campo "removedBy" deve ser um número.').positive('O campo "removedBy" deve ser maior que 0').nullish(),
    lastReadMessageId: z.number('O campo "lastReadMessageId" deve ser um número.').positive('O campo "lastReadMessageId" deve ser maior que 0').optional(),
    role: z.enum(['admin', 'super_admin', 'member'], 'O campo "role" deve ser uma string do tipo "admin", "super_admin" ou "member".').optional(),
}).strict();

export type ConversationParticipantResponse = z.infer<typeof conversationParticipantResponseSchema>;
export type CreateConversationParticipantDTO = z.infer<typeof createConversationParticipantSchema>;
export type UpdateConversationParticipantDTO = z.infer<typeof updateConversationParticipantSchema>;