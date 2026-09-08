import z from "zod";

export const messageAttachment = z.object({
    id: z.number(),
    messageId: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})