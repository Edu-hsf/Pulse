import { type Request, type Response } from "express";
import { CreateMessageDTO } from "../../types/messages";
import { MessagesService } from "../../services";

export const Create = async (req: Request, res: Response) => {
  const data = req.body as CreateMessageDTO;

  try {
    await MessagesService.Create(data);

    res.status(201).json({ message: "Mensagem criada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao criar mensagem." });
  }
}