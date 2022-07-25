import { Router } from 'express'
import { makeSignUpController } from '../factories/signup/signup-factory'
import { adaptRouter } from '../adapters/express/express-router-adapter'
import { makeLoginController } from '../factories/login/login-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignUpController()))
  router.post('/login', adaptRouter(makeLoginController()))
}
