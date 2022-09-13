import { JwtAdapter } from './jwt-adapter'
import jwt from 'jsonwebtoken'

interface SutTypes {
  sut: JwtAdapter
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
  },
  async verify (): Promise<string> {
    return await new Promise(resolve => resolve('any_value'))
  }
}))

describe('Jwt Adapter', () => {
  describe('sign()', () => {
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

    test('Should throw if jwt.sign throws', async () => {
      const { sut } = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error()
      })
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })
  })

  describe('verify()', () => {
    test('Should call jwt.verify with correct values', async () => {
      const { sut, secret } = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenCalledWith('any_token', secret)
    })
  })
})
