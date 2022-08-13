import { makeLogControllerDecorator } from '@/main/factories/decorators/log-controller-decorator-factory'
import { makeLoginValidation } from '@/main/factories/controllers/login/login-validation-factory'
import { makeDbAuthentication } from '@/main/factories/usecases/authentication/db-authentication'
import { LoginController } from '@/presentation/controllers/login/login-controller'
import { Controller } from '@/presentation/protocols'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(new LoginController(makeDbAuthentication(), makeLoginValidation()))
}
