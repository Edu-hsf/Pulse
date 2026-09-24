import { Router } from "express";
import { MessagesController } from '../controllers'

const messagesRouter = Router();

messagesRouter.post("/", MessagesController.Create);

messagesRouter.patch("/:id", MessagesController.Update);

messagesRouter.get('/conversation/:conversationId', MessagesController.GetMessagesByConversationID)

export { messagesRouter }; 