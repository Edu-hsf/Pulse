import { type Request, type Response } from "express";
import pool from "../../config/database";
import { UsersService } from "../../services";

export const GetByID = async (req: Request, res: Response) => {
  try {
    const user = await UsersService.GetByID;

    res.status(200).json(user);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao consultar usuário." });
  }
}

export const GetAll = async (req: Request, res: Response) => {
  try {
    const users = await UsersService.GetAll;

    res.status(200).json(users);
  } catch (error) {
    console.error(`[${req.method} ${req.originalUrl}]`, error);
    res.status(500).json({ error: "Erro ao listar usuários." });
  }
}