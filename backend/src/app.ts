import express, { type Express } from "express";
import { 
    conversationsRouter, 
    authRouter, 
    messagesRouter, 
    usersRouter,
} from "./routes";
import { Autenticate } from "./middlewares/autenticate";

const app: Express = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", Autenticate, usersRouter);
app.use("/conversations", Autenticate, conversationsRouter);
app.use("/messages", Autenticate, messagesRouter);

export default app;
