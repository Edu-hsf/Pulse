import { Router } from 'express';
import { ConversationParticipantsController, ConversationsController } from '../controllers';
import { conversationParticipantsRouter } from './conversationParticipants.routes';

const conversationsRouter = Router();

conversationsRouter.post('/', ConversationsController.Create);

conversationsRouter.post('/join/:groupLink', ConversationParticipantsController.JoinGroup);

conversationsRouter.patch('/:id', ConversationsController.Update);

conversationsRouter.get('/user/:userId', ConversationsController.GetAllByUserID);

conversationsRouter.use('/:conversationId/participants', conversationParticipantsRouter);

export { conversationsRouter };
