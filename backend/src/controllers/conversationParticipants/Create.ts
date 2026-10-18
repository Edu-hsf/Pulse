import { type Request, type Response } from 'express';
import { CreateConversationParticipantDTO } from '../../types/conversationParticipant';
import { ConversationParticipantsService } from '../../services';

export const AddParticipant = async (req: Request<{ conversationId: number }, object, CreateConversationParticipantDTO>, res: Response) => {
    const { conversationId } = req.params;

    try {
        await ConversationParticipantsService.AddParticipant(
            Number(req.user?.sub),
            conversationId,
            req.body.userId,
        );

        res.status(201).json({ message: 'Participante adicionado com sucesso!' });
    } catch (error) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
        res.status(500).json({ error: 'Erro ao adicionar participante.' });
    }
};

export const JoinGroup = async (req: Request<{ groupLink: string }, object, object>, res: Response) => {
    const { groupLink } = req.params;

    try {
        await ConversationParticipantsService.JoinGroup(Number(req.user?.sub), groupLink);

        res.status(201).json({ message: 'Participante adicionado com sucesso!' });
    } catch (error) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
        res.status(500).json({ error: 'Erro ao adicionar participante.' });
    }
};