import { makeSignUpController } from '@/main/factories/controllers/login/signup/signup-controller-factory'
import { makeLoginController } from '@/main/factories/controllers/login/signin/signin-controller-factory'
import { adaptRouter } from '@/main/adapters/express/express-router-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRouter(makeSignUpController()))
  router.post('/signin', adaptRouter(makeLoginController()))
}
