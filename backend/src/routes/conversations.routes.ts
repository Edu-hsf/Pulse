import { Router } from "express";
import { ConversationsController } from '../controllers'

const conversationsRouter = Router();

conversationsRouter.post("/", ConversationsController.Create);

conversationsRouter.patch("/:id", ConversationsController.Update);

conversationsRouter.delete('/:id', ConversationsController.Delete)

conversationsRouter.get('/:id', ConversationsController.GetByID)
conversationsRouter.get('/user/:userId', ConversationsController.GetAllByUserID)

export default conversationsRouter;
