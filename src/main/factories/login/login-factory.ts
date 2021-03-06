import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { makeLoginValidation } from '../../factories/login/login-validation-factory'
import { Controller } from '../../../presentation/protocols'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LoginController } from '../../../presentation/controllers/login/login-controller'
import { LogMongoRepository } from '../../../infra/db/mongodb/log/log-repository'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account/account-mongo-repository'
import { BcryptAdapter } from '../../../infra/security/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/security/criptography/jwt-adapter/jwt-adapter'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountByEmailRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountByEmailRepository, bcryptAdapter, jwtAdapter, accountByEmailRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
