import { UsersRepository } from "../../repositories";
import argon2 from "argon2";

export async function GetByEmailAndPassword(email: string, password: string) {
  const passwordHash = await argon2.hash(password, {
    type: argon2.argon2id
  })

  const password = await UsersRepository.GetPasswordByEmail(email)

  if (!password) {
    throw new Error('E')
  }

  return user;
}