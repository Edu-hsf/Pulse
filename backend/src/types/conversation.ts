import { z } from "zod";
import { messageResponseSchema } from "./message";

export const conversationSchema = z.object({
    id: z.number(),
    participantAdminID: z.number().optional(),
    createdAt: z.coerce.date(),
    createdBy: z.number().optional(),
    avatar: z.string().optional(),
});

export const updateConversationSchema = z.object({
  participantAdminId: z.number(),
});

export const conversationResponse = conversationSchema.extend({
  lastMessage: messageResponseSchema.optional()
})

export type Conversation = z.infer<typeof conversationSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;