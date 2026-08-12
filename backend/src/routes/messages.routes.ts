import { Router } from "express";
import { MessagesController } from '../controllers'

const messagesRouter = Router();

messagesRouter.post("/", MessagesController.Create);

messagesRouter.patch("/:id", MessagesController.Update);

messagesRouter.delete('/:id', MessagesController.Delete)

messagesRouter.get('/:id', MessagesController.GetByID)
messagesRouter.get('/conversation/:conversationId', MessagesController.GetAllByConversationID)

export { messagesRouter }; 