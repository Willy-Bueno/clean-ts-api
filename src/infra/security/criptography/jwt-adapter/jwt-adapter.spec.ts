import jwt from 'jsonwebtoken'
import { Encrypter } from '@/data/usecases/authentication/db-authentication-protocols'
import { JwtAdapter } from './jwt-adapter'

interface SutTypes {
  sut: Encrypter
  secret: string
}

const makeSut = (): SutTypes => {
  const secret = 'any_md5'
  const sut = new JwtAdapter(secret)
  return {
    sut,
    secret
  }
}

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await new Promise(resolve => resolve('any_token'))
  }
}))

describe('Jwt Adapter', () => {
  test('Should call jwt.sign with correct values', async () => {
    const { sut, secret } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret)
  })

  test('Should return an token on success', async () => {
    const { sut } = makeSut()
    const result = await sut.encrypt('any_id')
    expect(result).toBe('any_token')
  })
})
