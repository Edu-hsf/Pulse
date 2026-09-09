import z from "zod";

export const messageAttachmentSchema = z.object({
    id: z.number(),
    messageId: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})

export const createMessageAttachmentSchema = z.object({
    messageId: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})

export const messageAttachmentResponseSchema = messageAttachmentSchema;

export type MessageAttachment = z.infer<typeof messageAttachmentSchema>;
export type MessageAttachmentResponse = z.infer<typeof messageAttachmentResponseSchema>;
export type CreateMessageAttachment = z.infer<typeof createMessageAttachmentSchema>;