import { HttpRequest, HttpResponse, Middleware } from '../protocols'
import { AccessDeniedError } from '../errors'
import { forbidden, ok, serverError } from '../helpers'
import { LoadAccountByToken } from '@/domain/usecases/add-account/add-account-by-token'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = httpRequest.headers?.['x-access-token']
      if (accessToken) {
        const account = await this.loadAccountByToken.load(accessToken)
        if (account) {
          return ok({ accountId: account.id })
        }
      }
      return forbidden(new AccessDeniedError())
    } catch (error) {
      return serverError(error)
    }
  }
}
