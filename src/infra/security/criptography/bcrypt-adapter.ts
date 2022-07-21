import bcrypt from 'bcrypt'
import { Hasher } from '@/data/protocols/security/criptography/hasher'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt)
    return await Promise.resolve(hashedPassword)
  }
}
