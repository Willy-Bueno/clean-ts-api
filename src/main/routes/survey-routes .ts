import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptMiddleware } from '@/main/adapters/express/express-middleware-adapter'
import { Router } from 'express'
import { makeAuthMiddleware } from '../factories/middleware/auth-middleware-factory'
import { adaptRouter } from '../adapters/express/express-router-adapter'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
  router.post('/surveys', adminAuth, adaptRouter(makeAddSurveyController()))
}
