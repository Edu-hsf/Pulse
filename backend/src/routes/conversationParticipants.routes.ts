import { Router } from "express";
import { ConversationParticipantsController } from '../controllers'

const conversationParticipantsRouter = Router();

conversationParticipantsRouter.post("/", ConversationParticipantsController.Create);

conversationParticipantsRouter.patch("/:id", ConversationParticipantsController.Update);

conversationParticipantsRouter.delete('/:id', ConversationParticipantsController.Delete)

conversationParticipantsRouter.get('/conversation/:conversationId', ConversationParticipantsController.GetAllByConversationID)

export { conversationParticipantsRouter };
