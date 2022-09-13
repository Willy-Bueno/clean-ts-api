import { Decrypter } from '@/data/protocols/security/criptography/decripter'
import { Encrypter } from '@/data/usecases/authentication/db-authentication-protocols'
import jwt from 'jsonwebtoken'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const hash = jwt.sign({ id: value }, this.secret)
    return await Promise.resolve(hash)
  }

  async decrypt (token: string): Promise<string> {
    const value: any = jwt.verify(token, this.secret)
    return await Promise.resolve(value)
  }
}
