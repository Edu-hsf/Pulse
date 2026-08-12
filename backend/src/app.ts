import express, { type Express } from "express";
import { 
    conversationsRouter, 
    messagesRouter, 
    usersRouter,
} from "./routes";

const app: Express = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/conversations", conversationsRouter);
app.use("/messages", messagesRouter);

export default app;
