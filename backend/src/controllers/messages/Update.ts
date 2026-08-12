import { type Request, type Response } from "express";
import { UpdateMessageDTO } from "../../types/messages";
import { MessagesService } from "../../services";

export const Update = async (req: Request, res: Response) => {
  const data = req.body as UpdateMessageDTO;
  const { id } = req.params;

  try {
    await MessagesService.update(Number(id), data)

    res.status(200).json({ message: "Mensagem alterada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao alterar mensagem." });
  }
}