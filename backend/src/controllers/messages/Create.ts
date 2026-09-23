import { type Request, type Response } from "express";
import { CreateMessageDTO, createMessageSchema } from "../../types/message";
import { MessagesService } from "../../services";
import { ZodError } from "zod";

export const Create = async (req: Request<{}, {}, CreateMessageDTO>, res: Response) => {
  try {
    const data = createMessageSchema.parse(req.body);

    await MessagesService.Create(Number(req.user?.sub), data);

    res.status(201).json({ message: "Mensagem criada com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);

    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Dados inválidos.",
        details: error.issues,
      });
    }

    res.status(500).json({ error: "Erro ao criar mensagem." });
  }
}