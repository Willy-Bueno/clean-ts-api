import { AddAccountRepository } from '@/data/protocols/db/add-account-repository'
import { Encrypter } from '@/data/protocols/security/criptography/encrypter'
import { DbAddAccount } from './db-add-account'
import { AccountModel, AddAccountModel } from './db-add-account-protocols'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'valid_password'
})

describe('DbAddAccount Usecase', () => {
  const makeAddAccountRepository = (): AddAccountRepository => {
    class AddAccountRepositoryStub implements AddAccountRepository {
      async add (account: AddAccountModel): Promise<AccountModel> {
        return await Promise.resolve(makeFakeAccount())
      }
    }
    return new AddAccountRepositoryStub()
  }

  const makeEncrypter = (): any => {
    class EncrypterStub implements Encrypter {
      async encrypt (value: string): Promise<string> {
        return await new Promise(resolve => resolve('hashed_password'))
      }
    }
    return new EncrypterStub()
  }

  interface SutTypes {
    sut: DbAddAccount
    encrypterStub: any
    addAccountRepositoryStub: AddAccountRepository
  }

  const makeSut = (): SutTypes => {
    const encrypterStub = makeEncrypter()
    const addAccountRepositoryStub = makeAddAccountRepository()
    const sut = new DbAddAccount(encrypterStub, addAccountRepositoryStub)
    return {
      sut,
      encrypterStub,
      addAccountRepositoryStub
    }
  }

  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(async () => {
      return await Promise.reject(new Error())
    })
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addtSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addtSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'hashed_password'
    })
  })

  test('Should return an account on success', async () => {
    const { sut } = makeSut()
    const response = await sut.add(makeFakeAccountData())
    expect(response).toEqual(makeFakeAccount())
  })
})
