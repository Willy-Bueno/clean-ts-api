import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRouter } from '../adapters/express-router-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignUpController()))
}
