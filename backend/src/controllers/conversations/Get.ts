import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";

export const GetAllByUserID = async (req: Request<{ userId: number }>, res: Response) => {
  const { userId } = req.params;

  try {
    const conversations = await ConversationsService.GetAllByUserID(Number(userId));

    res.status(200).json(conversations);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar conversas." });
  }
}