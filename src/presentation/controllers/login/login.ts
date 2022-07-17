import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {}

  async handle (request: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (!request.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
    const { email } = request.body

    this.emailValidator.isValid(email)
  }
}
