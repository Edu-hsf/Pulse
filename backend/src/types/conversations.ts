import { z } from "zod";

export const conversationSchema = z.object({
    userAdminID: z.number(),
    createdBy: z.number(),
    createdAt: z.coerce.date(),
});

export const createConversationSchema = z.object({
  userAdminId: z.number(),
});

export const updateConversationSchema = z.object({
  userAdminId: z.number(),
});

export type Conversation = z.infer<typeof conversationSchema>;
export type CreateConversationDTO = z.infer<typeof createConversationSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;