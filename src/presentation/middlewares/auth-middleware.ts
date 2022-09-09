import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden } from '../helpers'
import { LoadAccountByToken } from '@/domain/usecases/add-account/add-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.loadAccountByToken.load(httpRequest.headers['x-access-token'])
    return forbidden(new AccessDeniedError())
  }
}
