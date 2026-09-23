import { z } from "zod";
import { messageResponseSchema } from "./message";

export const conversationPrivateSettingsSchema = z.object({
  messages: z.object({
    disappearingMessagesEnabled: z.boolean(),
    disappearingMessagesDuration: z.number().nullable(),
  })
})

export const conversationGroupSettingsSchema = z.object({
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
    lastMessage: messageResponseSchema.nullable(),
});

export const conversationGroupResponseSchema = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    createdBy: z.number(),
    unreadMessages: z.number(),
    lastMessage: messageResponseSchema.nullable(),
    name: z.string(),
    description: z.string().nullable(),
    avatar: z.url().nullable(),
    settings: conversationGroupSettingsSchema,
});

export const conversationResponseSchema = z.union([
  conversationPrivateResponseSchema,
  conversationGroupResponseSchema,
]);

export const createConversationPrivateSchema = z.object({
  createdBy: z.number('O campo "createdBy" deve ser um número.').positive('O campo "createdBy" deve ser maior que 0'),
  participantUserId: z.number('O campo "participantUserId" deve ser um número.').positive('O campo "participantUserIds" deve ser maior que 0'),
}).strict();

export const createConversationGroupSchema = z.object({
  createdBy: z.number('O campo "createdBy" deve ser um número.').positive('O campo "createdBy" deve ser maior que 0'),
  participantUserIds: z.array(z.number('O campo "participantUserIds" deve ser um número.').positive('O campo "participantUserIds" deve ser maior que 0')).min(1, 'Deve haver no mínimo 1 participante na conversa.'),
  name: z.string('O campo "name" deve ser uma string.').trim().min(2, 'O campo "name" deve ter no mínimo 2 caracteres.'),
  description: z.string('O campo "description" deve ser uma string.').trim().min(2, 'O campo "description" deve ter no mínimo 1 caracter.').nullable(),
  avatar: z.url('O campo "URL" deve ser um URL válido.').nullable(),
}).strict();

export const createConversationSchema = z.union([
  createConversationPrivateSchema,
  createConversationGroupSchema,
]);

export const updateConversationPrivateSchema = z.object({
  settings: z.object({
    messages: z.object({
      disappearingMessagesEnabled: z.boolean('O campo "disappearingMessagesEnabled" do objeto "messages" deve ser um boolean.'),
      disappearingMessagesDuration: z.number('O campo "disappearingMessagesDuration" deve ser um número.').nullable(),
    })
  }),
}).strict();

export const updateConversationGroupSchema = z.object({
  name: z.string('O campo "name" deve ser uma string.').trim().min(2, 'O campo "name" deve ter no mínimo 2 caracteres.').optional(),
  description: z.string('O campo "description" deve ser uma string.').trim().min(2, 'O campo "description" deve ter no mínimo 1 caracter.').nullish(),
  avatar: z.url('O campo "URL" deve ser um URL válido.').nullish(),
  settings: z.object({
    permissions: z.object({
      whoCanSendMessages: z.enum(['everyone', 'admins'], 'O campo "whoCanSendMessages" do objeto "permissions" deve ser uma string do tipo "everyone" ou "admins".'),
      whoCanAddMembers: z.enum(['everyone', 'admins'], 'O campo "whoCanAddMembers" do objeto "permissions" deve ser uma string do tipo "everyone" ou "admins".'),
      whoCanEditGroupConfig: z.enum(['everyone', 'admins'], 'O campo "whoCanEditGroupConfig" do objeto "permissions" deve ser uma string do tipo "everyone" ou "admins".'),
      whoCanPinMessages: z.enum(['everyone', 'admins'], 'O campo "whoCanPinMessages" do objeto "permissions" deve ser uma string do tipo "everyone" ou "admins".'),
    }),
    messages: z.object({
      disappearingMessagesEnabled: z.boolean('O campo "disappearingMessagesEnabled" do objeto "messages" deve ser um boolean.'),
      disappearingMessagesDuration: z.number('O campo "disappearingMessagesDuration" do objeto "messages" deve ser um número.').nullable(),
    }),
  }).optional(),
}).strict();

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
export type ConversationGroupSettings = z.infer<typeof conversationGroupSettingsSchema>;