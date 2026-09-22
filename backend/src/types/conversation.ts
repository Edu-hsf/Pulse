import { z } from "zod";
import { messageResponseSchema } from "./message";

export const conversationPrivateSettingsSchema = z.object({
  messages: z.object({
    disappearingMessagesEnabled: z.boolean(),
    disappearingMessagesDuration: z.number().nullable(),
  })
})

export const conversationPublicSettingsSchema = z.object({
  permissions: z.object({
    whoCanSendMessages: z.enum(['everyone', 'admins']),
    whoCanAddMembers: z.enum(['everyone', 'admins']),
    whoCanEditGroupConfig: z.enum(['everyone', 'admins']),
    whoCanPinMessages: z.enum(['everyone', 'admins']),
  }),
  messages: z.object({
    disappearingMessagesEnabled: z.boolean(),
    disappearingMessagesDuration: z.number().nullable(),
  })
})

export const conversationPrivateResponseSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number(),
    settings: conversationPrivateSettingsSchema,
    unreadMessages: z.number(),
    lastMessage: messageResponseSchema.optional(),
});

export const conversationGroupResponseSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number(),
    unreadMessages: z.number(),
    lastMessage: messageResponseSchema.optional(),
    name: z.string(),
    description: z.string().optional(),
    avatar: z.string().optional(),
    settings: conversationPublicSettingsSchema,
});

export const conversationResponseSchema = z.union([
  conversationPrivateResponseSchema,
  conversationGroupResponseSchema,
]);

export const createConversationPrivateSchema = z.object({
  createdBy: z.number(),
  participantUserId: z.number(),
});

export const createConversationGroupSchema = z.object({
  createdBy: z.number(),
  participantsUserId: z.array(z.number()).min(1),
  name: z.string(),
  description: z.string().optional(),
  avatar: z.string().optional(),
});

export const createConversationSchema = z.union([
  createConversationPrivateSchema,
  createConversationGroupSchema,
]);

export const updateConversationPrivateSchema = z.object({
  settings: z.object({
    messages: z.object({
      disappearingMessagesEnabled: z.boolean().default(false),
      disappearingMessagesDuration: z.number().nullable().default(null),
    })
  }),
});

export const updateConversationGroupSchema = z.object({
  name: z.string().optional(),
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
    }),
  }).optional(),
});

export const updateConversationSchema = z.union([
  updateConversationPrivateSchema,
  updateConversationGroupSchema,
])

export type ConversationPrivateResponse = z.infer<typeof conversationPrivateResponseSchema>;
export type ConversationGroupResponse = z.infer<typeof conversationGroupResponseSchema>;
export type ConversationResponse = z.infer<typeof conversationResponseSchema>;
export type UpdateConversationDTO = z.infer<typeof updateConversationSchema>;
export type CreateConversationDTO = z.infer<typeof createConversationSchema>;
export type ConversationPrivateSettings = z.infer<typeof conversationPrivateSettingsSchema>;
export type ConversationPublicSettings = z.infer<typeof conversationPublicSettingsSchema>;