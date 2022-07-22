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

describe('Jwt Adapter', () => {
  test('Should call jwt.sign with correct values', async () => {
    const { sut, secret } = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt('any_id')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, secret)
  })
})
