import { type Request, type Response } from "express";
import { ConversationsService } from "../../services";
import { UpdateConversationDTO } from "../../types/conversation";

export const Update = async (req: Request<{ id: number }, {}, UpdateConversationDTO>, res: Response) => {
  const { id } = req.params;
  const data = req.body;

  try {
    await ConversationsService.update(Number(id), data)

    res.status(200).json({ message: "Administrador da conversa alterado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao alterar administrador da conversa." });
  }
}