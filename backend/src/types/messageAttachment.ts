import z from "zod";

export const messageAttachmentResponseSchema = z.object({
    id: z.number(),
    type: z.enum(['image', 'audio', 'video', 'file']),
    url: z.string(),
})

export const createMessageAttachmentSchema = z.object({
    type: z.enum(['image', 'audio', 'video', 'file'], 'Tipo de anexo inválido.'),
    url: z.url('O campo "URL" deve ser um URL válido.').trim().min(1, 'O campo "URL" é obrigatório.').max(2048, 'O tamanho da URL não pode ultrapassar 2048 caracteres.'),
}).strict();

export type MessageAttachmentResponse = z.infer<typeof messageAttachmentResponseSchema>;
export type CreateMessageAttachment = z.infer<typeof createMessageAttachmentSchema>;