import { type Request, type Response } from "express";
import pool from "../../config/database";
import { UsersService } from "../../services";
import { CreateUserDTO } from "../../types/user";

export const Create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDTO;

  try {
    await UsersService.Create(data);

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao cadastrar usuário." });
  }
}