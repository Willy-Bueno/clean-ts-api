import { MongoHelper } from '../helpers/mongo-helper'
import { LogMongoRepository } from './log'

interface SutTypes {
  sut: LogMongoRepository
}

const makeSut = (): SutTypes => {
  const sut = new LogMongoRepository()
  return {
    sut
  }
}

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.deleteMany({})
  })

  test('Should create an error log on success', async () => {
    const { sut } = makeSut()
    await sut.log('any_error')
    const errorCollection = await MongoHelper.getCollection('errors')
    const count = await errorCollection.countDocuments()
    expect(count).toBe(1)
  })
})
