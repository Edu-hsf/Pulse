import { z } from "zod";
import { messageResponseSchema } from "./message";

export const conversationSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number().optional(),
    deletedAt: z.coerce.date(),
});

export const updateConversationSchema = z.object({
  deletedAt: z.coerce.date(),
});

export const conversationResponseSchema = conversationSchema.extend({
  lastMessage: messageResponseSchema.optional(),
})

export type Conversation = z.infer<typeof conversationSchema>;
export type ConversationResponse = z.infer<typeof conversationResponseSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;