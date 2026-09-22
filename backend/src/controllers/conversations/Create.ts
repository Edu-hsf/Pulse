import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";
import { CreateConversationDTO } from "../../types/conversation";

export const Create = async (req: Request<{}, {}, { data: CreateConversationDTO }>, res: Response) => {
  const { data }  = req.body;

  try {
    await ConversationsService.Create(data);

    res.status(201).json({ message: "Conversa criada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao criar conversa." });
  }
}