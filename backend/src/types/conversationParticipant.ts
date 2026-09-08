import z from "zod";

export const conversationParticipantSchema = z.object({
    id: z.number(),
    userId: z.number(),
    joinedAt: z.coerce.date(),
    addBy: z.number().optional(),
    leftAt: z.coerce.date().optional(),
    removedBy: z.number().optional(),
    conversationId: z.number(),
    lastReadMessageId: z.number().optional(),
})