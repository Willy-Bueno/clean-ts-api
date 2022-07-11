import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return account on success', async () => {
    await request(app)
      .post('/api/signup', (req, res) => {
        expect(200)
      })
  })
})
