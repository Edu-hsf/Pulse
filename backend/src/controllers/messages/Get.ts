import { type Request, type Response } from "express";
import { MessagesService } from "../../services";

interface GetMessagesByConversationIDParams {
  conversationId: number,
  limit: number,
  cursor?: number,
}

export const GetMessagesByConversationID = async (req: Request<GetMessagesByConversationIDParams>, res: Response) => {
  const { conversationId, limit, cursor } = req.params

  try {
    const messages = await MessagesService.GetMessagesByConversationID(Number(conversationId), limit, cursor);

    res.status(200).json(messages);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar mensagens." });
  }
}