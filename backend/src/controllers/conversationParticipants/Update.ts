import { type Request, type Response } from 'express';
import { UpdateConversationParticipantDTO } from '../../types/conversationParticipant';
import { ConversationParticipantsService } from '../../services';

export const Update = async (req: Request<{ conversationId: number; participantId: number }, object, UpdateConversationParticipantDTO>, res: Response) => {
    const { conversationId, participantId } = req.params;
    const data = req.body;

    try {
        await ConversationParticipantsService.update(
            Number(req.user?.sub),
            conversationId,
            participantId,
            data,
        );

        res.status(200).json({ message: 'Participante alterado com sucesso!' });
    } catch (error) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
        res.status(500).json({ error: 'Erro ao alterar participante.' });
    }
};