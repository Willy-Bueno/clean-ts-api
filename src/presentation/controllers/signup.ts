import { HttpResponse, HttpRequest } from '@/presentation/protocols'
import { MissingParamError } from '@/presentation/errors'
import { badRequest } from '@/presentation/helpers'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }
  }
}
