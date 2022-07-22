import bcrypt from 'bcrypt'
import { Hasher } from '../../../../data/protocols/security/criptography/hasher'
import { HashComparer } from '../../../../data/protocols/security/criptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}
  async hash (value: string): Promise<string> {
    const hashedPassword = await bcrypt.hash(value, this.salt)
    return await Promise.resolve(hashedPassword)
  }

  async compare (value: string, hash: string): Promise<boolean> {
    const isValid = await bcrypt.compare(value, hash)
    return await Promise.resolve(isValid)
  }
}
