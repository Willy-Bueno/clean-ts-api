import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup'
import { adaptRouter } from '../adapters/express-router-adapter'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignUpController()))
}
