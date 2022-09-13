import { AddSurveyModel } from '@/domain/usecases/add-survey/add-survey'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import app from '@/main/config/app'
import { Collection } from 'mongodb'
import request from 'supertest'
import env from '../config/env'
import jwt from 'jsonwebtoken'

let accountCollection: Collection
let surveysCollection: Collection

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'Question',
  answers: [{
    answer: 'Answer 1',
    image: 'http://image-name.com'
  }, {
    answer: 'Answer 2'
  }]
})

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    surveysCollection = await MongoHelper.getCollection('surveys')
    await accountCollection.deleteMany({})
    await surveysCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurvey())
        .expect(403)
    })

    test('Should return 204 on add survey with role admin', async () => {
      const account = await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        role: 'admin'
      })
      const accessToken = jwt.sign({ id: account.insertedId.toHexString() }, env.jwtSecret)
      await accountCollection.updateOne({
        _id: account.insertedId
      }, {
        $set: {
          accessToken
        }
      })

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurvey())
        .expect(204)
    })
  })
})
