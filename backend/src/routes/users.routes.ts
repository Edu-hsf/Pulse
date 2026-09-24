import { Router } from "express";
import { UsersController } from '../controllers'

const usersRouter = Router();

usersRouter.patch("/:id", UsersController.Update);

usersRouter.get('/:id', UsersController.GetByID)

export { usersRouter };
