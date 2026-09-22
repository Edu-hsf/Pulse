import { type Request, type Response } from "express";
import { CreateConversationParticipantDTO } from "../../types/conversationParticipant";
import { ConversationParticipantsService } from "../../services";

export const Create = async (req: Request<{}, {}, CreateConversationParticipantDTO>, res: Response) => {
  const data  = req.body;

  try {
    await ConversationParticipantsService.Create(data);

    res.status(201).json({ message: "Participante criado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao criar participante." });
  }
}