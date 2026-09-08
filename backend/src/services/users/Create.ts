import { UsersRepository } from "../../repositories";
import { CreateUserDTO } from "../../types/user";
import { argon2Sync, randomBytes } from 'node:crypto';

export async function Create(data: CreateUserDTO) {
  if (Object.keys(data).length === 0) {
    throw new Error("Nenhum campo informado.");
  }

  const user = await UsersRepository.GetByEmail(data.email);

  if (user && !user.deletedAt) {
    throw new Error("Já existe um usuário ativo com esse email.");
  }

  data.passwordHash = argon2Sync('argon2id', {
    message: Buffer.from(data.passwordHash),
    nonce: randomBytes(16),
    parallelism: 4,     
    tagLength: 32,      
    memory: 65536,  
    passes: 3,
  }).toString('hex')

  await UsersRepository.Create(data);
}