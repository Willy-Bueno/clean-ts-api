import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/add-survey-controller-factory'
import { adaptRouter } from '@/main/adapters/express/express-router-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adaptRouter(makeAddSurveyController()))
}
