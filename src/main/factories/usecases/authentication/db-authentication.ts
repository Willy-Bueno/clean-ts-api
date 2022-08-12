import { AccountMongoRepository } from '@/infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '@/infra/security/criptography/bcrypt-adapter/bcrypt-adapter'
import { DbAuthentication } from '@/data/usecases/authentication/db-authentication'
import { JwtAdapter } from '@/infra/security/criptography/jwt-adapter/jwt-adapter'
import env from '@/main/config/env'

export const makeDbAuthentication = (): DbAuthentication => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountByEmailRepository = new AccountMongoRepository()
  return new DbAuthentication(accountByEmailRepository, bcryptAdapter, jwtAdapter, accountByEmailRepository)
}
