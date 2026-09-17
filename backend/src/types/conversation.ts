import { z } from "zod";
import { messageResponseSchema } from "./message";

export const conversationPrivateResponseSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number().optional(),
    deletedAt: z.coerce.date(),
    settings: z.object({
      messages: z.object({
        disappearingMessagesEnabled: z.boolean().default(false),
        disappearingMessagesDuration: z.number().nullable().default(null),
      })
    }),
    unreadMessages: z.number().default(0),
    lastMessage: messageResponseSchema.optional(),
});

export const conversationGroupResponseSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number().optional(),
    deletedAt: z.coerce.date(),
    lastMessage: messageResponseSchema.optional(),
    name: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional(),
    settings: z.object({
      permissions: z.object({
        whoCanSendMessages: z.enum(['everyone', 'admins']).default('everyone'),
        whoCanAddMembers: z.enum(['everyone', 'admins']).default('everyone'),
        whoCanEditGroupConfig: z.enum(['everyone', 'admins']).default('everyone'),
        whoCanPinMessages: z.enum(['everyone', 'admins']).default('everyone'),
      }),
      messages: z.object({
        disappearingMessagesEnabled: z.boolean().default(false),
        disappearingMessagesDuration: z.number().nullable().default(null),
      })
    }),
});

export const conversationResponseSchema = z.union([
    conversationPrivateResponseSchema,
    conversationGroupResponseSchema,
  ]);

export const updateConversationSchema = z.object({
  deletedAt: z.coerce.date(),
});

export type ConversationPrivateResponse = z.infer<typeof conversationPrivateResponseSchema>;
export type ConversationGroupResponse = z.infer<typeof conversationGroupResponseSchema>;
export type ConversationResponse = z.infer<typeof conversationResponseSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;