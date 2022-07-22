import { SignUpController } from '../../../../src/presentation/controllers/signup/signup'
import { DbAddAccount } from '../../../../src/data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../src/infra/security/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountMongoRepository } from '../../../../src/infra/db/mongodb/account-repository/account'
import { Controller } from '../../../../src/presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../../src/infra/db/mongodb/log-repository/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const signUpController = new SignUpController(dbAddAccount, makeSignUpValidation())
  const LogErrorRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, LogErrorRepository)
}
