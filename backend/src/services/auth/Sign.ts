import { UsersRepository } from "../../repositories";
import argon2 from "argon2";

export async function SignWithEmailAndPassword(email: string, password: string) {
  const user = await UsersRepository.GetByEmail(email)

  if (
    !user 
    || user.deletedAt
    || !await argon2.verify(user.passwordHash, password)
  ) {
    throw new Error('Email ou senha inválidos.')
  }

  return user;
}