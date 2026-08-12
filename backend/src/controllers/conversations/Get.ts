import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";

export const GetByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const conversation = await ConversationsService.GetByID(Number(id));

    res.status(200).json(conversation);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar conversa." });
  }
}

export const GetAllByUserID = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const conversations = await ConversationsService.GetAllByUserID(Number(userId));

    res.status(200).json(conversations);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar conversas." });
  }
}