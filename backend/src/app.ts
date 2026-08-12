import express, { type Express } from "express";
import usersRouter from "./routes/users.routes";
import conversationsRouter from "./routes/conversations.routes";
import messagesRouter from "./routes/messages.routes";

const app: Express = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/conversations', conversationsRouter);
app.use('/messages', messagesRouter);

export default app;