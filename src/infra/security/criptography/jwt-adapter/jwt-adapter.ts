import jwt from 'jsonwebtoken'
import { Encrypter } from '../../../../data/usecases/authentication/db-authentication-protocols'

export class JwtAdapter implements Encrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const hash = jwt.sign({ id: value }, this.secret)
    return await Promise.resolve(hash)
  }
}
