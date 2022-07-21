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
  },
  async compare (): Promise<boolean> {
    return await Promise.resolve(true)
  }
}))

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt.hash with correct value', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a valid hash on bcrypt.hash success', async () => {
    const { sut } = makeSut()
    const response = await sut.hash('any_value')
    expect(response).toBe('any_hash')
  })

  test('Should throws if bcrypt.hash throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })

  test('Should call bcrypt.compare with correct value', async () => {
    const { sut } = makeSut()
    const compareSpy = jest.spyOn(bcrypt, 'compare')
    await sut.compare('any_value', 'any_hash')
    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash')
  })

  test('Should return true when bcrypt.compare succeeds', async () => {
    const { sut } = makeSut()
    const response = await sut.compare('any_value', 'any_hash')
    expect(response).toBe(true)
  })

  test('Should return false when bcrypt.compare returns false', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
    const response = await sut.compare('any_value', 'any_hash')
    expect(response).toBe(false)
  })

  test('Should throws if bcrypt.compare throws', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.compare('any_value', 'any_hash')
    await expect(promise).rejects.toThrow()
  })
})
