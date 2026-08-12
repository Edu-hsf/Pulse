import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";
import { UpdateConversationDTO } from "../../types/conversations";

export const Update = async (req: Request, res: Response) => {
  const data = req.body as UpdateConversationDTO;
  const { id } = req.params;

  try {
    await ConversationsService.update(Number(id), data)

    res.status(200).json({ message: "Administrador da conversa alterado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao alterar administrador da conversa." });
  }
}