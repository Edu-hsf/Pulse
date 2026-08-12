import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";

export const Delete = async (req: Request, res: Response) => {
  const { id }  = req.params;

  try {
    await ConversationsService.Delete(Number(id));

    res.status(200).json({ message: "Conversa deletada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao deletar conversa." });
  }
}