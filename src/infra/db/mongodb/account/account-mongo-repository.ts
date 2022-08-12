import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { AddAccountModel } from '@/domain/usecases/add-account/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { AccountModel } from '@/domain/models/account'
import { ObjectId } from 'mongodb'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const { insertedId: id } = result
    const account = await MongoHelper.findById(accountCollection, id)
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const objectId = new ObjectId(id)
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: objectId }, { $set: { accessToken: token } })
  }
}
