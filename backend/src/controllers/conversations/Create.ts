import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";

export const Create = async (req: Request<{}, {}, { userId: number }>, res: Response) => {
  const { userId }  = req.body;

  try {
    await ConversationsService.Create(userId);

    res.status(201).json({ message: "Conversa criada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao criar conversa." });
  }
}