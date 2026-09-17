import z from "zod";

export const messageAttachmentResponseSchema = z.object({
    id: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})

export const createMessageAttachmentSchema = z.object({
    messageId: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})

export type MessageAttachmentResponse = z.infer<typeof messageAttachmentResponseSchema>;
export type CreateMessageAttachment = z.infer<typeof createMessageAttachmentSchema>;