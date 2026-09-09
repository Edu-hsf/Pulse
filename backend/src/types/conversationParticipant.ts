import z from "zod";

export const conversationParticipantSchema = z.object({
    id: z.number(),
    userId: z.number(),
    conversationId: z.number(),
    joinedAt: z.coerce.date(),
    addBy: z.number().optional(),
    leftAt: z.coerce.date().optional(),
    removedBy: z.number().optional(),
    lastReadMessageId: z.number().optional(),
})

export const createConversationParticipantSchema = z.object({
    id: z.number(),
    userId: z.number(),
    conversationId: z.number(),
    addBy: z.number().optional(),
})

export const updateConversationParticipantSchema = z.object({
    leftAt: z.coerce.date().optional(),
    removedBy: z.number().optional(),
    lastReadMessageId: z.number().optional(),
})

export const conversationParticipantResponseSchema = conversationParticipantSchema;

export type ConversationParticipant = z.infer<typeof conversationParticipantSchema>;
export type ConversationParticipantResponse = z.infer<typeof conversationParticipantResponseSchema>;
export type CreateConversationParticipantDTO = z.infer<typeof createConversationParticipantSchema>;
export type UpdateConversationParticipantDTO = z.infer<typeof updateConversationParticipantSchema>;