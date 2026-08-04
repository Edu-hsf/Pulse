import { type Request, type Response } from "express";
import { UsersService } from "../../services";

export const Delete = async (req: Request, res: Response) => {
  const { id }  = req.params;

  try {
    await UsersService.DeleteUser(Number(id));

    res.status(200).json({ message: "Usuário deletado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao deletar usuário." });
  }
}