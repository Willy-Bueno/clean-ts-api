import { AddAccountModel } from '@/domain/usecases/add-account/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'
import { Collection } from 'mongodb'

const makeFakeData = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_mail@mail.com',
  password: 'any_password'
})

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const sut = makeSut()
    const account = await sut.add(makeFakeData())
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const sut = makeSut()
    await accountCollection.insertOne(makeFakeData())
    const account = await sut.loadByEmail('any_mail@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null if loadByEmail returns null', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail('any_mail@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account access token on updateAccessToken success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne(makeFakeData())
    const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
    const accessToken = 'any_token'
    expect(fakeAccount.accessToken).toBeFalsy()
    await sut.updateAccessToken(fakeAccount._id.toHexString(), accessToken)
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(accessToken)
  })

  test('Should return an account on loadByToken without role', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByToken with admin role', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByToken if user is admin', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_mail@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null on loadByToken with invalid role', async () => {
    const sut = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_mail@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeFalsy()
  })

  test('Should return null if loadByToken returns fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByToken('any_token')
    expect(account).toBeFalsy()
  })
})
