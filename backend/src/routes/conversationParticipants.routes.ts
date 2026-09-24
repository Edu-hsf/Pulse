import { Router } from "express";
import { ConversationParticipantsController } from '../controllers'

const conversationParticipantsRouter = Router();

conversationParticipantsRouter.post("/", ConversationParticipantsController.Create);

conversationParticipantsRouter.patch("/:id", ConversationParticipantsController.Update);

conversationParticipantsRouter.get('/conversation/:conversationId', ConversationParticipantsController.GetAllByConversationID)

export { conversationParticipantsRouter };
