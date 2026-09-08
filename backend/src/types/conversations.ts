import { z } from "zod";

export const conversationSchema = z.object({
    id: z.number(),
    participantAdminID: z.number().nullable(),
    createdAt: z.coerce.date(),
    createdBy: z.number().nullable(),
});

export const updateConversationSchema = z.object({
  participantAdminId: z.number(),
});

export type Conversation = z.infer<typeof conversationSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;