import { Decrypter } from '@/data/protocols/security/criptography/decripter'
import { AccountModel } from '@/domain/models/account'
import { LoadAccountByToken } from '@/domain/usecases/add-account/add-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    await this.decrypter.decrypt(accessToken)
    return await new Promise(resolve => resolve(null))
  }
}
