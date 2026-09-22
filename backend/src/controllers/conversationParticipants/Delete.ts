import { type Request, type Response } from "express";
import { ConversationParticipantsService } from "../../services";

export const Delete = async (req: Request<{ id: number }>, res: Response) => {
  const { id }  = req.params;

  try {
    await ConversationParticipantsService.Delete(Number(id));

    res.status(200).json({ message: "Participante deletado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao deletar participante." });
  }
}