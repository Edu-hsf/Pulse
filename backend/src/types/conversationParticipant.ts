import z from "zod";
import { userResponseSchema } from "./user";

export const conversationParticipantResponseSchema = z.object({
    id: z.number(),
    user: userResponseSchema,
    joinedAt: z.coerce.date(),
    leftAt: z.coerce.date().optional(),
    addBy: z.number().optional(),
    removedBy: z.number().optional(),
    role: z.enum(['admin', 'super_admin', 'member']).default('member'),
});

export const createConversationParticipantSchema = z.object({
    userId: z.number(),
    conversationId: z.number(),
    addBy: z.number().optional(),
}).strict();

export const updateConversationParticipantSchema = z.object({
    leftAt: z.coerce.date().optional(),
    removedBy: z.number().optional(),
    lastReadMessageId: z.number().optional(),
    role: z.enum(['admin', 'super_admin', 'member']).optional(),
}).strict();

export type ConversationParticipantResponse = z.infer<typeof conversationParticipantResponseSchema>;
export type CreateConversationParticipantDTO = z.infer<typeof createConversationParticipantSchema>;
export type UpdateConversationParticipantDTO = z.infer<typeof updateConversationParticipantSchema>;