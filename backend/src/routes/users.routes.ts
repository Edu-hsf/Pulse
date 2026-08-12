import { Router } from "express";
import { UsersController } from '../controllers'

const usersRouter = Router();

usersRouter.post("/", UsersController.Create);

usersRouter.patch("/:id", UsersController.Update);

usersRouter.delete('/:id', UsersController.Delete)

usersRouter.get('/:id', UsersController.GetByID)

export default usersRouter;
