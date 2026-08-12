import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";
import { CreateConversationDTO } from "../../types/conversations";

export const Create = async (req: Request, res: Response) => {
  const data = req.body as CreateConversationDTO;

  try {
    await ConversationsService.Create(data);

    res.status(201).json({ message: "Conversa criada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao criar conversa." });
  }
}