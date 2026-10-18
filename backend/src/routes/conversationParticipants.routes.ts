import { Router } from 'express';
import { ConversationParticipantsController } from '../controllers';

const conversationParticipantsRouter = Router({ mergeParams: true });

conversationParticipantsRouter.post('/', ConversationParticipantsController.AddParticipant);

conversationParticipantsRouter.patch('/:participantId', ConversationParticipantsController.Update);
conversationParticipantsRouter.get('/', ConversationParticipantsController.GetAllByConversationID);

export { conversationParticipantsRouter };
