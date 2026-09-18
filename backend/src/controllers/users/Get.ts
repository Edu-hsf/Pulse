import { type Request, type Response } from "express";
import { UsersService } from "../../services";

export const GetByEmailAndPassword = async (req: Request<{ email: string, password: string }>, res: Response) => {
  const { email, password } = req.params;

  try {
    const user = await UsersService.GetByEmailAndPassword(email, password);

    res.status(200).json(user);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
}