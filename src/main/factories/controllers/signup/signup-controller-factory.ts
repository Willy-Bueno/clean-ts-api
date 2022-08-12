import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication'
import { makeDbAddAccount } from '@/main/factories/usecases/add-account/db-add-account'
import { SignUpController } from '@/presentation/controllers/signup/signup-controller'
import { makeSignUpValidation } from './signup-validation-factory'
import { Controller } from '@/presentation/protocols'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication()))
}
