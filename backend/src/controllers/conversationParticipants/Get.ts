import { type Request, type Response } from 'express';
import { ConversationParticipantsService } from '../../services';

export const GetAllByConversationID = async (req: Request<{ conversationId: number }>, res: Response) => {
    const { conversationId } = req.params;

    try {
        const participants = await ConversationParticipantsService.GetAllByConversationID(
            Number(req.user?.sub),
            conversationId,
        );

        res.status(200).json(participants);
    } catch (error) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
        res.status(500).json({ error: 'Erro ao consultar participantes.' });
    }
};