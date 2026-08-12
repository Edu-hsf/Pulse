import { type Request, type Response } from "express";
import { MessagesService } from "../../services";

export const GetByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const message = await MessagesService.GetByID(Number(id));

    res.status(200).json(message);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar mensagem." });
  }
}

export const GetAllByConversationID = async (req: Request, res: Response) => {
  const { conversationId } = req.params;

  try {
    const messages = await MessagesService.GetAllByConversationID(Number(conversationId));

    res.status(200).json(messages);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar mensagens." });
  }
}