import { type Request, type Response } from "express";
import { UsersService } from "../../services";

export const GetByID = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await UsersService.GetByID(Number(id));

    res.status(200).json(user);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar usuário." });
  }
}