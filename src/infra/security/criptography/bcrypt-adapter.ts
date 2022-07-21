import bcrypt from 'bcrypt'
import { Encrypter } from '@/data/protocols/security/criptography/encrypter'

export class BcryptAdapter implements Encrypter {
  constructor (private readonly salt: number) {}
  async encrypt (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt)
    return await Promise.resolve(hashedPassword)
  }
}
