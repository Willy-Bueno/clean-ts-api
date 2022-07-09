import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

interface SutTypes {
  sut: BcryptAdapter
  salt: number
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    sut,
    salt
  }
}

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('any_hash')
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct value', () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const response = await sut.encrypt('any_value')
    expect(response).toBe('any_hash')
  })
})
