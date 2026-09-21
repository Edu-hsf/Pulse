import { Router } from "express";
import { UsersController } from '../controllers'

const authRouter = Router();

authRouter.post("/", UsersController.Create);

authRouter.patch("/:id", UsersController.Update);

authRouter.delete('/:id', UsersController.Delete)

authRouter.get('/:id', UsersController.GetByID)

export { authRouter };