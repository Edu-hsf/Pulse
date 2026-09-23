import { type Request, type Response, type NextFunction } from "express";
import jwt from 'jsonwebtoken';
import 'dotenv/config'
import { userPayloadSchema } from "../types/user";

export const Autenticate = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.split(' ')[1];

    if (!token) {
        res.status(401).json({ error: 'Acesso negado. Token não fornecido.'});
        return;
    }

    const secretKey = process.env.TOKEN_SECRET_KEY;

    if (!secretKey) {
        res.status(500).json({ error: 'Acesso negado. Erro interno do servidor.'});
        console.error('Chave JWT não configurada.');
        return;
    }

    try {
        const decoded = jwt.verify(token, secretKey);

        const result = userPayloadSchema.safeParse(decoded);

        if (!result.success) {
            return res.status(401).json({ error: "Token inválido." });
        }

        req.user = result.data;
        next();
    } catch (error) {
        console.error(`[${req.method} ${req.originalUrl}]`, error);
        res.status(401).json({ error: 'Token inválido ou expirado.' });
    }
}