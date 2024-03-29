import { makeDbLoadAccountByToken } from '../usecases/load-account-by-token/db-load-account-by-token'
import { AuthMiddleware } from '@/presentation/middlewares/auth-middleware'
import { Middleware } from '@/presentation/protocols'

export const makeAuthMiddleware = (role?: string): Middleware => {
  const dbLoadAccountByToken = makeDbLoadAccountByToken()
  return new AuthMiddleware(dbLoadAccountByToken, role)
}
