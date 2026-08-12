import { type Request, type Response } from "express";
import { MessagesService } from "../../services";

export const Delete = async (req: Request, res: Response) => {
  const { id }  = req.params;

  try {
    await MessagesService.Delete(Number(id));

    res.status(200).json({ message: "Mensagem deletada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao deletar mensagem." });
  }
}