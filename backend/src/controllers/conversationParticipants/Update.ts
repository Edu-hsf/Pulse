import { type Request, type Response } from "express";
import { UpdateConversationParticipantDTO } from "../../types/conversationParticipant";
import { ConversationParticipantsService } from "../../services";

export const Update = async (req: Request<{ id: number }, {}, UpdateConversationParticipantDTO>, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await ConversationParticipantsService.update(Number(id), data)

    res.status(200).json({ message: "Participante alterado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao alterar participante." });
  }
}