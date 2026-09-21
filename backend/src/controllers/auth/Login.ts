import { type Request, type Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthService } from "../../services";
import 'dotenv/config'

export const LoginWithEmailAndPassword = async (req: Request<{ email: string, password: string }>, res: Response) => {
  const { email, password } = req.params;

  try {
    const { sub, name } = await AuthService.LoginWithEmailAndPassword(email, password);
    const secretKey = process.env.TOKEN_SECRET_KEY;

    if (!secretKey) {
      throw new Error('Chave secreta para assinatura do JWT não configurada.')
    }

    const token = jwt.sign({ sub, name }, secretKey, {
      expiresIn: '1d',
      algorithm: "HS256",
    })

    res.status(200).json(token);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao fazer login." });
  }
}