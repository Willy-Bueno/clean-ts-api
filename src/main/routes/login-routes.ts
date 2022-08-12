import { makeSignUpController } from '../factories/controllers/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { adaptRouter } from '../adapters/express/express-router-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignUpController()))
  router.post('/login', adaptRouter(makeLoginController()))
}
