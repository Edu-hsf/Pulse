import { type Request, type Response } from "express";
import { UpdateUserDTO } from "../../types/user";
import { UsersService } from "../../services";

export const Update = async (req: Request, res: Response) => {
  const data = req.body as UpdateUserDTO;
  const { id } = req.params;

  try {
    await UsersService.update(Number(id), data)

    res.status(200).json({ message: "Usuário alterado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao alterar usuário." });
  }
}